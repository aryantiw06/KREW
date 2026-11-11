import { AgentDefinition, AgentCollaborationEdge } from '../types/agent.types';

export const SPECIALISED_AGENTS: AgentDefinition[] = [
  {
    id: 'agent-director',
    role: 'director',
    name: 'The Director',
    cinematicRole: 'Director',
    technicalIdentity: 'Strategy Agent',
    personality: 'Strategic, decisive, and relentlessly organized.',
    tagline: 'Orchestrating the vision from concept to campaign rollout.',
    color: '#A855F7',
    accentColor: '#C4B5FD',
    avatarSeed: 'director',
    responsibilities: [
      'Understands the creator’s vision, goals, and audience positioning.',
      'Researches high-leverage topics and untapped content opportunities.',
      'Formulates cross-platform content campaigns.',
      'Directs and coordinates handoffs between Writer, Editor, and Cinematographer.',
      'Maintains adherence to the Creator DNA Memory Engine.'
    ],
    capabilities: [
      {
        title: 'Deep Market & Trend Research',
        description: 'Synthesizes niche trends, competitor white spaces, and viral discourse into actionable production briefs.',
        isImplemented: false,
        implementationPhase: 'Live 6h Sprint'
      },
      {
        title: 'Production Roadmap Orchestration',
        description: 'Breaks single concepts into modular long-form and short-form milestone sequences.',
        isImplemented: false,
        implementationPhase: 'Live 6h Sprint'
      },
      {
        title: 'Workforce Agent Dispatch',
        description: 'Issues task manifests and constraints to Script, Video, and Visual agents via shared memory.',
        isImplemented: false,
        implementationPhase: 'Live 6h Sprint'
      }
    ],
    inputContract: ['Creator Prompt / Seed Idea', 'Creator DNA Memory Engine', 'Target Audience Parameters'],
    outputContract: ['Production Brief', 'Campaign Arc', 'Agent Task Manifests', 'Release Milestone Schedule'],
    collaborationWith: ['writer', 'editor', 'producer'],
    statusNote: 'Designed for live-sprint implementation.'
  },
  {
    id: 'agent-writer',
    role: 'writer',
    name: 'The Writer',
    cinematicRole: 'Screenwriter',
    technicalIdentity: 'Script Agent',
    personality: 'Creative, expressive, narrative-driven, and articulate.',
    tagline: 'Transforming raw ideas into magnetic narrative structures.',
    color: '#38BDF8',
    accentColor: '#7DD3FC',
    avatarSeed: 'writer',
    responsibilities: [
      'Transforms creative ideas into compelling narrative structures.',
      'Engineers psychological retention hooks for the first 3-5 seconds.',
      'Drafts modular long-form video outlines and talking points.',
      'Writes platform-specific captions, descriptions, and creative analogies.',
      'Adapts tone strictly to match the creator’s authentic vocabulary.'
    ],
    capabilities: [
      {
        title: 'Viral Hook Matrix Generation',
        description: 'Generates 5 distinct psychological hook angles (curiosity gap, controversial counter-intuitive, bold claim).',
        isImplemented: false,
        implementationPhase: 'Live 6h Sprint'
      },
      {
        title: 'Three-Act Digital Storyboarding',
        description: 'Formats scripts with visual cues, B-roll callouts, and audio pacing notes.',
        isImplemented: false,
        implementationPhase: 'Live 6h Sprint'
      },
      {
        title: 'Vocabulary Harmonization',
        description: 'Cross-checks every line against the banned wordlist and signature phrases in Creator DNA.',
        isImplemented: false,
        implementationPhase: 'Live 6h Sprint'
      }
    ],
    inputContract: ['Director Production Brief', 'Creator Vocabulary Profile', 'Video Format Guidelines'],
    outputContract: ['Complete Script Outlines', 'Hook Variations (x5)', 'B-Roll Shotlist Cues', 'Caption Drafts'],
    collaborationWith: ['director', 'editor', 'publicist'],
    statusNote: 'Designed for live-sprint implementation.'
  },
  {
    id: 'agent-editor',
    role: 'editor',
    name: 'The Editor',
    cinematicRole: 'Editor',
    technicalIdentity: 'Video Intelligence Agent',
    personality: 'Precise, analytical, detail-oriented, and rhythm-sensitive.',
    tagline: 'Excavating gold from raw footage with surgical narrative context.',
    color: '#F43F5E',
    accentColor: '#FDA4AF',
    avatarSeed: 'editor',
    responsibilities: [
      'Analyzes long-form content for emotional, humorous, or high-value moments.',
      'Selects standalone short-form clips based on narrative self-sufficiency.',
      'Maps speech cadences and timestamps to optimize short-form pacing.',
      'Flags natural clip boundaries and suggests re-hooking opportunities.',
      'Coordinates visual asset handoff with the Cinematographer.'
    ],
    capabilities: [
      {
        title: 'Contextual Moment Extraction',
        description: 'Discovers viral segments by evaluating semantic punchlines rather than arbitrary time intervals.',
        isImplemented: false,
        implementationPhase: 'Live 6h Sprint'
      },
      {
        title: 'Multi-Format Re-Framing Plan',
        description: 'Recommends 9:16 vertical crop coordinates and kinetic caption placement.',
        isImplemented: false,
        implementationPhase: 'Live 6h Sprint'
      },
      {
        title: 'Retention Dropoff Mitigation',
        description: 'Identifies lulls and recommends jump cuts or dynamic B-roll insertions.',
        isImplemented: false,
        implementationPhase: 'Live 6h Sprint'
      }
    ],
    inputContract: ['Raw Footage Metadata', 'Audio/Transcript Timestamps', 'Writer Hook Strategy'],
    outputContract: ['Timestamped Clip Segments', 'Viral Potential Scores', 'Crop Framing Guidance', 'Pacing Edits'],
    collaborationWith: ['director', 'cinematographer', 'publicist'],
    statusNote: 'Designed for live-sprint implementation.'
  },
  {
    id: 'agent-cinematographer',
    role: 'cinematographer',
    name: 'The Cinematographer',
    cinematicRole: 'Cinematographer',
    technicalIdentity: 'Visual Intelligence Agent',
    personality: 'Visual, imaginative, aesthetically demanding, and brand-loyal.',
    tagline: 'Designing irresistible visual hierarchy and scroll-stopping imagery.',
    color: '#EAB308',
    accentColor: '#FDE047',
    avatarSeed: 'cinematographer',
    responsibilities: [
      'Directs the visual identity and thumbnail composition strategy.',
      'Develops thumbnail concepts with high visual hierarchy and contrast.',
      'Guarantees color grading and font treatments match Creator DNA.',
      'Evaluates thumbnail readability across mobile and desktop viewports.',
      'Compares multiple design variations before the creator’s final sign-off.'
    ],
    capabilities: [
      {
        title: 'Visual Hierarchy Simulation',
        description: 'Simulates eye-tracking heatmaps and mobile feed contrast to maximize Click-Through Rate (CTR).',
        isImplemented: false,
        implementationPhase: 'Live 6h Sprint'
      },
      {
        title: 'Brand Chromatic Consistency',
        description: 'Enforces exact creator hex values and typographic styling across all generated art concepts.',
        isImplemented: false,
        implementationPhase: 'Live 6h Sprint'
      },
      {
        title: 'A/B Thumbnail Ideation Suite',
        description: 'Produces distinct framing iterations: Extreme Expression vs. High Curiosity vs. Clean Aesthetic.',
        isImplemented: false,
        implementationPhase: 'Live 6h Sprint'
      }
    ],
    inputContract: ['Production Brief', 'Creator Visual Identity Guidelines', 'Script Core Climax / Emotion'],
    outputContract: ['Thumbnail Layout Concepts', 'Readability Audit', 'Color Grading Tokens', 'Typography Specs'],
    collaborationWith: ['director', 'editor', 'publicist'],
    statusNote: 'Designed for live-sprint implementation.'
  },
  {
    id: 'agent-publicist',
    role: 'publicist',
    name: 'The Publicist',
    cinematicRole: 'Publicist',
    technicalIdentity: 'Distribution Agent',
    personality: 'Persuasive, audience-savvy, platform-native, and communicative.',
    tagline: 'Tailoring the message to ignite algorithmic momentum everywhere.',
    color: '#10B981',
    accentColor: '#6EE7B7',
    avatarSeed: 'publicist',
    responsibilities: [
      'Packages master content into platform-native distribution formats.',
      'Crafts distinct copy for YouTube, Instagram, LinkedIn, and Facebook.',
      'Optimizes SEO metadata, platform tags, keywords, and hashtags.',
      'Calculates ideal publishing windows based on audience activity cycles.',
      'Compiles pre-publish distribution readiness checklists for creator review.'
    ],
    capabilities: [
      {
        title: 'Algorithmic Metadata Tailoring',
        description: 'Transforms one core idea into 4 distinct cultural formats: Professional narrative for LinkedIn, punchy for IG, searchable for YT.',
        isImplemented: false,
        implementationPhase: 'Live 6h Sprint'
      },
      {
        title: 'Dynamic Hashtag Clustering',
        description: 'Assembles balanced tiers: Broad trending tags, niche community tags, and branded creator tags.',
        isImplemented: false,
        implementationPhase: 'Live 6h Sprint'
      },
      {
        title: 'Cross-Platform Cadence Planner',
        description: 'Staggers multi-platform release windows to build compounding organic momentum.',
        isImplemented: false,
        implementationPhase: 'Live 6h Sprint'
      }
    ],
    inputContract: ['Script and Approved Clips', 'Target Audience Geo-Zones', 'Platform Guidelines'],
    outputContract: ['Platform-Specific Posts (YT/IG/LI/FB)', 'SEO Keyword Clusters', 'Publishing Schedule', 'Readiness Checklist'],
    collaborationWith: ['writer', 'cinematographer', 'producer'],
    statusNote: 'Designed for live-sprint implementation.'
  },
  {
    id: 'agent-producer',
    role: 'producer',
    name: 'The Producer',
    cinematicRole: 'Producer',
    technicalIdentity: 'Growth Intelligence Agent',
    personality: 'Analytical, pragmatic, ROI-focused, and growth-obsessed.',
    tagline: 'Measuring performance, auditing retention, and unlocking exponential scale.',
    color: '#8B5CF6',
    accentColor: '#DDD6FE',
    avatarSeed: 'producer',
    responsibilities: [
      'Audits published content performance across views, retention, and shares.',
      'Dissects audience comments for recurring questions and sentiment cues.',
      'Compares performance against past productions to unearth growth drivers.',
      'Feeds actionable learnings back into the Creator DNA Memory Engine.',
      'Recommends future topic bets and strategic production adjustments.'
    ],
    capabilities: [
      {
        title: 'Continuous DNA Memory Feedback Loop',
        description: 'Updates vocabulary and format effectiveness scores based on empirical audience retention.',
        isImplemented: false,
        implementationPhase: 'Live 6h Sprint'
      },
      {
        title: 'Comparative Production Analytics',
        description: 'Benchmarking hooks, durations, and release times across all completed campaigns.',
        isImplemented: false,
        implementationPhase: 'Live 6h Sprint'
      },
      {
        title: 'Next Production Forecasting',
        description: 'Calculates the highest estimated engagement multiplier for upcoming topics.',
        isImplemented: false,
        implementationPhase: 'Live 6h Sprint'
      }
    ],
    inputContract: ['Aggregated Metric Telemetry', 'Audience Feedback Logs', 'Previous Production Benchmarks'],
    outputContract: ['Growth Performance Audit', 'DNA Learning Updates', 'Strategic Re-Production Directives'],
    collaborationWith: ['director', 'publicist'],
    statusNote: 'Designed for live-sprint implementation.'
  }
];

