import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastProvider } from './contexts/ToastContext';
import { AuthProvider } from './contexts/AuthContext';
import { CreatorDnaProvider } from './contexts/CreatorDnaContext';

// Layouts
import { PublicLayout } from './layouts/PublicLayout';
import { AppLayout } from './layouts/AppLayout';

// Public Pages
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/auth/LoginPage';
import { SignupPage } from './pages/auth/SignupPage';
import { ForgotPasswordPage } from './pages/auth/ForgotPasswordPage';

// App Studio Pages
import { DashboardPage } from './pages/app/DashboardPage';
import { CreatorDnaPage } from './pages/app/CreatorDnaPage';
import { CrewPage } from './pages/app/CrewPage';
import { ProductionStudioPage } from './pages/app/ProductionStudioPage';
import { ClipIntelligencePage } from './pages/app/ClipIntelligencePage';
import { ThumbnailStudioPage } from './pages/app/ThumbnailStudioPage';
import { DistributionDeskPage } from './pages/app/DistributionDeskPage';
import { GrowthInsightsPage } from './pages/app/GrowthInsightsPage';
import { SettingsPage } from './pages/app/SettingsPage';
import { NotFoundPage } from './pages/NotFoundPage';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ToastProvider>
        <AuthProvider>
          <CreatorDnaProvider>
            <Routes>
              {/* Public Marketing & Auth Routes */}
              <Route element={<PublicLayout />}>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              </Route>

              {/* Protected / Studio App Routes */}
              <Route element={<AppLayout />}>
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/creator-dna" element={<CreatorDnaPage />} />
                <Route path="/crew" element={<CrewPage />} />
                <Route path="/production" element={<ProductionStudioPage />} />
                <Route path="/clip-intelligence" element={<ClipIntelligencePage />} />
                <Route path="/thumbnail-studio" element={<ThumbnailStudioPage />} />
                <Route path="/distribution" element={<DistributionDeskPage />} />
                <Route path="/growth-insights" element={<GrowthInsightsPage />} />
                <Route path="/settings" element={<SettingsPage />} />
              </Route>

              {/* 404 Catch-All */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </CreatorDnaProvider>
        </AuthProvider>
      </ToastProvider>
    </BrowserRouter>
  );
};

export default App;

