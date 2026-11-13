import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/navigation/Sidebar';
import { Header } from '../components/navigation/Header';
import { Sparkles } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export const AppLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { demoMode } = useAuth();

  return (
    <div className="min-h-screen bg-krew-bg text-krew-text-primary flex">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Studio Viewport */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-64">
        {/* Top Header */}
        <Header onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        {demoMode && <div className="bg-amber-500/10 border-b border-amber-500/20 px-4 sm:px-8 py-2 text-[11px] font-mono text-amber-200">Local DEMO MODE session · in-memory session state · not production-secure</div>}

        {/* 50/50 Hackathon Governance Notice Banner */}
        <div className="bg-krew-purple/10 border-b border-krew-purple/20 px-4 sm:px-8 py-2 flex items-center justify-between text-[11px] font-mono text-krew-lavender">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-krew-purple shrink-0" />
            <span>
              <strong>50/50 Rule Active:</strong> UI/UX, DNA Memory schema & API scaffolding operational. Actual autonomous LLM execution reserved for live 6h sprint.
            </span>
          </div>
          <span className="hidden md:inline-block text-krew-text-muted">
            Track: Autonomous Creator Agents
          </span>
        </div>

        {/* Page Content Container */}
        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

