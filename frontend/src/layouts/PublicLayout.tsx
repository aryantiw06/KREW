import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/navigation/Navbar';
import { Footer } from '../components/navigation/Footer';

export const PublicLayout: React.FC = () => {
  return (
    <div className="public-studio-backdrop min-h-screen flex flex-col text-krew-text-primary selection:bg-krew-purple selection:text-white">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

