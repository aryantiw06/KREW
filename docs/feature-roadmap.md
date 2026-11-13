# KREW Feature Roadmap and 50/50 Boundary

## Current pre-event foundation

Implemented and verified in the repository:

- Preserved React/Vite application, cinematic design system, public/studio layouts, and existing routes.
- Protected studio routes with session restoration and explicit local DEMO MODE sign-in/register/logout. Demo tokens are random, memory-only, expire after eight hours, and are not production authentication.
- Backend health and API response/error infrastructure.
- Creator DNA GET/PUT, input validation, MongoDB or explicit in-memory persistence, profile versioning, and sync-request metadata (no agent sync).
- Project draft creation, creator-scoped listing with filter/search/sort, detail, metadata update, lifecycle status update, and soft archive.
- Backend-backed dashboard project counts/recent projects.
- Local illustrative interactions for clip review, thumbnail concept preference, and distribution draft copy. Publishing stays disabled.
- Illustrative analytics/schedules clearly identified; Settings does not collect provider credentials.

## Persistence and operating modes

Set `MONGODB_URI` in `backend/.env` to enable Mongoose persistence for Creator DNA and projects. Without a reachable MongoDB, API responses explicitly identify process-local in-memory mode; data is lost on server restart. Demo sessions are always process-local. Browser localStorage is used for demo session restoration, the Creator DNA offline cache, and explicitly local workspace preferences/drafts. It is not a substitute for backend persistence.

## Reserved for live hackathon sprint

The following are not implemented and must remain **RESERVED FOR LIVE HACKATHON SPRINT** until that phase:

1. LLM SDK installation, provider credentials, API calls, inference, and prompt engineering.
2. Autonomous Director/Writer/Editor/Cinematographer/Publicist/Producer execution or peer-to-peer communication.
3. Real video/audio processing, timestamp extraction, retention analysis, or viral scoring.
4. AI-generated thumbnail artwork or automated visual scoring.
5. Direct social publishing, scheduling, OAuth integrations, and platform API calls.
6. Production authentication, durable user registration, secure password hashing, and production-grade token/session management.

## Install, run, and verify

```sh
npm run install:all
# Set backend/.env from .env.example; optionally configure MONGODB_URI
npm run dev:backend
npm run dev:frontend
npm run build
```

`npm run build` builds frontend and backend. `npm run lint --prefix frontend` is declared; install/configure ESLint before expecting the command to run successfully.

## Next development phase

Before live sprint work, complete routine reliability items: install and configure the project lint toolchain, add repeatable API integration tests for both MongoDB and in-memory modes, and validate UI flows against a fresh demo session. During the authorized live sprint, implement only the AI and publishing tasks allowed by event rules, with explicit human review and tests for each boundary.
