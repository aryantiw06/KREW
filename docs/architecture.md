# KREW — Technical Architecture

This document details the software architecture, system topology, data flow, and integration contracts of **KREW** (*GeNarrative Clash 2026: Autonomous Creator Agents*).

---

## 1. System Topology Overview

```
                                  +-----------------------------+
                                  |     CREATOR (THE STAR)      |
                                  |    UI / Executive Control   |
                                  +--------------+--------------+
                                                 |
                                                 v
+----------------------------------------------------------------------------------------------+
|                                    FRONTEND (React + Vite)                                    |
|                                                                                              |
|  [Command Center]   [Creator DNA]   [Meet the KREW]   [Production Studio]   [Clip Intel]     |
|  [Thumbnail Lab]    [Distribution]  [Growth Desk]     [Settings]            [Auth Suite]     |
+----------------------------------------------+-----------------------------------------------+
                                               |
                                     REST API / JSON (v1)
                                               |
                                               v
+----------------------------------------------------------------------------------------------+
|                                     BACKEND (Node.js + Express)                              |
|                                                                                              |
|  [Config & Env]        [Request Logger]     [CORS & Helmet]     [Centralized Error Handler]  |
|  [Auth Middleware]     [Validation Layer]   [Health Check]      [API v1 Router]              |
|                                                                                              |
|  +----------------------------------------------------------------------------------------+  |
|  |                            CREATOR DNA MEMORY ENGINE (Backbone)                        |  |
|  |   - Authentic Vocabulary Rules        - Brand Color Grading (#A855F7)                  |  |
|  |   - Banned Words & Clichés            - Pacing & Cold Hook Directives                  |  |
|  |   - Audience Demographics             - Multi-Platform Format Specs                    |  |
|  +----------------------------------------------------------------------------------------+  |
|                                                                                              |
|  +----------------------------------------------------------------------------------------+  |
|  |                       MULTI-AGENT ORCHESTRATION BUS (Contracts)                         |  |
|  |                                                                                        |  |
|  |   +-------------------+    +-------------------+    +-------------------------------+  |  |
|  |   |   The Director    |--->|    The Writer     |--->|          The Editor           |  |  |
|  |   |  (Strategy Agent) |    |   (Script Agent)  |    |   (Video Intelligence Agent)  |  |  |
|  |   +-------------------+    +-------------------+    +---------------+---------------+  |  |
|  |             ^                                                       |                  |  |
|  |             |                                                       v                  |  |
|  |   +---------+---------+    +-------------------+    +---------------+---------------+  |  |
|  |   |   The Producer    |<---|   The Publicist   |<---|      The Cinematographer      |  |  |
|  |   |  (Growth Intel)   |    | (Distribution Ag.)|    |   (Visual Intelligence Agent) |  |  |
|  |   +-------------------+    +-------------------+    +-------------------------------+  |  |
|  +----------------------------------------------------------------------------------------+  |
+----------------------------------------------+-----------------------------------------------+
                                               |
                                        Mongoose ODM
                                               |
                                               v
+----------------------------------------------------------------------------------------------+
|                                  DATABASE (MongoDB Atlas)                                     |
|                                                                                              |
|  [Users]  [CreatorProfiles (DNA)]  [ContentProjects]  [ContentAssets]  [DistributionPlans]   |
+----------------------------------------------------------------------------------------------+
```

---

## 2. Frontend Architecture

- **Framework:** React 18 with TypeScript and Vite bundler.
- **Design Tokens:** Tailwind CSS configured with cinematic studio palette:
  - Deep Black: `#0B0B10`
  - Charcoal Surface: `#15151D`
  - Studio Card: `#1F1F2C`
  - Electric Purple (Primary Accent): `#A855F7`
  - Lavender (Secondary Accent): `#C4B5FD`
  - Electric Cyan (Status Highlight): `#38BDF8`
  - Typography: Space Grotesk (Display Headings), Inter (Body UI), JetBrains Mono (Code/Telemetry).
- **Navigation & Routing:** React Router v6 with layout boundary nesting:
  - `PublicLayout`: Marketing landing page (`/`), authentication scaffolding (`/login`, `/signup`, `/forgot-password`).
  - `AppLayout`: Persistent studio navigation drawer, top workspace banner, notifications drawer, command search (`⌘K`), and outlet container for all studio workspaces.
- **Data Visualizations:** Recharts for retention curves, platform view comparisons, and audience velocity telemetry.
- **Context Layer:**
  - `AuthContext`: Manages creator session and credentials.
  - `CreatorDnaContext`: Reactive store for Creator DNA memory, local persistence, and memory sync triggers.
  - `ToastContext`: System-wide toast notification dispatcher.

---

## 3. Backend Architecture

- **Runtime:** Node.js v24+ with Express.js and TypeScript.
- **Entrypoints:**
  - `src/server.ts`: HTTP bootstrap with EADDRINUSE automatic port fallback (handles port 5000/5001 collisions).
  - `src/app.ts`: Express application pipeline with CORS whitelist, JSON limit handling, request telemetry, and centralized error handling.
- **Modular Route Structure:**
  - `GET /health` / `GET /api/v1/health`: System health and hackathon 50/50 compliance metadata.
  - `/api/v1/auth`: Authentication and session endpoints.
  - `/api/v1/creator-dna`: Read, update, and sync endpoints for Creator DNA memory engine.
  - `/api/v1/projects`: Project ingestion, retrieval, and pipeline stage updates.
  - `/api/v1/agents`: Registry of all 6 specialised agents and contract inspector.
- **Decoupled Persistence:**
  - Graceful MongoDB connection handler: Connects to MongoDB Atlas if connection URI is provided; falls back to structured in-memory state during local evaluation.

---

## 4. Database Schema Design (Mongoose)

1. **User (`UserModel`)**: User identity, role (`creator_star`), email, handle, and avatar.
2. **CreatorProfile (`CreatorProfileModel`)**: The Creator DNA document storing authentic vocabulary, banned phrases, tone parameters, brand colors, thumbnail styles, and guidelines.
3. **ContentProject (`ContentProjectModel`)**: Content project entity storing master footage metadata, source duration, target platforms, active agents, and pipeline progress step (1-5).
4. **ContentAsset (`ContentAssetModel`)**: Output assets including highlight clips, suggested hooks, transcript excerpts, thumbnail concepts, and social post drafts.
5. **AgentDefinition (`AgentDefinitionModel`)**: System registry of the six agent identities, contracts, and capability manifests.
6. **DistributionPlan (`DistributionPlanModel`)**: Multi-platform post schedules and human-in-the-loop sign-off checklists.

---

## 5. Live Sprint Integration Points (The Remaining 50%)

The pre-event codebase establishes the complete interface contracts (`ISpecialisedAgentContract`) and orchestration bus (`AgentOrchestrator`). During the live 6-hour hackathon sprint, the following components will be plugged into these existing interfaces:
1. **Gemini 1.5 Pro / Flash Multimodal Client:** Plugs into `VideoIntelligenceAgent` (`src/services/videoIntelligence/editorAgentContract.ts`).
2. **Context-Aware Prompt Pipeline:** Plugs into `StrategyAgent` and `ScriptAgent` referencing `CreatorMemoryService`.
3. **Visual Generation Engine:** Plugs into `VisualIntelligenceAgent` for thumbnail candidate rendering.
4. **Agent Orchestration Loop:** Connects `orchestratorContract.ts` to execute sequential and parallel agent workflows with tool calling.
