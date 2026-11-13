# Repository Guide

## Project and stack

KREW is a creator production workspace built as an npm monorepo with separate React frontend and Express backend packages. The frontend uses React 18, TypeScript, Vite, React Router 6, Tailwind CSS, Lucide React, and Recharts. The backend uses Node.js, Express 4, TypeScript, and Mongoose 8 for MongoDB persistence scaffolding. The README describes an in-memory fallback, but the inspected backend package/source structure shows database configuration and Mongoose models; verify actual behavior in code before relying on fallback claims.

## Structure

- `frontend/src/pages/` contains landing, authentication, and application screens; `App.tsx` maps routes.
- `frontend/src/components/` groups shared UI, navigation, dashboard, and agent components.
- `frontend/src/layouts/`, `contexts/`, `hooks/`, `services/`, `types/`, `data/`, `styles/`, and `utils/` hold layout shells, app state, hooks, API access, shared types, sample data, styling, and helpers.
- `backend/src/server.ts` starts the HTTP server and `app.ts` configures Express.
- `backend/src/routes/` maps API endpoints to `controllers/`; `middleware/` provides authentication, request logging, and error handling.
- `backend/src/models/` and `interfaces/` define persistence and domain contracts; `config/` handles environment/database setup; `utils/` contains response and logging helpers.
- `backend/src/services/` contains creator memory and contracts for strategy, script, video, visual, distribution, growth, and orchestration agents. README frames these as the six-agent architecture; inspect implementation before assuming live AI execution.

## Commands

Run from the repository root:

- `npm run install:all` installs frontend and backend dependencies.
- `npm run dev:frontend` starts Vite; `npm run dev:backend` starts the backend through `tsx watch`.
- `npm run build` builds frontend then backend; `npm run build:frontend` and `npm run build:backend` build separately.

Package-specific scripts: frontend also provides `npm run preview` and `npm run lint`; backend provides `npm start` for `dist/server.js` and `npm run clean` to remove `dist`.

## Architecture

The frontend is a routed single-page application with public and app layouts, contexts for authentication, Creator DNA, and toasts, plus a typed API service. The backend follows a modular Express/MVC shape: routes → controllers → services/models, with shared middleware for request logging, authentication, and errors. MongoDB access is configured through Mongoose. The intended product flow connects the UI to a JSON REST API, creator memory, and agent orchestration; several agent service files are named contracts, so treat the README's autonomous workforce capabilities as product direction unless verified in implementation.

## Development notes

- Keep frontend and backend changes within their respective package conventions and TypeScript types.
- Root scripts delegate to package scripts; run package-local commands from the relevant directory when needed.
- The README documents the API under `/api/v1` and local development defaults; consult environment configuration before changing ports or database behavior.
