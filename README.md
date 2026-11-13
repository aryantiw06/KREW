# KREW

**Your vision. Our crew.** KREW is a creator-workspace foundation for the GeNarrative Clash 2026 autonomous creator agents track. This repository preserves the React application, cinematic interface, route structure, Express API, Mongoose schemas, and typed agent contracts. It does not perform AI inference or autonomous agent execution.

## Current capabilities

- React 18, TypeScript, Vite, React Router, Tailwind CSS, Lucide React, and Recharts frontend.
- Express 4 / TypeScript API with centralized JSON responses, request logging, CORS configuration, input sanitization, and `/api/v1` routes.
- Creator DNA GET/PUT, validation, version metadata, and sync-request timestamp. Sync records metadata only; it does not execute agents.
- Project create, list/filter/search/sort, detail, metadata update, status update, and archive. New projects begin as `draft`; no AI processing is started.
- Explicit local DEMO MODE session registration/login, in-memory bearer sessions with expiration, `/me`, and logout. This is not production authentication. Passwords are not persisted or logged.
- Studio workspaces include illustrative sample content. Sample clip scores, growth charts, and schedule items are not live metrics. Platform publishing and provider connections are unavailable.

## Persistence

Set `MONGODB_URI` in `backend/.env` to use MongoDB. When the database is connected, Creator DNA and projects use MongoDB models. If no URI is configured or connection fails, those endpoints use process-local in-memory state and explicitly report `mode: in-memory` and `persistenceAcrossRestarts: false`; data is lost when the server stops. Demo sessions are always held in server memory and are not persisted.

## Requirements and setup

- Node.js 18+ and npm 9+.
- Install packages: `npm run install:all`.
- Copy `.env.example` to `backend/.env` and set `MONGODB_URI` only if a MongoDB instance is available. Keep credentials out of source control; `.env` is ignored.
- Optional frontend API URL: set `VITE_API_URL` in the frontend environment. Default: `http://localhost:5000/api/v1`.

Run the two servers in separate terminals:

```sh
npm run dev:backend
npm run dev:frontend
```

The API starts on port 5000 and falls back to the next port if occupied. Vite defaults to port 5173. Use `npm run build` at root (or `npm run build:frontend` / `npm run build:backend`) for production builds. Frontend also has `npm run lint`; ESLint must be installed/configured for that script to run.

## API overview

All API responses use `{ success, message, data?, timestamp }` and errors use `{ success: false, message, timestamp }`.

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/v1/health` | Service and persistence mode status |
| POST | `/api/v1/auth/register` | Create explicitly local demo session |
| POST | `/api/v1/auth/login` | Start explicitly local demo session |
| GET | `/api/v1/auth/me` | Validate current session |
| POST | `/api/v1/auth/logout` | Revoke current demo session |
| GET / PUT | `/api/v1/creator-dna` | Read or save validated Creator DNA |
| POST | `/api/v1/creator-dna/sync` | Record sync request metadata only |
| GET | `/api/v1/creator-dna/metadata` | Read version and sync metadata |
| GET / POST | `/api/v1/projects` | Search/filter/sort projects or create draft |
| GET / PUT / PATCH / DELETE | `/api/v1/projects/:id` | Detail, metadata update, status update, archive (DELETE archives) |
| GET | `/api/v1/agents` | Read agent scaffold registry |

Protected endpoints require `Authorization: Bearer <demo-session-token>`. Demo session tokens expire after eight hours and exist only in the running backend process.

## 50/50 boundary

The following remain **RESERVED FOR LIVE HACKATHON SPRINT**: LLM provider integrations and inference, prompt engineering, autonomous agent execution and agent-to-agent communication, real video analysis/timestamp or viral scoring, AI thumbnail generation, and direct social publishing. No LLM SDKs are installed. Provider API keys are not collected or stored by the Settings UI.

## Repository layout

- `frontend/src/pages/` contains marketing, auth, and studio screens; `components/`, `contexts/`, `services/`, `types/`, and `data/` hold reusable UI, state, API clients, contracts, and illustrative fixtures.
- `backend/src/routes/` maps `/api/v1` endpoints to controllers; `models/` and `interfaces/` define data structures; `services/` contains persistence helpers and reserved agent contracts.
- `docs/architecture.md` and `docs/feature-roadmap.md` document verified architecture and the implementation boundary.
