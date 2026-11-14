import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/navigation/Sidebar';
import { Header } from '../components/navigation/Header';
import { useAuth } from '../contexts/AuthContext';
import { useLocation } from 'react-router-dom';

export const AppLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { demoMode } = useAuth();
  const location = useLocation();

  return (
    <div className="min-h-screen bg-krew-bg text-krew-text-primary flex">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Studio Viewport */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-64">
        {/* Top Header */}
        <Header onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        {demoMode && <div className="border-b border-krew-status-warning/20 bg-krew-status-warning/5 px-4 py-2 text-center text-xs text-krew-status-warning sm:text-left sm:px-8">Demo session · session state is temporary</div>}

        {/* Page Content Container */}
        <main key={location.pathname} className="studio-page-enter flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

