import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/common/Button';
import { Film, ArrowLeft } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <div className="w-16 h-16 rounded-2xl bg-krew-card border border-krew-border flex items-center justify-center text-krew-purple mb-4 shadow-purple-glow">
        <Film className="w-8 h-8" />
      </div>
      <span className="font-mono text-xs text-krew-lavender uppercase tracking-widest mb-1">
        404 • SCENE NOT FOUND
      </span>
      <h1 className="font-display font-bold text-3xl sm:text-4xl text-white mb-2">
        Off Script Frame
      </h1>
      <p className="text-sm text-krew-text-secondary max-w-md mb-6">
        The camera shifted away from the storyboard. The scene you are looking for has not been scheduled in this production.
      </p>
      <Link to="/dashboard">
        <Button variant="primary" leftIcon={<ArrowLeft className="w-4 h-4" />}>
          Return to Command Center
        </Button>
      </Link>
    </div>
  );
};

