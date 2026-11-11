import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../hooks/useToast';
import { KrewLogo } from '../../components/common/KrewLogo';
import { Card } from '../../components/common/Card';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { StatusPill } from '../../components/common/StatusPill';
import { ArrowRight, Sparkles, Lock, Mail } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { showToast } = useToast();
  const [email, setEmail] = useState('kabir@krew.studio');
  const [password, setPassword] = useState('demo1234');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      showToast({ title: 'Validation Error', message: 'Please enter both email and password.', type: 'error' });
      return;
    }
    setIsLoading(true);
    await login(email, password);
    setIsLoading(false);
    showToast({ title: 'Welcome to KREW', message: 'Signed in as Star Kabir Sharma.', type: 'success' });
    navigate('/dashboard');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <KrewLogo size="lg" showTagline className="justify-center" />
          <h2 className="font-display font-bold text-2xl text-white tracking-tight pt-4">
            Sign In to Your Studio
          </h2>
          <p className="text-xs text-krew-text-secondary">
            Your vision. Our crew. Step into the command center.
          </p>
        </div>

        <Card padding="lg" className="border-krew-border/80 bg-krew-card shadow-2xl">
          <div className="mb-4">
            <StatusPill type="architected" label="Auth Interface Scaffolding" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Creator Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@krew.studio"
              leftIcon={<Mail className="w-4 h-4" />}
              required
            />

            <div className="space-y-1">
              <Input
                label="Master Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                leftIcon={<Lock className="w-4 h-4" />}
                required
              />
              <div className="flex justify-end pt-1">
                <Link
                  to="/forgot-password"
                  className="text-xs text-krew-lavender hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="md"
              isLoading={isLoading}
              rightIcon={<ArrowRight className="w-4 h-4" />}
              className="w-full shadow-purple-glow"
            >
              Enter Production Studio
            </Button>
          </form>

          <div className="mt-6 pt-5 border-t border-krew-border/60 text-center text-xs text-krew-text-secondary">
            <span>Don't have an account? </span>
            <Link to="/signup" className="text-krew-lavender font-semibold hover:underline">
              Create Creator Profile
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};
