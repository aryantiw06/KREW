# KREW — Specialised Agent Workforce Specification

> **Track:** Autonomous Creator Agents — Content Strategy & Distribution  
> **Architecture:** Collaborative Multi-Agent Production Crew

---

## 1. Overview of the Six Agent Roles

KREW organizes its autonomous intelligence into six distinct functional roles derived from professional film production:

| Agent | Cinematic Role | Technical Identity | Dominant Color | Primary Focus |
| :--- | :--- | :--- | :--- | :--- |
| **01** | **The Director** | Strategy Agent | `#A855F7` (Purple) | High-leverage topic research, campaign strategy, agent task coordination |
| **02** | **The Writer** | Script Agent | `#38BDF8` (Cyan) | Narrative structures, psychological hook engineering, vocabulary enforcement |
| **03** | **The Editor** | Video Intelligence Agent | `#F43F5E` (Rose) | Context-aware moment extraction, timestamped highlight segments, crop specs |
| **04** | **The Cinematographer** | Visual Intelligence Agent | `#EAB308` (Amber) | Thumbnail art direction, contrast audits, mobile readability, brand chromatic matching |
| **05** | **The Publicist** | Distribution Agent | `#10B981` (Emerald) | Platform-native packaging, algorithmic SEO hashtags, staggered publishing schedules |
| **06** | **The Producer** | Growth Intelligence Agent | `#8B5CF6` (Violet) | Retention curve auditing, cross-platform performance benchmarking, DNA feedback loop |

---

## 2. Agent 01 — The Director (Strategy Agent)

- **Personality:** Strategic, decisive, structured, and goal-oriented.
- **Tagline:** *"Orchestrating the vision from concept to campaign rollout."*
- **Responsibilities:**
  - Analyzes market white spaces and niche trends.
  - Understands the human creator's core creative goals.
  - Formulates multi-platform release campaigns.
  - Coordinates upstream and downstream handoffs between Writer, Editor, and Cinematographer.
  - Enforces Creator DNA adherence across all downstream deliverables.
- **Input Contract:**
  - `prompt`: String (Creator seed idea or raw topic)
  - `creatorDna`: Object (Creator DNA Memory profile)
  - `targetAudience`: Object (Demographics, pain points)
- **Output Contract:**
  - `productionBrief`: Structured document outlining core message, target outcome, and tone directives.
  - `campaignArc`: Multi-video milestone plan.
  - `taskManifests`: Instructions dispatched to Writer and Editor.

---

## 3. Agent 02 — The Writer (Script Agent)

- **Personality:** Creative, expressive, narrative-driven, and articulate.
- **Tagline:** *"Transforming raw ideas into magnetic narrative structures."*
- **Responsibilities:**
  - Converts production briefs into three-act script outlines.
  - Crafts 5 psychological hook variations (curiosity gap, controversial statement, bold promise).
  - Drafts platform-specific captions and descriptions.
  - Validates every generated line against the Creator DNA banned wordlist and signature phrases.
- **Input Contract:**
  - `productionBrief`: Received from The Director.
  - `creatorVocabulary`: Signature phrases and forbidden words.
  - `videoFormat`: Long-form 16:9 vs short-form 9:16.
- **Output Contract:**
  - `scriptOutline`: Timestamped three-act script with B-roll visual cues.
  - `hookMatrix`: 5 distinct cold-open hook variations.
  - `captionSeeds`: Raw copy seeds for The Publicist.

---

## 4. Agent 03 — The Editor (Video Intelligence Agent)

- **Personality:** Precise, analytical, detail-oriented, and rhythm-sensitive.
- **Tagline:** *"Excavating gold from raw footage with surgical narrative context."*
- **Responsibilities:**
  - Performs multimodal analysis on raw footage to identify high-retention moments.
  - Selects standalone clips based on narrative self-sufficiency rather than arbitrary intervals.
  - Suggests vertical 9:16 crop framing coordinates and kinetic subtitle placement.
  - Calculates viral potential scores based on speech pacing and emotional punchlines.
- **Input Contract:**
  - `videoMetadata`: Video duration, resolution, audio track.
  - `rawFootage`: Video stream or transcript timestamps.
  - `hookStrategy`: Received from The Writer.
