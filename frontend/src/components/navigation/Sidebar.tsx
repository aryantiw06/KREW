import React from 'react';
import { NavLink } from 'react-router-dom';
import { KrewLogo } from '../common/KrewLogo';
import { useAuth } from '../../contexts/AuthContext';
import {
  LayoutDashboard,
  Dna,
  Users2,
  Clapperboard,
  Scissors,
  Image as ImageIcon,
  Share2,
  TrendingUp,
  Settings,
  LogOut,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { cn } from '../../utils/cn';

interface SidebarProps {
  isOpen: boolean;
  onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();

  const navItems = [
    {
      to: '/dashboard',
      label: 'Command Center',
      icon: <LayoutDashboard className="w-5 h-5" />,
      badge: 'Main'
    },
    {
      to: '/creator-dna',
      label: 'My Creator DNA',
      icon: <Dna className="w-5 h-5 text-krew-purple" />,
      badge: 'Memory'
    },
    {
      to: '/crew',
      label: 'Meet the KREW',
      icon: <Users2 className="w-5 h-5 text-krew-cyan" />,
      badge: '6 Agents'
    },
    {
      to: '/production',
      label: 'Production Studio',
      icon: <Clapperboard className="w-5 h-5" />,
      badge: null
    },
    {
      to: '/clip-intelligence',
      label: 'Clip Intelligence',
      icon: <Scissors className="w-5 h-5 text-rose-400" />,
      badge: 'Editor'
    },
    {
      to: '/thumbnail-studio',
      label: 'Thumbnail Studio',
      icon: <ImageIcon className="w-5 h-5 text-amber-400" />,
      badge: 'Visual'
    },
    {
      to: '/distribution',
      label: 'Distribution Desk',
      icon: <Share2 className="w-5 h-5 text-emerald-400" />,
      badge: 'Publicist'
    },
    {
      to: '/growth-insights',
      label: 'Growth Insights',
      icon: <TrendingUp className="w-5 h-5 text-purple-400" />,
      badge: 'Producer'
    },
    {
      to: '/settings',
      label: 'Settings & Integrations',
      icon: <Settings className="w-5 h-5" />,
      badge: null
    }
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/70 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Persistent Sidebar */}
      <aside
        className={cn(
          'fixed top-0 bottom-0 left-0 z-40 w-64 bg-krew-charcoal border-r border-krew-border flex flex-col justify-between transition-transform duration-300 lg:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Brand Header */}
        <div className="h-20 px-6 flex items-center border-b border-krew-border/60">
          <KrewLogo size="sm" showTagline />
        </div>

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          <div className="px-3 pb-2 text-[10px] font-mono uppercase tracking-wider text-krew-text-muted">
            Production Studio
          </div>
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onClose}
              className={({ isActive }) =>
                cn(
                  'flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all group',
                  isActive
                    ? 'bg-krew-purple/15 text-white border border-krew-purple/40 shadow-sm'
                    : 'text-krew-text-secondary hover:text-white hover:bg-white/5'
                )
              }
            >
              {({ isActive }) => (
                <>
                  <div className="flex items-center gap-3">
                    <span
                      className={cn(
                        'transition-transform duration-200 group-hover:scale-110',
                        isActive ? 'text-krew-lavender' : 'text-krew-text-muted group-hover:text-white'
                      )}
                    >
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </div>

                  {item.badge && (
                    <span
                      className={cn(
                        'text-[10px] font-mono px-2 py-0.5 rounded-full border',
                        isActive
                          ? 'border-krew-purple/40 bg-krew-purple/20 text-krew-lavender'
                          : 'border-krew-border bg-krew-surface text-krew-text-muted'
                      )}
                    >
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>

        {/* User Star Profile / Footer */}
        <div className="p-3 border-t border-krew-border/60 bg-krew-bg/60">
          <div className="p-2.5 rounded-xl bg-krew-surface border border-krew-border flex items-center justify-between">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="relative w-8 h-8 rounded-full overflow-hidden border border-krew-purple shrink-0">
                <img
                  src={user?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}
                  alt="Creator Avatar"
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-500 border border-krew-bg"></span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-white truncate">
                  {user?.name || 'Creator Star'}
                </p>
                <p className="text-[10px] text-krew-text-muted truncate">
                  {user?.handle || '@creator'}
                </p>
              </div>
            </div>

            <button
              onClick={logout}
              title="Sign Out"
              className="p-1.5 text-krew-text-muted hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

