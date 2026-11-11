import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Card } from '../components/common/Card';
import { StatusPill } from '../components/common/StatusPill';
import { SPECIALISED_AGENTS } from '../data/sampleAgents';
import {
  Sparkles,
  ArrowRight,
  Film,
  Dna,
  Scissors,
  Image as ImageIcon,
  Share2,
  TrendingUp,
  Cpu,
  Layers,
  CheckCircle2,
  Play,
  Zap,
  ShieldCheck,
  BrainCircuit,
  MessageSquare,
  Users2
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTabRole, setActiveTabRole] = useState(SPECIALISED_AGENTS[0].role);
  const activeAgent = SPECIALISED_AGENTS.find((a) => a.role === activeTabRole) || SPECIALISED_AGENTS[0];

  const differentiators = [
    {
      icon: <Dna className="w-6 h-6 text-krew-purple" />,
      title: 'Creator DNA Memory Engine',
      description: 'A shared persistent memory of your authentic tone, signature phrases, banned words, audience archetype, and brand aesthetic across all agents.'
    },
    {
      icon: <Scissors className="w-6 h-6 text-rose-400" />,
      title: 'Context-Aware Viral Intelligence',
      description: 'Identifies high-impact video highlights based on emotional narrative beats and punchline self-sufficiency, not arbitrary time splices.'
    },
    {
      icon: <BrainCircuit className="w-6 h-6 text-krew-cyan" />,
      title: 'Collaborative Multi-Agent Workforce',
      description: 'Autonomous peer-to-peer handoffs. The Director briefs the Writer, who prompts the Editor, who feeds keyframes to the Cinematographer.'
    },
    {
      icon: <ImageIcon className="w-6 h-6 text-amber-400" />,
      title: 'Thumbnail Intelligence Lab',
      description: 'Generates and tests contrasting visual compositions, simulating mobile feed contrast, eye-tracking hierarchy, and headline readability.'
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-purple-400" />,
      title: 'Self-Improving Content Intelligence',
      description: 'Post-launch performance data directly feeds back into your Creator DNA, sharpening future topic research, hook angles, and retention curves.'
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-emerald-400" />,
      title: 'Human-in-the-Loop Control',
      description: 'You are always the Star and executive producer. Every script outline, clip selection, thumbnail concept, and post requires your final greenlight.'
    }
  ];

  const workflowSteps = [
    {
      step: '01',
      title: 'CREATOR INPUT',
      desc: 'You upload raw footage, a podcast recording, or simply give a seed creative brief.'
    },
    {
      step: '02',
      title: 'KREW UNDERSTANDS THE VISION',
      desc: 'The Director reads your Creator DNA memory to establish strategic narrative angles.'
    },
    {
      step: '03',
      title: 'SPECIALISED AGENTS COLLABORATE',
      desc: 'The Writer scripts hooks, the Editor extracts contextual moments, and the Cinematographer designs thumbnails.'
    },
    {
      step: '04',
      title: 'CONTENT CAMPAIGN IS PREPARED',
      desc: 'The Publicist shapes platform-native copy and scheduling for YouTube, Instagram, LinkedIn, and Facebook.'
    },
    {
      step: '05',
      title: 'CREATOR REVIEWS AND APPROVES',
      desc: 'You review the finished production package, make adjustments, and greenlight distribution.'
    }
  ];

  return (
    <div className="space-y-24 sm:space-y-32 pb-20">
      {/* SECTION 2 — HERO */}
      <section className="relative pt-12 sm:pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center overflow-hidden">
        {/* Cinematic Backdrop Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-krew-purple/15 rounded-full blur-[140px] pointer-events-none -z-10" />
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[300px] bg-krew-cyan/10 rounded-full blur-[120px] pointer-events-none -z-10" />

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-krew-surface border border-krew-border text-xs font-mono text-krew-lavender mb-8 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-krew-purple" />
          <span>GeNarrative Clash 2026 • Autonomous Creator Agents Track</span>
        </div>

        <h1 className="font-display font-bold text-4xl sm:text-6xl lg:text-7xl tracking-tight text-white max-w-5xl mx-auto leading-[1.1] mb-6">
          EVERY STAR DESERVES A <span className="text-transparent bg-clip-text bg-gradient-to-r from-krew-cyan via-krew-lavender to-krew-purple">CREW.</span>
        </h1>

        <p className="font-display text-lg sm:text-2xl text-krew-lavender max-w-3xl mx-auto mb-4 font-normal">
          You bring the vision. KREW brings the intelligence, creativity and workforce to make it happen.
        </p>

        <p className="text-sm sm:text-base text-krew-text-secondary max-w-2xl mx-auto leading-relaxed mb-10">
          Meet your autonomous AI production crew. From content strategy and scripts to video intelligence, thumbnails and distribution — your entire creative operation, united in one workspace.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link to="/dashboard">
            <Button
              variant="primary"
              size="lg"
              rightIcon={<ArrowRight className="w-5 h-5" />}
              className="w-full sm:w-auto shadow-purple-glow"
            >
              Meet Your Crew
            </Button>
          </Link>
          <a href="#how-it-works">
            <Button
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto"
            >
              Explore the Platform
            </Button>
          </a>
        </div>

        {/* Hero Cinematic Visual: Film Studio Reimagined as AI Workforce */}
        <div className="relative rounded-3xl border border-krew-border/80 bg-krew-charcoal p-3 sm:p-5 shadow-2xl overflow-hidden max-w-5xl mx-auto">
          {/* Header Bar */}
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-krew-border/60 text-xs text-krew-text-muted font-mono">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80"></span>
              <span className="w-3 h-3 rounded-full bg-amber-500/80"></span>
              <span className="w-3 h-3 rounded-full bg-emerald-500/80"></span>
              <span className="ml-2 text-white font-medium">KREW Studio Alpha — Bollywood Crew Architecture</span>
            </div>
            <StatusPill type="architected" label="Pre-Event Scaffold Active" />
          </div>

          {/* Studio Canvas Showcase */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left p-2">
            {/* Left: Creator Star Core */}
            <div className="p-5 rounded-2xl bg-krew-surface border border-krew-border flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-krew-lavender bg-krew-purple/20 px-2 py-0.5 rounded border border-krew-purple/40">
                  THE STAR (YOU)
                </span>
                <h3 className="text-xl font-bold font-display text-white mt-2">
                  Creative Direction & Approval
                </h3>
                <p className="text-xs text-krew-text-secondary mt-1 leading-relaxed">
                  You step up to perform. You share raw stories, record camera footage, and give creative sign-off.
                </p>
              </div>
              <div className="pt-4 border-t border-krew-border/60 mt-4 flex items-center justify-between text-xs text-krew-text-muted">
                <span>Memory Backbone:</span>
                <span className="text-white font-mono">Creator DNA</span>
              </div>
            </div>

            {/* Center: The Six Agents */}
            <div className="p-5 rounded-2xl bg-krew-card border border-krew-purple/40 md:col-span-2 shadow-purple-glow">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono uppercase tracking-wider text-krew-cyan bg-krew-cyan/15 px-2 py-0.5 rounded border border-krew-cyan/30">
                  THE CREW (6 SPECIALISED AGENTS)
                </span>
                <span className="text-[10px] font-mono text-krew-text-muted">
                  Autonomous Collaboration
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {SPECIALISED_AGENTS.map((agent) => (
                  <div
                    key={agent.id}
                    className="p-2.5 rounded-xl bg-krew-surface border border-krew-border flex items-center gap-2"
                  >
                    <span
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: agent.color }}
                    />
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-white truncate">{agent.name}</p>
                      <p className="text-[10px] text-krew-text-muted font-mono truncate">{agent.cinematicRole}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 p-3 rounded-xl bg-krew-surface/60 border border-krew-border/60 flex items-center justify-between text-xs">
                <span className="text-krew-text-secondary">Next Production: "The Death of the Solo Creator"</span>
                <span className="text-krew-lavender font-mono font-semibold">4 Clips • 3 Thumbnails</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — THE PROBLEM */}
      <section id="problem" className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="rose" size="sm" className="mb-4">
            The Solo Creator Crisis
          </Badge>
          <h2 className="font-display font-bold text-3xl sm:text-5xl text-white tracking-tight mb-6">
            Being the Star Shouldn't Mean Doing Everything.
          </h2>
          <p className="text-base sm:text-lg text-krew-text-secondary leading-relaxed">
            In Bollywood cinema, an actor never sets up the key lights, cuts the negative, and prints movie posters alone. Yet today’s digital creator is forced to juggle six demanding professions simultaneously.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card padding="lg" className="border-rose-500/20 bg-krew-surface/40">
            <h4 className="font-display text-lg font-bold text-white mb-2">
              Fragmented Tools & Context Loss
            </h4>
            <p className="text-xs text-krew-text-secondary leading-relaxed">
              Jumping between 6 different subscriptions: one for research, one for scripting, another for captions, another for clipping, and another for scheduling. None of them share memory.
            </p>
          </Card>

          <Card padding="lg" className="border-rose-500/20 bg-krew-surface/40">
            <h4 className="font-display text-lg font-bold text-white mb-2">
              Exhaustion & Creative Burnout
            </h4>
            <p className="text-xs text-krew-text-secondary leading-relaxed">
              80% of a creator's time is spent on repetitive production logistics rather than performing, filming, and engaging deeply with their audience.
            </p>
          </Card>

          <Card padding="lg" className="border-rose-500/20 bg-krew-surface/40">
            <h4 className="font-display text-lg font-bold text-white mb-2">
              Inconsistent Multi-Platform Quality
            </h4>
            <p className="text-xs text-krew-text-secondary leading-relaxed">
              High-effort YouTube master videos get dumped onto LinkedIn or Reels with generic AI summaries that ignore platform culture and destroy brand trust.
            </p>
          </Card>
        </div>
      </section>

      {/* SECTION 4 — THE KREW SOLUTION */}
      <section id="crew" className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="purple" size="sm" className="mb-4">
            The Digital Production Crew
          </Badge>
          <h2 className="font-display font-bold text-3xl sm:text-5xl text-white tracking-tight mb-6">
            Meet the Crew Behind Every Great Creator.
          </h2>
          <p className="text-base sm:text-lg text-krew-text-secondary leading-relaxed">
            Six specialised AI roles that operate as a cohesive workforce behind the scenes, bound together by your Creator DNA Memory Engine.
          </p>
        </div>

        {/* Interactive Crew Tabs */}
        <div className="space-y-6">
          <div className="flex items-center justify-center flex-wrap gap-2">
            {SPECIALISED_AGENTS.map((agent) => (
              <button
                key={agent.id}
                onClick={() => setActiveTabRole(agent.role)}
                className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                  activeTabRole === agent.role
                    ? 'bg-krew-purple text-white shadow-purple-glow'
                    : 'bg-krew-surface text-krew-text-secondary hover:text-white border border-krew-border'
                }`}
              >
                {agent.name}
              </button>
            ))}
          </div>

          <Card padding="lg" className="border-krew-purple/40 bg-krew-card">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span
                    className="w-3.5 h-3.5 rounded-full"
                    style={{ backgroundColor: activeAgent.color }}
                  />
                  <h3 className="font-display text-2xl font-bold text-white">
                    {activeAgent.name}
                  </h3>
                </div>
                <p className="text-xs font-mono text-krew-lavender uppercase tracking-wider">
                  {activeAgent.cinematicRole} • {activeAgent.technicalIdentity}
                </p>
                <p className="text-sm text-krew-text-secondary leading-relaxed">
                  "{activeAgent.tagline}"
                </p>
                <div className="p-3 rounded-xl bg-krew-surface border border-krew-border text-xs text-krew-text-secondary">
                  <strong className="text-white block mb-1">Tone & Persona:</strong>
                  {activeAgent.personality}
                </div>
              </div>

              <div className="space-y-3">
                <h5 className="text-xs font-mono uppercase tracking-wider text-krew-text-muted">
                  Core Responsibilities
                </h5>
                <ul className="space-y-2 text-xs text-krew-text-secondary">
                  {activeAgent.responsibilities.map((r, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-krew-purple shrink-0 mt-0.5" />
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4">
                <h5 className="text-xs font-mono uppercase tracking-wider text-krew-text-muted">
                  Planned Sprint Capabilities
                </h5>
                <div className="space-y-2">
                  {activeAgent.capabilities.map((cap, i) => (
                    <div key={i} className="p-3 rounded-xl bg-krew-surface border border-krew-border">
                      <div className="flex items-center justify-between text-xs font-semibold text-white mb-0.5">
                        <span>{cap.title}</span>
                        <span className="text-[10px] text-amber-400 font-mono">Live Sprint</span>
                      </div>
                      <p className="text-[11px] text-krew-text-muted">{cap.description}</p>
                    </div>
                  ))}
                </div>
                <Link to="/crew" className="inline-block w-full">
                  <Button variant="outline" size="sm" className="w-full">
                    Inspect Full Workforce Architecture
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* SECTION 5 — HOW IT WORKS */}
      <section id="how-it-works" className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="cyan" size="sm" className="mb-4">
            Production Pipeline
          </Badge>
          <h2 className="font-display font-bold text-3xl sm:text-5xl text-white tracking-tight mb-6">
            How KREW Transforms Your Raw Vision.
          </h2>
          <p className="text-base sm:text-lg text-krew-text-secondary leading-relaxed">
            From single upload to cross-platform campaign distribution with continuous human-in-the-loop governance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
          {workflowSteps.map((step, idx) => (
            <div
              key={step.step}
              className="p-5 rounded-2xl bg-krew-card border border-krew-border flex flex-col justify-between relative group hover:border-krew-purple/50 transition-colors"
            >
              <div>
                <span className="text-2xl font-bold font-mono text-krew-lavender mb-3 block">
                  {step.step}
                </span>
                <h4 className="text-sm font-bold text-white mb-2 leading-snug">
                  {step.title}
                </h4>
                <p className="text-xs text-krew-text-secondary leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 6 — PRODUCT DIFFERENTIATORS */}
      <section id="differentiators" className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="purple" size="sm" className="mb-4">
            Technical Moats
          </Badge>
          <h2 className="font-display font-bold text-3xl sm:text-5xl text-white tracking-tight mb-6">
            Six USPs That Separate KREW from Generic AI Tools.
          </h2>
          <p className="text-base sm:text-lg text-krew-text-secondary leading-relaxed">
            Architected specifically for the demands of high-output digital filmmakers and content entrepreneurs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {differentiators.map((diff, idx) => (
            <Card key={idx} padding="lg" glowOnHover className="bg-krew-surface/60 border-krew-border">
              <div className="p-3 rounded-xl bg-krew-card border border-krew-border inline-block mb-4">
                {diff.icon}
              </div>
              <h4 className="font-display text-lg font-bold text-white mb-2">
                {diff.title}
              </h4>
              <p className="text-xs text-krew-text-secondary leading-relaxed">
                {diff.description}
              </p>
            </Card>
          ))}
        </div>
      </section>

      {/* SECTION 7 — PRODUCT PREVIEW */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-krew-card to-krew-bg border border-krew-purple/30 text-center relative overflow-hidden">
          <Badge variant="purple" size="sm" className="mb-4">
            Interactive Studio Walkthrough
          </Badge>
          <h3 className="font-display text-2xl sm:text-4xl font-bold text-white mb-4">
            A Workspace Built for the Star.
          </h3>
          <p className="text-sm sm:text-base text-krew-text-secondary max-w-2xl mx-auto mb-8">
            Experience our comprehensive suite of workspaces: from the Creator DNA Memory Engine to Clip Intelligence, Thumbnail Studio, and Distribution Desk.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link to="/dashboard">
              <Button variant="primary" size="md">Command Center</Button>
            </Link>
            <Link to="/creator-dna">
              <Button variant="secondary" size="md">Creator DNA</Button>
            </Link>
            <Link to="/clip-intelligence">
              <Button variant="secondary" size="md">Clip Intelligence</Button>
            </Link>
            <Link to="/thumbnail-studio">
              <Button variant="secondary" size="md">Thumbnail Studio</Button>
            </Link>
            <Link to="/distribution">
              <Button variant="secondary" size="md">Distribution Desk</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 8 — FINAL CTA */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
        <div className="p-10 sm:p-16 rounded-3xl bg-gradient-to-r from-krew-purple/20 via-krew-charcoal to-krew-cyan/20 border border-krew-purple/40 shadow-purple-glow">
          <h2 className="font-display font-bold text-3xl sm:text-5xl text-white mb-4">
            Ready for Your Next Big Production?
          </h2>
          <p className="text-base sm:text-lg text-krew-lavender max-w-xl mx-auto mb-8">
            Stop managing six tools. Step into your unified autonomous production studio.
          </p>
          <Link to="/dashboard">
            <Button
              variant="primary"
              size="lg"
              rightIcon={<ArrowRight className="w-5 h-5" />}
              className="shadow-purple-glow text-base px-8 py-3.5"
            >
              Step Into Your KREW
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

