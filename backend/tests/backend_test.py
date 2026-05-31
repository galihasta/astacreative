"""Backend API tests for Asta Creative."""
import os
import uuid
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL")
if not BASE_URL:
    # Fallback: read frontend .env
    try:
        with open("/app/frontend/.env") as f:
            for line in f:
                if line.startswith("REACT_APP_BACKEND_URL="):
                    BASE_URL = line.split("=", 1)[1].strip()
                    break
    except Exception:
        pass
BASE_URL = (BASE_URL or "").rstrip("/")


@pytest.fixture(scope="module")
def api_client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# ==== Root endpoint ====
class TestRoot:
    def test_root_returns_message(self, api_client):
        r = api_client.get(f"{BASE_URL}/api/", timeout=20)
        assert r.status_code == 200
        data = r.json()
        assert "message" in data
        assert "Asta Creative" in data["message"]


# ==== Contact endpoints ====
class TestContact:
    def test_post_contact_valid(self, api_client):
        payload = {
            "name": "TEST_User",
            "email": "test_user@example.com",
            "phone": "08123456789",
            "service": "AI Video Ads",
            "message": "Halo, saya tertarik dengan layanan AI Video.",
        }
        r = api_client.post(f"{BASE_URL}/api/contact", json=payload, timeout=20)
        assert r.status_code == 200, r.text
        data = r.json()
        assert data.get("success") is True
        assert "id" in data and isinstance(data["id"], str) and len(data["id"]) > 0
        # store for later test
        pytest.contact_id = data["id"]

    def test_post_contact_invalid_email(self, api_client):
        payload = {
            "name": "TEST_BadEmail",
            "email": "not-an-email",
            "message": "test",
        }
        r = api_client.post(f"{BASE_URL}/api/contact", json=payload, timeout=20)
        assert r.status_code == 422

    def test_post_contact_missing_fields(self, api_client):
        # name is required
        r = api_client.post(
            f"{BASE_URL}/api/contact",
            json={"email": "x@y.com", "message": "no name"},
            timeout=20,
        )
        assert r.status_code == 422

    def test_get_contact_list(self, api_client):
        r = api_client.get(f"{BASE_URL}/api/contact", timeout=20)
        assert r.status_code == 200
        rows = r.json()
        assert isinstance(rows, list)
        # at least one TEST_User entry should exist (from earlier test)
        emails = [row.get("email") for row in rows]
        assert "test_user@example.com" in emails


# ==== Chat endpoints ====
class TestChat:
    SESSION_ID = f"TEST_session_{uuid.uuid4().hex[:8]}"

    def test_post_chat_returns_reply(self, api_client):
        payload = {"session_id": self.SESSION_ID, "message": "Halo, apa itu Asta Creative?"}
        r = api_client.post(f"{BASE_URL}/api/chat", json=payload, timeout=60)
        assert r.status_code == 200, r.text
        data = r.json()
        assert data.get("session_id") == self.SESSION_ID
        assert "reply" in data and isinstance(data["reply"], str) and len(data["reply"]) > 0

    def test_get_chat_history(self, api_client):
        # Ensure a message exists
        api_client.post(
            f"{BASE_URL}/api/chat",
            json={"session_id": self.SESSION_ID, "message": "Berapa harga paketnya?"},
            timeout=60,
        )
        r = api_client.get(f"{BASE_URL}/api/chat/{self.SESSION_ID}", timeout=20)
        assert r.status_code == 200
        rows = r.json()
        assert isinstance(rows, list)
        assert len(rows) >= 2  # at least user + assistant pair
        roles = {row.get("role") for row in rows}
        assert "user" in roles
        assert "assistant" in roles
        # verify no MongoDB _id leak
        for row in rows:
            assert "_id" not in row

    def test_chat_invalid_payload(self, api_client):
        r = api_client.post(f"{BASE_URL}/api/chat", json={"message": "no session"}, timeout=20)
        assert r.status_code == 422
