import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../common/Button';
import { StatusPill } from '../common/StatusPill';
import {
  Menu,
  Search,
  Bell,
  Sparkles,
  Clapperboard,
  CheckCircle,
  Clock,
  Layers,
  ChevronDown
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  onToggleSidebar: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onToggleSidebar }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchModal, setShowSearchModal] = useState(false);

  const notifications = [
    {
      id: 'notif-1',
      title: 'The Director completed Production Brief',
      time: '12m ago',
      agent: 'The Director',
      read: false
    },
    {
      id: 'notif-2',
      title: 'The Editor flagged 4 viral clip segments',
      time: '1h ago',
      agent: 'The Editor',
      read: false
    },
    {
      id: 'notif-3',
      title: 'Creator DNA Memory Engine in sync',
      time: '3h ago',
      agent: 'Memory Engine',
      read: true
    }
  ];

  return (
    <header className="sticky top-0 z-20 h-20 bg-krew-bg/80 backdrop-blur-md border-b border-krew-border/60 px-4 sm:px-8 flex items-center justify-between gap-4">
      {/* Left: Mobile hamburger & Creator Greeting */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="p-2 lg:hidden text-krew-text-secondary hover:text-white rounded-lg hover:bg-white/5"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-display font-bold text-white text-base sm:text-lg">
              Namaste, {user?.name.split(' ')[0] || 'Star'}
            </h2>
            <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-mono text-krew-lavender bg-krew-purple/15 px-2 py-0.5 rounded-full border border-krew-purple/30">
              <Sparkles className="w-2.5 h-2.5" />
              THE STAR
            </span>
          </div>
          <p className="text-xs text-krew-text-muted hidden sm:block">
            Studio Stage Alpha • GeNarrative Clash 2026
          </p>
        </div>
      </div>

      {/* Middle: Quick Search Trigger */}
      <div className="hidden md:flex items-center max-w-xs w-full">
        <div
          onClick={() => setShowSearchModal(true)}
          className="w-full flex items-center gap-2 px-3 py-1.5 rounded-xl bg-krew-surface border border-krew-border text-krew-text-muted hover:text-krew-text-secondary hover:border-krew-borderLight cursor-pointer text-xs"
        >
          <Search className="w-4 h-4" />
          <span className="flex-1">Search productions, scripts, clips...</span>
          <kbd className="font-mono text-[10px] bg-krew-card px-1.5 py-0.5 rounded border border-krew-border">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Right Actions: Pre-Event Pill, Notifications, New Production */}
      <div className="flex items-center gap-3">
        <div className="hidden xl:block">
          <StatusPill type="architected" label="Pre-Event 50% Foundation" />
        </div>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-xl bg-krew-surface border border-krew-border text-krew-text-secondary hover:text-white hover:border-krew-borderLight transition-colors"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-krew-cyan"></span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-krew-card border border-krew-border shadow-2xl p-4 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between pb-3 border-b border-krew-border/60 mb-3">
                <span className="text-xs font-semibold text-white uppercase tracking-wider font-mono">
                  Agent Feed
                </span>
                <span className="text-[10px] text-krew-text-muted font-mono">
                  3 updates
                </span>
              </div>
              <div className="space-y-2.5">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className="p-2.5 rounded-xl bg-krew-surface/60 border border-krew-border/40 hover:border-krew-purple/40 transition-colors"
                  >
                    <div className="flex items-center justify-between text-[11px] mb-1">
                      <span className="font-medium text-krew-lavender">{n.agent}</span>
                      <span className="text-krew-text-muted text-[10px]">{n.time}</span>
                    </div>
                    <p className="text-xs text-krew-text-primary">{n.title}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* New Production CTA */}
        <Button
          variant="primary"
          size="sm"
          leftIcon={<Clapperboard className="w-4 h-4" />}
          onClick={() => navigate('/production')}
        >
          <span className="hidden sm:inline">New Production</span>
          <span className="sm:hidden">New</span>
        </Button>
      </div>

      {/* Search Modal */}
      {showSearchModal && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl bg-krew-card border border-krew-border p-4 shadow-2xl">
            <div className="flex items-center gap-3 border-b border-krew-border/60 pb-3">
              <Search className="w-5 h-5 text-krew-purple" />
              <input
                autoFocus
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search across campaigns, agent briefs, and clips..."
                className="w-full bg-transparent text-sm text-white focus:outline-none placeholder:text-krew-text-muted"
              />
              <button
                onClick={() => setShowSearchModal(false)}
                className="text-xs text-krew-text-muted hover:text-white"
              >
                ESC
              </button>
            </div>
            <div className="pt-3 text-xs text-krew-text-muted space-y-2">
              <p className="font-mono text-[10px] uppercase text-krew-lavender">
                Suggested Workspaces
              </p>
              <div
                onClick={() => { setShowSearchModal(false); navigate('/creator-dna'); }}
                className="p-2 rounded-lg bg-krew-surface hover:bg-krew-cardHover cursor-pointer text-white flex items-center justify-between"
              >
                <span>Edit Creator DNA Profile</span>
                <span className="text-[10px] text-krew-lavender font-mono">/creator-dna</span>
              </div>
              <div
                onClick={() => { setShowSearchModal(false); navigate('/clip-intelligence'); }}
                className="p-2 rounded-lg bg-krew-surface hover:bg-krew-cardHover cursor-pointer text-white flex items-center justify-between"
              >
                <span>Explore Clip Intelligence (The Editor)</span>
                <span className="text-[10px] text-rose-400 font-mono">/clip-intelligence</span>
              </div>
              <div
                onClick={() => { setShowSearchModal(false); navigate('/distribution'); }}
                className="p-2 rounded-lg bg-krew-surface hover:bg-krew-cardHover cursor-pointer text-white flex items-center justify-between"
              >
                <span>Review Distribution Desk (The Publicist)</span>
                <span className="text-[10px] text-emerald-400 font-mono">/distribution</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
