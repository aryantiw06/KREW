import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../common/Button';
import { StatusPill } from '../common/StatusPill';
import {
  Menu,
  Search,
  Bell,
  Clapperboard,
  LogOut,
  UserRound
} from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

interface HeaderProps {
  onToggleSidebar: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onToggleSidebar }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchModal, setShowSearchModal] = useState(false);

  const notifications = [
    {
      id: 'notif-1',
      title: 'Your production workspace is ready to use.',
      time: 'Studio',
      agent: 'KREW',
      read: false
    },
    {
      id: 'notif-2',
      title: 'Clip intelligence previews use sample data.',
      time: 'Preview',
      agent: 'KREW',
      read: false
    },
    {
      id: 'notif-3',
      title: 'Agent execution is reserved for the live hackathon sprint.',
      time: 'Notice',
      agent: 'KREW',
      read: true
    }
  ];
  const pageTitles: Record<string, string> = {
    '/dashboard': 'Command Center', '/creator-dna': 'My Creator DNA', '/crew': 'Meet the KREW',
    '/production': 'Production Studio', '/clip-intelligence': 'Clip Intelligence', '/thumbnail-studio': 'Thumbnail Studio',
    '/distribution': 'Distribution Desk', '/growth-insights': 'Growth Insights', '/settings': 'Settings'
  };
  const pageTitle = pageTitles[location.pathname] || 'Studio';

  return (
    <header className="sticky top-0 z-20 min-h-20 bg-krew-bg/85 backdrop-blur-xl border-b border-krew-border/60 px-4 sm:px-8 flex items-center justify-between gap-3">
      {/* Left: Mobile hamburger & Creator Greeting */}
      <div className="flex items-center gap-3">
        <button aria-label="Open navigation menu"
          onClick={onToggleSidebar}
          className="p-2 lg:hidden text-krew-text-secondary hover:text-white rounded-lg hover:bg-white/5"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div><h2 className="font-display font-semibold text-krew-text-primary text-base sm:text-lg">{pageTitle}</h2><p className="hidden text-xs text-krew-text-muted sm:block">Your production workspace</p></div>
      </div>

      {/* Middle: Quick Search Trigger */}
        <div className="hidden md:flex items-center max-w-xs w-full">
        <button type="button" aria-label="Search the studio" onClick={() => setShowSearchModal(true)}
          className="krew-focus w-full flex items-center gap-2 px-3 py-1.5 rounded-xl bg-krew-surface text-krew-text-muted hover:text-krew-text-secondary cursor-pointer text-xs"
        >
          <Search className="w-4 h-4" />
          <span className="flex-1">Search the studio...</span>
          <kbd className="font-mono text-[10px] bg-krew-card px-1.5 py-0.5 rounded border border-krew-border">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Right Actions: Pre-Event Pill, Notifications, New Production */}
      <div className="flex items-center gap-3">
        <div className="hidden lg:block"><StatusPill type="architected" label="PRE-EVENT FOUNDATION · 50%" /></div>

        <button type="button" aria-label="Search the studio" onClick={() => setShowSearchModal(true)} className="krew-focus rounded-xl p-2 text-krew-text-secondary hover:bg-white/5 hover:text-white md:hidden"><Search className="h-4 w-4" /></button>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button aria-label="Notifications" aria-expanded={showNotifications}
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
                  Studio notices
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
        <div className="hidden sm:flex items-center gap-2 text-xs text-krew-text-secondary"><UserRound className="h-4 w-4 text-krew-text-muted" /><span className="max-w-28 truncate">{user?.name || 'Creator'}</span><button onClick={logout} title="Log out" aria-label="Log out" className="rounded-lg p-2 text-krew-text-muted transition-colors hover:bg-white/5 hover:text-krew-text-primary"><LogOut className="h-4 w-4" /></button></div>
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

