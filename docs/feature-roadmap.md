# KREW — Feature Roadmap & 50/50 Hackathon Boundary

> **Hackathon:** GeNarrative Clash 2026  
> **Track:** Autonomous Creator Agents — Content Strategy & Distribution  
> **Development Rule:** Strict 50/50 Pre-Event vs Live Sprint Boundary

---

## 1. Compliance Matrix

| Phase | Development Window | Status | Focus Areas |
| :--- | :--- | :--- | :--- |
| **Phase 1: Pre-Event Foundation** | Permitted before hackathon (50%) | **100% Complete** | UI/UX, Design System, Dashboard Workspaces, Navigation, Schemas, API Scaffolding, Documentation, GitHub Setup |
| **Phase 2: Live Hackathon Sprint** | Live 6-hour event sprint (50%) | **Reserved for Sprint** | LLM Inference, Autonomous Agent Execution, Video Intelligence, Prompt Tuning, Tool Calling, Distribution Integrations |
| **Phase 3: Post-Hackathon Vision** | Future Commercial Scope | **Planned** | Native YouTube/TikTok OAuth API Direct Publishing, Voice Cloning for Dubbing, Fine-Tuned Local Open Source Models |

---

## 2. Phase 1: Pre-Event Foundation (Completed)

All items below have been implemented, tested, and verified:

### Frontend & UI/UX (React + Vite + TypeScript + Tailwind)
- [x] **Brand Identity & Design System:** Custom typographic KREW wordmark with film-frame node motif, electric purple `#A855F7`, lavender `#C4B5FD`, and electric cyan `#38BDF8` tokens.
- [x] **Public Landing Page (9 Sections):** Hero, Bollywood crew analogy, the solo creator crisis, the 6-agent solution, interactive workflow, 6 technical USPs, product walkthrough, final CTA, and footer.
- [x] **Command Center Dashboard:** Telemetry overview, lead production pipeline status, recent projects, agent workforce roster, and distribution schedule calendar.
- [x] **Creator DNA Memory Engine Workspace:** Complete form suite for vocabulary rules, signature phrases, banned words, communication tone, brand colors, and memory synchronization triggers.
- [x] **Meet the KREW Workspace:** Distinctive agent cards, interactive multi-agent collaboration diagram, upstream/downstream contract inspector modal.
- [x] **Production Studio:** Master footage upload interface, project management table, status filters, and new production dispatch modal.
- [x] **Clip Intelligence Desk (The Editor):** Video player simulation, interactive multi-track timeline, highlight segments, viral potential scores, hook angles, and approval buttons.
- [x] **Thumbnail Studio (The Cinematographer):** 3 contrasting layout variations, OLED mobile contrast audit, brand chromatic compliance score, and aspect ratio selector.
- [x] **Distribution Desk (The Publicist):** Platform-native tabs for YouTube, Instagram, LinkedIn, and Facebook with captions, hashtags, SEO keywords, and pre-flight checklist.
- [x] **Growth Insights (The Producer):** Recharts velocity graph, platform efficiency comparison table, and continuous DNA feedback loop directives.
- [x] **Authentication Scaffolding:** Sign In, Registration, Forgot Password pages, and user session context.
- [x] **Settings & Integrations:** Workspace security controls and API key inputs for Gemini, OpenAI, and Anthropic.

### Backend & Scaffolding (Node.js + Express + TypeScript)
- [x] **Express Application Architecture:** Modular controllers, routes, request logging, and centralized error handling.
- [x] **Health Check Endpoint:** `/api/v1/health` returning system uptime, database status, and hackathon compliance metadata.
- [x] **Mongoose Models & Schemas:** User, CreatorProfile, ContentProject, ContentAsset, AgentDefinition, and DistributionPlan.
- [x] **Agent Service Interfaces:** Typed contracts (`ISpecialisedAgentContract`) and orchestration bus (`AgentOrchestrator`) ready for LLM integration.
- [x] **Automatic Port Fallback:** Graceful port escalation (5000 -> 5001) for macOS AirPlay Receiver compatibility.

---

## 3. Phase 2: Live Hackathon 6-Hour Sprint (Reserved)

The following capabilities are strictly reserved for implementation during the live 6-hour hackathon sprint:

1. **Hour 1: LLM Engine Integration & Gemini Client Binding**
   - Connect Google Gemini 1.5 Pro / Flash API via `@google/genai` or Vertex AI SDK.
   - Wire Gemini client into `backend/src/services/strategyAgent/directorAgentContract.ts`.
2. **Hour 2: Creator DNA Prompt Engineering & Script Generation**
   - Build system prompt generator incorporating vocabulary rules, banned words, and tone from `CreatorMemoryService`.
   - Implement `WriterAgentService.executeAgentTask()` to generate live three-act scripts and 5 hook variations.
3. **Hour 3: Multimodal Video Intelligence & Highlight Extraction**
   - Implement Gemini 1.5 Pro multimodal video/audio parsing in `EditorAgentService`.
   - Process uploaded video frames/audio transcripts to output real timestamped highlight segments with calculated viral scores.
4. **Hour 4: Thumbnail Visual Intelligence & Layout Prompting**
   - Implement `CinematographerAgentService.executeAgentTask()` with image generation models (Imagen / Stable Diffusion / DALL-E) to render real candidate thumbnails.
5. **Hour 5: Distribution Copy Generation & Multi-Agent Handoff**
   - Implement `PublicistAgentService` to auto-translate script outputs into platform-specific copy for YouTube, Instagram, LinkedIn, and Facebook.
   - Enable peer-to-peer data handoffs across the `AgentOrchestrator` pipeline.
6. **Hour 6: End-to-End Testing, Polish & Demo Video Recording**
   - Validate full flow: Raw video upload -> Agent processing -> Final review & approval in UI.
   - Record submission video demonstrating the autonomous AI crew in action.

---

## 4. Phase 3: Post-Hackathon Vision

- Direct social media OAuth integrations (YouTube Data API v3, Instagram Graph API, LinkedIn Community Management API).
- Real-time voice cloning and automated video dubbing across multiple global languages while preserving the creator's emotional cadence.
- Fine-tuned open-source local LLMs (Llama 3 / Mistral) for privacy-conscious offline video editing.

