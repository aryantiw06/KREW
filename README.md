# KREW
### YOUR VISION. OUR CREW.
> *"EVERY STAR DESERVES A CREW."*

[![GeNarrative Clash 2026](https://img.shields.io/badge/Hackathon-GeNarrative_Clash_2026-A855F7?style=for-the-badge)](https://genarrative.com)
[![Track](https://img.shields.io/badge/Track-Autonomous_Creator_Agents-38BDF8?style=for-the-badge)](#hackathon-track)
[![Status](https://img.shields.io/badge/Phase-50%25_Pre--Event_Foundation_Ready-10B981?style=for-the-badge)](#development-boundary)
[![License](https://img.shields.io/badge/License-MIT-gray?style=for-the-badge)](LICENSE)

---

## 1. Project Overview

**KREW** is an autonomous AI production workforce designed for modern digital content creators, filmmakers, podcasters, and video entrepreneurs. 

Rather than functioning as a basic chatbot, a generic video trimmer, or an isolated text generator, KREW establishes a **unified digital production studio** where a team of specialised autonomous AI agents collaborate behind the scenes to plan, write, cut, design, package, and optimize multi-platform content campaigns.

In KREW, **the content creator is the STAR. KREW is the CREW.**

---

## 2. Problem Statement

Modern content creators face a crippling operational dilemma:
- **Solo Creator Burnout:** Creators spend 80% of their time on logistics—topic research, video editing, clipping, thumbnail design, caption writing, and SEO scheduling—leaving little energy for their core craft.
- **Fragmented Tooling:** The average creator pays for and switches between 6+ disconnected applications (research tools, scriptwriters, captioners, clipping tools, design software, and social schedulers). None of these tools share persistent context.
- **Diluted Authenticity:** Generic AI generators output flat, robotic text that damages the creator's reputation because the models lack persistent knowledge of the creator's authentic vocabulary, forbidden words, and pacing.

---

## 3. The Core Analogy: Bollywood Film Production

In Bollywood cinema, an actor or actress is the **STAR**. Their charisma, vulnerability, and performance drive the movie. 

However, behind every successful Bollywood production is an entire crew:
- **The Director** orchestrates the vision and coordinates the set.
- **The Screenwriter** crafts the dialogue and emotional arcs.
- **The Editor** cuts the footage for maximum pacing and narrative punch.
- **The Cinematographer** crafts visual hierarchy, lighting, and iconic posters.
- **The Publicist** handles press, trailers, and multi-platform distribution.
- **The Producer** tracks box office metrics, audits retention, and plans the next production.

The star focuses purely on performing. The crew handles the production pipeline.

**KREW brings this exact workforce paradigm to the digital creator economy.**

---

## 4. The Six Specialised AI Agents

KREW replaces disconnected tools with six collaborative agents bound by a shared memory engine:

| Agent | Cinematic Role | Technical Identity | Core Responsibilities |
| :--- | :--- | :--- | :--- |
| **01. The Director** | Director | Strategy Agent | Topic research, trend analysis, campaign strategy, agent task manifests. |
| **02. The Writer** | Screenwriter | Script Agent | Narrative storytelling, psychological hooks (first 3s), caption drafting, vocabulary guardrails. |
| **03. The Editor** | Editor | Video Intelligence Agent | Contextual moment extraction, 9:16 vertical crop guidance, pacing optimization. |
| **04. The Cinematographer** | Cinematographer | Visual Intelligence Agent | Thumbnail composition suite, mobile OLED contrast audits, brand chromatic enforcement. |
| **05. The Publicist** | Publicist | Distribution Agent | Platform-native adaptation for YouTube, Instagram, LinkedIn, and Facebook; SEO hashtags. |
| **06. The Producer** | Producer | Growth Intelligence Agent | View velocity tracking, retention curve audits, and DNA memory feedback loops. |

---

## 5. The Six Technical USPs

1. **Creator DNA Memory Engine:** A shared persistent memory profile of the creator’s authentic tone, signature phrases, banned words, audience archetype, and visual aesthetics.
2. **Context-Aware Viral Moment Intelligence:** Evaluates semantic punchlines and emotional self-sufficiency rather than cutting video at random 30-second time intervals.
3. **Collaborative Multi-Agent Workforce:** Agents exchange structured contracts, request revisions, and hand off assets autonomously.
4. **Thumbnail Intelligence Lab:** Simulates mobile feed contrast, eye-tracking visual hierarchy, and headline readability across multiple layout variations.
5. **Self-Improving Content Intelligence:** Historical post-performance telemetry feeds back into the Creator DNA to continuously improve future recommendations.
6. **Human-in-the-Loop Control:** The creator retains executive authority—reviewing, editing, and signing off on all scripts, clips, artwork, and posts.

---

## 6. Product Workspaces & Features

The KREW interface provides a unified digital production studio:
- **Command Center (`/dashboard`):** Studio telemetry, lead production progress meter, recent master videos, workforce readiness, and upcoming distribution calendar.
- **Creator DNA (`/creator-dna`):** Complete configuration of creator identity, vocabulary guardrails, brand colors, and memory sync triggers.
- **Meet the KREW (`/crew`):** Visual agent cards, interactive multi-agent collaboration diagram, and technical contract inspector.
- **Production Studio (`/production`):** Content project management, master footage ingestion (MP4, MOV, MKV, ProRes, WAV, PDF), and status filtering.
- **Clip Intelligence Desk (`/clip-intelligence`):** Video player simulation, interactive multi-track timeline, viral potential scoring, and clip approval.
- **Thumbnail Studio (`/thumbnail-studio`):** 3 contrasting layout variations, OLED mobile contrast audit, brand chromatic compliance score, and aspect ratio selector.
- **Distribution Desk (`/distribution`):** Platform-native tabs for YouTube, Instagram, LinkedIn, and Facebook with captions, hashtags, SEO keywords, and pre-flight checklist.
- **Growth Insights (`/growth-insights`):** Recharts velocity graph, platform efficiency comparison table, and continuous DNA feedback loop directives.
- **Settings & Integrations (`/settings`):** Workspace security controls and API key inputs for Gemini, OpenAI, and Anthropic.
- **Authentication Suite (`/login`, `/signup`, `/forgot-password`):** Complete authentication interfaces.

---

## 7. Technology Stack

### Frontend
- **Framework:** React 18 with TypeScript & Vite
- **Styling:** Tailwind CSS with custom studio dark theme
- **Icons:** Lucide React
- **Routing:** React Router v6
- **Visualizations:** Recharts
- **Typography:** Space Grotesk (Headings), Inter (Body), JetBrains Mono (Code)

### Backend
- **Runtime:** Node.js v24+ with Express.js & TypeScript
- **Architecture:** Modular MVC with typed service contracts and error middleware
- **Port Management:** Dynamic EADDRINUSE port fallback (handles port 5000/5001 collisions)

### Database Scaffolding
- **ODM:** Mongoose v8
- **Target:** MongoDB Atlas
- **Entities:** User, CreatorProfile, ContentProject, ContentAsset, AgentDefinition, DistributionPlan
- **Fallback:** In-memory store for instant zero-dependency pre-event evaluation

---

## 8. Architecture & Data Flow

```
[The Star (Creator)]
       |
       v
[Public / App Layouts (React + Vite)]
       |
       | REST API (JSON)
       v
[Express API Gateway (Node.js + TS)]
       |
       +---> [Creator DNA Memory Engine] (Shared Semantic Backbone)
       |
       +---> [Agent Orchestration Bus]
                |---> The Director (Strategy)
                |---> The Writer (Scripts)
                |---> The Editor (Video Intel)
                |---> The Cinematographer (Thumbnails)
                |---> The Publicist (Distribution)
                |---> The Producer (Growth Intel)
       |
       v
[MongoDB Atlas / In-Memory Store]
```

---

## 9. Project Directory Structure

```
KREW/
├── frontend/
│   ├── public/
│   │   └── favicon.svg              # Custom typographic KREW node icon
│   ├── src/
│   │   ├── assets/                  # Static assets
│   │   ├── components/
│   │   │   ├── common/              # KrewLogo, Button, Card, Badge, Modal, Input, StatusPill
│   │   │   ├── dashboard/           # CommandCenterStats, ProductionOverview, RecentProjects
│   │   │   ├── agents/              # AgentCard, AgentCollaborationDiagram, AgentDetailModal
│   │   │   ├── navigation/          # Navbar, Sidebar, Header, Footer
│   │   │   └── ui/                  # Tabs, Dropdowns
│   │   ├── layouts/                 # PublicLayout, AppLayout
│   │   ├── pages/
│   │   │   ├── LandingPage.tsx      # 9-section marketing landing page
│   │   │   ├── auth/                # Login, Signup, ForgotPassword
│   │   │   └── app/                 # Dashboard, CreatorDna, Crew, Production, ClipIntel,
│   │   │                            # ThumbnailStudio, Distribution, GrowthInsights, Settings
│   │   ├── contexts/                # AuthContext, CreatorDnaContext, ToastContext
│   │   ├── hooks/                   # useToast, useLocalStorage
│   │   ├── services/                # Typed API client wrapper
│   │   ├── types/                   # TypeScript interfaces across all entities
│   │   ├── data/                    # Sample data for agents, DNA, clips, thumbnails, analytics
│   │   ├── styles/                  # index.css with custom studio scrollbars & tokens
│   │   ├── App.tsx                  # Application route map
│   │   └── main.tsx                 # Entrypoint
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   └── tailwind.config.js
│
├── backend/
│   ├── src/
│   │   ├── config/                  # environment.ts, database.ts
│   │   ├── controllers/             # health, auth, creatorDna, project, agent controllers
│   │   ├── middleware/              # errorHandler, requestLogger, authMiddleware
│   │   ├── models/                  # User, CreatorProfile, ContentProject, ContentAsset, etc.
│   │   ├── routes/                  # health, auth, creatorDna, project, agent routes
│   │   ├── services/
│   │   │   ├── creatorMemory/       # creatorMemoryService.ts
│   │   │   ├── strategyAgent/       # directorAgentContract.ts
│   │   │   ├── scriptAgent/         # writerAgentContract.ts
│   │   │   ├── videoIntelligence/   # editorAgentContract.ts
│   │   │   ├── visualIntelligence/  # cinematographerAgentContract.ts
│   │   │   ├── distribution/        # publicistAgentContract.ts
│   │   │   ├── growthIntelligence/  # producerAgentContract.ts
│   │   │   └── agentOrchestration/  # orchestratorContract.ts
│   │   ├── interfaces/              # IUser, ICreatorProfile, IAgentContract, IContentProject
│   │   ├── utils/                   # logger.ts, apiResponse.ts
│   │   ├── app.ts                   # Express app setup
│   │   └── server.ts                # HTTP bootstrap with port fallback
│   ├── package.json
│   └── tsconfig.json
│
├── docs/
│   ├── architecture.md              # Deep technical architecture
│   ├── product-vision.md            # Creator-as-Star philosophy & analogy
│   ├── feature-roadmap.md           # Pre-event vs Live-sprint roadmap
│   ├── agent-workforce.md           # 6 agents' specifications & contracts
│   └── screenshots/                 # UI assets directory
│
├── .gitignore
├── .env.example
├── README.md
└── package.json                     # Monorepo scripts orchestrator
```

---

## 10. Installation & Quick Start

### Prerequisites
- **Node.js:** v18.0.0 or later (v24.18.0 recommended)
- **npm:** v9.0.0 or later

### 1. Clone & Enter Directory
```bash
git clone https://github.com/your-username/KREW.git
cd KREW
```

### 2. Install Dependencies
```bash
# Install all dependencies across both frontend and backend
npm run install:all
```

Alternatively, install individually:
```bash
cd frontend && npm install
cd ../backend && npm install
```

### 3. Environment Setup
The project comes pre-configured with safe local development defaults. To customize:
```bash
cp .env.example backend/.env
```

### 4. Run the Development Servers
In two separate terminal tabs:

**Terminal 1 — Backend API:**
```bash
cd backend
npm run dev
# Server will start on http://localhost:5001 (or 5002 if 5001 is in use)
# Health check available at: http://localhost:5001/api/v1/health
```

**Terminal 2 — Frontend UI:**
```bash
cd frontend
npm run dev
# Frontend will start on http://localhost:5173
```

---

## 11. Strict Hackathon 50/50 Development Boundary

In strict compliance with **GeNarrative Clash 2026** rules:

### What is IMPLEMENTED (50% Pre-Event Foundation):
- [x] Complete UI/UX design and responsive layout for all 9 core views.
- [x] Custom brand identity, wordmark, and design system.
- [x] Full React component library and interactive modals/drawers.
- [x] Client-side routing, navigation state, and search command palette.
- [x] Creator DNA Memory Engine editing, local persistence, and validation.
- [x] Express REST backend with health checks, request logging, and error handling.
- [x] Mongoose models and database schemas for all entities.
- [x] Typed service interfaces (`ISpecialisedAgentContract`) and orchestration bus.
- [x] Clear illustrative sample data labeled with status pills.
- [x] Comprehensive documentation and GitHub repository setup.

### What is RESERVED for the Live 6-Hour Sprint (Remaining 50%):
- [ ] Actual LLM API calls (Google Gemini 1.5 Pro / Flash).
- [ ] Autonomous agent execution and tool calling.
- [ ] AI prompt engineering and persona tuning.
- [ ] Real multimodal video frame and audio analysis.
- [ ] Real AI script and hook generation.
- [ ] Real AI thumbnail image generation.
- [ ] Live social media publishing integrations.
- [ ] Autonomous peer-to-peer agent communication loops.

---

## 12. Live Sprint Implementation Plan (6-Hour Roadmap)

```
Hour 1: Connect Gemini 1.5 SDK & wire Director Agent strategy prompt.
Hour 2: Implement Writer Agent script generation with Creator DNA guardrails.
Hour 3: Implement Editor Agent multimodal video intelligence for moment extraction.
Hour 4: Implement Cinematographer Agent visual prompt generation.
Hour 5: Implement Publicist Agent cross-platform copy adaptation.
Hour 6: End-to-end integration testing, UI refinement, and submission recording.
```

---

## 13. Hackathon Track Information

- **Event:** GeNarrative Clash 2026
- **Track:** Autonomous Creator Agents — Content Strategy & Distribution
- **Team:** KREW Technologies

---

## 14. License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