export const AGENT_COLLABORATION_EDGES: AgentCollaborationEdge[] = [
  {
    from: 'director',
    to: 'writer',
    dataContract: 'Production Brief & Campaign Arc',
    description: 'Directs the narrative objectives and core angle based on Creator DNA.'
  },
  {
    from: 'writer',
    to: 'editor',
    dataContract: 'Script Cues & Planned Hook Timestamps',
    description: 'Provides narrative timestamps and punchline markers for clip extraction.'
  },
  {
    from: 'director',
    to: 'cinematographer',
    dataContract: 'Emotional Climaxes & Visual Directives',
    description: 'Establishes the visual tone and key imagery needs for the campaign.'
  },
  {
    from: 'editor',
    to: 'cinematographer',
    dataContract: 'Selected Clip Keyframes & Crop Specs',
    description: 'Hands off high-engagement still frames to build thumbnail compositions.'
  },
  {
    from: 'cinematographer',
    to: 'publicist',
    dataContract: 'Rendered Thumbnail Concepts & Aspect Ratios',
    description: 'Delivers optimized visuals sized for YouTube 16:9, IG 9:16, and LinkedIn 1:1.'
  },
  {
    from: 'writer',
    to: 'publicist',
    dataContract: 'Copy Drafts & Voice Tone Parameters',
    description: 'Transfers copy seeds to be customized for platform-specific formats.'
  },
  {
    from: 'publicist',
    to: 'producer',
    dataContract: 'Distribution Logs & Platform Engagement Data',
    description: 'Streams publish records and distribution metrics for post-launch evaluation.'
  },
  {
    from: 'producer',
    to: 'director',
    dataContract: 'Growth Insights & DNA Evolution Directives',
    description: 'Feeds performance learnings back to recalibrate the next strategy cycle.'
  }
];

