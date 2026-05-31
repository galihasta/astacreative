# Asta Creative - Smart Content Studio AI

## Original Problem Statement
"saya ingin membuat website interaktif 3d beranimasi setiap pindah halaman tema tentang agency digital marketing, jasa pembuatan konten iklan atau video atau konten kreator berbasis ai"

## User Choices (Captured)
- Brand: **Asta Creative**
- Service line: **Smart Content Studio AI**
- 3D theme: peralatan kamera + media sosial + AI sebagai pusat optimasi (interconnected orbit)
- Interactive feature: **CS Asta Creative** chatbot
- Visual showcase: AI studio image gallery

## Architecture
- Frontend: React 19 + react-router-dom v7 (multi-page) + framer-motion (3D orbit, page transitions, shutter effect) + Tailwind + shadcn-ui base
- Backend: FastAPI + Motor (MongoDB) + emergentintegrations (Claude Sonnet 4.6 via Emergent Universal Key)
- Routes: /, /services, /gallery, /about, /contact
- Backend APIs (all under /api): GET /, POST /contact, GET /contact, POST /chat, GET /chat/{session_id}, /status (legacy)

## User Personas
1. Brand manager mencari agency konten AI cepat
2. UMKM butuh konten produksi rutin tapi budget hemat
3. Marketing lead enterprise butuh AI optimization layer

## Core Requirements (Static)
- 3D animated hero (orbiting camera / social / AI core)
- Cinematic shutter page transitions
- Floating AI Customer Service widget (chat with Claude Sonnet)
- Contact / brief form persisting to MongoDB
- Gallery showcase of AI studio
- Indonesian-first copy

## What's Been Implemented (2026-05-31)
- [x] Multi-page routing with animated transitions
- [x] Hero 3D scene: orbital camera/social icons around pulsing AI Core + connecting glow lines
- [x] Cinematic shutter overlay on every page change
- [x] Services page: 6 capability cards + 3-tier package pricing
- [x] Gallery page: bento grid with hover zoom (3 generated AI images + 3 Unsplash/Pexels)
- [x] About page: stats, values, team
- [x] Contact page: validated form -> POST /api/contact with sonner toast
- [x] CS Asta Creative chat widget (FAB at bottom-24 right-6 z-[999]) using real Claude Sonnet 4.6
- [x] Backend: POST /api/chat, /api/contact, GET /api/chat/{session_id}, /api/contact list
- [x] Custom Outfit + Manrope typography, obsidian + amber palette, grain overlay
- [x] All interactive elements carry data-testid

## Backlog
### P0
- (none — MVP shipped and E2E tested 100% pass)

### P1
- Replay chat history into LlmChat for cross-restart context
- Rate limit /api/chat (public LLM endpoint)
- Return 502 + structured error from /api/chat when LLM upstream fails

### P2
- AI demo: try-it generative copywriting widget for visitors
- AI image-gen showcase using Nano Banana
- Testimonials carousel
- Case study detail pages
- Sora 2 video showreel section

## Update 2026-05-31 (Iteration 2)
- [x] Added cinematic page transition (REC indicator, timecode, scene labels, cinemascope bars, flying camera drone with viewfinder) — every route change feels like a film camera "shooting" the next scene
- [x] Replaced AI chat widget with direct WhatsApp FAB (+62 812 8888 0000 placeholder) — prefilled message
- [x] Removed AI demo generative from backlog per user decision
- Files: /app/frontend/src/components/CinematicTransition.jsx, WhatsAppFab.jsx
