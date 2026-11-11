import React from 'react';
import { Link } from 'react-router-dom';
import { KrewLogo } from '../common/KrewLogo';
import { Badge } from '../common/Badge';
import { Github, Sparkles, Film, ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-krew-border/60 bg-krew-charcoal text-krew-text-secondary pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand Col */}
          <div className="md:col-span-1 space-y-4">
            <KrewLogo size="md" showTagline />
            <p className="text-xs text-krew-text-secondary leading-relaxed">
              KREW is the autonomous AI production workforce for modern digital creators. The content creator is the star. KREW is the crew.
            </p>
            <div className="pt-2">
              <Badge variant="purple" size="xs">
                GeNarrative Clash 2026
              </Badge>
            </div>
          </div>

          {/* Product links */}
          <div className="space-y-3">
            <h5 className="text-xs font-semibold uppercase tracking-wider text-white font-mono">
              The Crew
            </h5>
            <ul className="space-y-2 text-sm">
              <li><Link to="/crew" className="hover:text-white transition-colors">The Director (Strategy)</Link></li>
              <li><Link to="/crew" className="hover:text-white transition-colors">The Writer (Scripts)</Link></li>
              <li><Link to="/crew" className="hover:text-white transition-colors">The Editor (Video Intel)</Link></li>
              <li><Link to="/crew" className="hover:text-white transition-colors">The Cinematographer (Visuals)</Link></li>
              <li><Link to="/crew" className="hover:text-white transition-colors">The Publicist (Distribution)</Link></li>
              <li><Link to="/crew" className="hover:text-white transition-colors">The Producer (Growth)</Link></li>
            </ul>
          </div>

          {/* Platform workspaces */}
          <div className="space-y-3">
            <h5 className="text-xs font-semibold uppercase tracking-wider text-white font-mono">
              Studio Workspaces
            </h5>
            <ul className="space-y-2 text-sm">
              <li><Link to="/dashboard" className="hover:text-white transition-colors">Command Center</Link></li>
              <li><Link to="/creator-dna" className="hover:text-white transition-colors">Creator DNA Memory</Link></li>
              <li><Link to="/production" className="hover:text-white transition-colors">Production Studio</Link></li>
              <li><Link to="/clip-intelligence" className="hover:text-white transition-colors">Clip Intelligence</Link></li>
              <li><Link to="/thumbnail-studio" className="hover:text-white transition-colors">Thumbnail Studio</Link></li>
              <li><Link to="/distribution" className="hover:text-white transition-colors">Distribution Desk</Link></li>
              <li><Link to="/growth-insights" className="hover:text-white transition-colors">Growth Insights</Link></li>
            </ul>
          </div>

          {/* Architecture & Boundaries */}
          <div className="space-y-3">
            <h5 className="text-xs font-semibold uppercase tracking-wider text-white font-mono">
              Hackathon Governance
            </h5>
            <div className="p-4 rounded-xl bg-krew-surface border border-krew-border text-xs space-y-2 text-krew-text-secondary">
              <div className="flex items-center gap-1.5 text-white font-medium">
                <Film className="w-3.5 h-3.5 text-krew-purple" />
                <span>50/50 Development Rule</span>
              </div>
              <p>
                Pre-event phase strictly establishes UI/UX, layouts, schemas, API scaffolding, and documentation. Autonomous agent execution and LLM inference reserved for the live 6-hour sprint.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-krew-border/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p className="text-krew-text-muted">
            &copy; 2026 KREW Technologies. All rights reserved. Built for GeNarrative Clash 2026.
          </p>
          <div className="flex items-center gap-6 text-krew-text-secondary">
            <span className="font-mono text-krew-lavender text-[11px]">
              YOUR VISION. OUR CREW.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

