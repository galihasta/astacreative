from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Emergent LLM key (loaded after dotenv)
EMERGENT_LLM_KEY = os.environ.get('EMERGENT_LLM_KEY')

# Create the main app without a prefix
app = FastAPI(title="Asta Creative API")
api_router = APIRouter(prefix="/api")


# ====== Models ======
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class StatusCheckCreate(BaseModel):
    client_name: str


class ContactRequest(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = ""
    service: Optional[str] = ""
    message: str


class ContactRecord(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    phone: Optional[str] = ""
    service: Optional[str] = ""
    message: str
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())


class ChatMessageIn(BaseModel):
    session_id: str
    message: str


class ChatMessageOut(BaseModel):
    session_id: str
    reply: str


# ====== Routes ======
@api_router.get("/")
async def root():
    return {"message": "Asta Creative API is running"}


@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_obj = StatusCheck(**input.model_dump())
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    await db.status_checks.insert_one(doc)
    return status_obj


@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    rows = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for r in rows:
        if isinstance(r.get('timestamp'), str):
            r['timestamp'] = datetime.fromisoformat(r['timestamp'])
    return rows


@api_router.post("/contact")
async def submit_contact(payload: ContactRequest):
    record = ContactRecord(**payload.model_dump())
    await db.contacts.insert_one(record.model_dump())
    return {"success": True, "id": record.id, "message": "Terima kasih! Tim kami akan menghubungi Anda segera."}


@api_router.get("/contact")
async def list_contacts():
    rows = await db.contacts.find({}, {"_id": 0}).sort("created_at", -1).to_list(200)
    return rows


# ====== Customer Service Chatbot ======
CS_SYSTEM_PROMPT = """Anda adalah CS Asta Creative - customer service resmi dari agency digital marketing bernama "Asta Creative".

PROFIL AGENSI:
- Nama: Asta Creative
- Tagline: Smart Content Studio AI
- Layanan: pembuatan konten iklan, video kreator, manajemen sosial media berbasis AI
- Sub-layanan: AI Video Ads, AI Content Creator, AI Voice Over, AI Image Generation, Social Media Optimization
- Fokus: AI sebagai pusat optimasi konten kreatif
- Lokasi layanan: Indonesia (bilingual ID/EN)

GAYA BICARA:
- Ramah, profesional, helpful
- Default Bahasa Indonesia, switch ke English jika user pakai English
- Singkat (2-4 kalimat per balasan), gunakan emoji sewajarnya
- Jika ditanya harga, sebutkan "paket mulai dari Rp 2.500.000/bulan, tergantung kebutuhan, silakan isi form kontak untuk penawaran khusus"
- Selalu arahkan user ke form kontak di halaman Contact jika serius ingin booking

JANGAN menjawab pertanyaan di luar konteks Asta Creative dan digital marketing AI.
"""


@api_router.post("/chat", response_model=ChatMessageOut)
async def chat_with_cs(payload: ChatMessageIn):
    if not EMERGENT_LLM_KEY:
        raise HTTPException(status_code=500, detail="LLM key not configured")

    try:
        from emergentintegrations.llm.chat import LlmChat, UserMessage

        # Load history from DB to provide a coherent conversation
        history_docs = await db.chat_messages.find(
            {"session_id": payload.session_id}, {"_id": 0}
        ).sort("created_at", 1).to_list(50)

        chat = LlmChat(
            api_key=EMERGENT_LLM_KEY,
            session_id=payload.session_id,
            system_message=CS_SYSTEM_PROMPT,
        ).with_model("anthropic", "claude-sonnet-4-6")

        # The library manages history within session; we still persist for our own UI
        user_msg = UserMessage(text=payload.message)
        response_text = await chat.send_message(user_msg)

        now = datetime.now(timezone.utc).isoformat()
        await db.chat_messages.insert_many([
            {"id": str(uuid.uuid4()), "session_id": payload.session_id,
             "role": "user", "content": payload.message, "created_at": now},
            {"id": str(uuid.uuid4()), "session_id": payload.session_id,
             "role": "assistant", "content": response_text, "created_at": now},
        ])

        return ChatMessageOut(session_id=payload.session_id, reply=response_text)
    except Exception as e:
        logging.exception("Chat error")
        # Friendly fallback (mocked reply) if LLM fails so UX stays smooth
        fallback = (
            "Halo! 👋 Saya CS Asta Creative. Maaf, koneksi AI sedang sibuk. "
            "Silakan isi form kontak kami atau coba lagi sebentar lagi."
        )
        try:
            now = datetime.now(timezone.utc).isoformat()
            await db.chat_messages.insert_many([
                {"id": str(uuid.uuid4()), "session_id": payload.session_id,
                 "role": "user", "content": payload.message, "created_at": now},
                {"id": str(uuid.uuid4()), "session_id": payload.session_id,
                 "role": "assistant", "content": fallback, "created_at": now},
            ])
        except Exception:
            pass
        return ChatMessageOut(session_id=payload.session_id, reply=fallback)


@api_router.get("/chat/{session_id}")
async def get_chat_history(session_id: str):
    rows = await db.chat_messages.find(
        {"session_id": session_id}, {"_id": 0}
    ).sort("created_at", 1).to_list(200)
    return rows


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
