# KREW Architecture (Verified Foundation)

## System shape

```text
React 18 + TypeScript + Vite
  ├─ Public pages and login/register
  ├─ Protected studio routes and local illustrative workspaces
  └─ Typed API clients
       │ JSON /api/v1
       ▼
Express 4 + TypeScript
  ├─ CORS, body parsing/sanitization, request logging, error responses
  ├─ Demo session middleware
  ├─ Auth, Creator DNA, project, agent scaffold, and health routes
  └─ Controllers → services/models
       ├─ MongoDB/Mongoose when connected
       └─ process-local in-memory fallback (explicit, non-durable)
```

## Frontend

The frontend uses React Router layouts for the public site and protected studio. `AuthContext` restores a saved demo session by validating it with `/auth/me`; invalid sessions are removed. `CreatorDnaContext` loads/saves through its API service and caches a local copy for offline editing. Production Studio uses backend project endpoints. Dashboard project counts and recent projects are backend-derived. Other workspace data, including clips, thumbnail concepts, distribution drafts, calendar items, and growth charts, is illustrative or local browser state and is labeled accordingly.

The UI uses Tailwind CSS, Lucide React, Recharts, and the existing dark cinematic KREW identity. Routes are unchanged.

## Backend and API

`backend/src/app.ts` configures CORS, request parsers, body sanitization, request logging, `/health` aliases, the configured API prefix (default `/api/v1`), not-found response, and centralized errors. Controllers return JSON envelopes through `utils/apiResponse.ts`. Request logs contain method, path, status, and duration; they do not log request bodies, passwords, or authorization headers.

Routes:

- `/api/v1/health`: service status and database persistence mode.
- `/api/v1/auth`: register, login, current session, logout.
- `/api/v1/creator-dna`: GET, PUT, sync metadata request, metadata read.
- `/api/v1/projects`: list with `status`, `search`, `sort`; create; detail; PUT metadata; PATCH status; DELETE archive.
- `/api/v1/agents`: scaffold registry and typed contract descriptions; no execution endpoint.

The common response envelope is `{ success, message?, data?, timestamp }`. Errors return `{ success: false, message, timestamp }`.

## Authentication boundary

Authentication is local **DEMO MODE**, not production-secure. Register/login validate input and return random bearer tokens held in an in-memory session map with an eight-hour expiry. Passwords are not hashed or persisted because the demo never stores or uses them after request validation. Sessions disappear on server restart. `/auth/me` validates the session; logout revokes it. There is no production identity provider or production JWT implementation.

## Persistence and models

Mongoose models include User, CreatorProfile, ContentProject, ContentAsset, AgentDefinition, and DistributionPlan. Creator DNA and projects use MongoDB when connected. Without a configured/reachable MongoDB, those services use process-local memory and return `mode: in-memory`, `connected: false`, and `persistenceAcrossRestarts: false`. Data then disappears after restart. Demo sessions always remain process-local. In-memory data is not presented as durable database storage.

Creator DNA validation covers identity, strings/arrays, nested audience/tone/vocabulary/story/visual fields, and hex color values. Saves increment profile version; sync only records a request timestamp and status. No agents are notified or run.

Projects are creator-scoped and support draft, queued, in-production, review-ready, approved, and archived statuses. Creation defaults to `draft`, with no active agent assignments. Archive uses a soft status update.

## 50/50 scope

No LLM SDKs, provider calls, AI inference, prompt engineering, autonomous agent execution or messaging, real video analysis/viral scoring, AI image generation, or live publishing integrations are present. Agent contracts and interactions shown in the UI are architecture scaffolding. All future AI capabilities are **RESERVED FOR LIVE HACKATHON SPRINT**.

## Local setup

Use Node.js 18+ and npm 9+. Run `npm run install:all`, configure `backend/.env` from `.env.example`, then run `npm run dev:backend` and `npm run dev:frontend`. Root `npm run build` builds both packages. Frontend `npm run lint` is declared but requires ESLint to be installed in the frontend package.