- **Output Contract:**
  - `clipSegments`: Array of `{ startTime, endTime, duration, suggestedHook, viralScore }`.
  - `cropDirectives`: 9:16 vertical bounding boxes.
  - `pacingAudit`: Retention dropoff flags.

---

## 5. Agent 04 — The Cinematographer (Visual Intelligence Agent)

- **Personality:** Visual, imaginative, aesthetically demanding, and brand-loyal.
- **Tagline:** *"Designing irresistible visual hierarchy and scroll-stopping imagery."*
- **Responsibilities:**
  - Formulates 3 contrasting thumbnail layout concepts (High Contrast, Bold Slate, Narrative Split).
  - Simulates eye-tracking hierarchy and mobile OLED screen readability.
  - Enforces exact brand hex colors and typography specs from Creator DNA.
  - Delivers multi-aspect visuals (16:9 for YouTube, 9:16 for Reels cover, 1:1 for LinkedIn).
- **Input Contract:**
  - `productionBrief`: Received from The Director.
  - `selectedKeyframes`: Still frames received from The Editor.
  - `brandVisualRules`: Hex codes, typography, and expression directives.
- **Output Contract:**
  - `thumbnailConcepts`: Array of layout specifications and visual mockups.
  - `readabilityAudit`: Score (0-100) assessing headline contrast against dark and light feeds.
  - `colorGradeTokens`: Grading instructions for export.

---

## 6. Agent 05 — The Publicist (Distribution Agent)

- **Personality:** Persuasive, audience-savvy, platform-native, and communicative.
- **Tagline:** *"Tailoring the message to ignite algorithmic momentum everywhere."*
- **Responsibilities:**
  - Translates master content into native vernacular for YouTube, Instagram, LinkedIn, and Facebook.
  - Clusters hashtags into broad trending, niche community, and branded creator tiers.
  - Calculates optimal publishing windows based on audience geo-activity.
  - Compiles pre-flight distribution checklists for creator approval.
- **Input Contract:**
  - `approvedClips`: Approved video segments from The Editor.
  - `approvedThumbnails`: Selected artwork from The Cinematographer.
  - `scriptCopy`: Copy seeds from The Writer.
- **Output Contract:**
  - `platformDrafts`: Native titles, descriptions, and character-optimized captions.
  - `hashtagClusters`: Tiered tag recommendations.
  - `publishingSlate`: Timed release schedule.

---

## 7. Agent 06 — The Producer (Growth Intelligence Agent)

- **Personality:** Analytical, pragmatic, ROI-focused, and growth-obsessed.
- **Tagline:** *"Measuring performance, auditing retention, and unlocking exponential scale."*
- **Responsibilities:**
  - Audits cross-platform view velocity, average retention percentages, and CTR.
  - Dissects comment sentiment to uncover audience questions and misconceptions.
  - Compares production campaigns to discover compounding growth levers.
  - Feeds actionable directives back into the Creator DNA Memory Engine.
- **Input Contract:**
  - `metricTelemetry`: Views, retention curves, click-through rates.
  - `audienceFeedback`: Comment logs and social responses.
- **Output Contract:**
  - `growthAudit`: Performance diagnostics per platform.
  - `dnaEvolutionDirectives`: Updates to vocabulary effectiveness and format preferences.
  - `nextProductionBets`: Recommended topic themes with highest predicted reach.

---

## 8. Multi-Agent Peer-to-Peer Data Flow

```
[The Star] --(Master Brief)--> [The Director]
                                    |
            +-----------------------+-----------------------+
            |                                               |
            v                                               v
      [The Writer]                                     [The Editor]
     (Scripts & Hooks)                            (Contextual Moments)
            |                                               |
            +-----------------------+-----------------------+
                                    |
                                    v
                         [The Cinematographer]
                         (Visuals & Thumbnails)
                                    |
                                    v
                             [The Publicist]
                          (Multi-Platform Posts)
                                    |
                           [Creator Greenlight]
                                    |
                                    v
                              [The Producer]
                           (Growth Intelligence)
                                    |
               (DNA Feedback Loop back to Creator Memory)
```
