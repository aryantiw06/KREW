import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../hooks/useToast';
import { KrewLogo } from '../../components/common/KrewLogo';
import { Card } from '../../components/common/Card';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { StatusPill } from '../../components/common/StatusPill';
import { ArrowRight, User, Mail, Lock } from 'lucide-react';

export const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const { showToast } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      showToast({ title: 'Missing Fields', message: 'Please complete all required fields.', type: 'error' });
      return;
    }
    setIsLoading(true);
    await signup(name, email, password);
    setIsLoading(false);
    showToast({ title: 'Welcome to KREW!', message: 'Creator profile scaffold initialized.', type: 'success' });
    navigate('/creator-dna');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <KrewLogo size="lg" showTagline className="justify-center" />
          <h2 className="font-display font-bold text-2xl text-white tracking-tight pt-4">
            Initialize Your Creator DNA
          </h2>
          <p className="text-xs text-krew-text-secondary">
            Step onto the stage. KREW will assemble your production crew.
          </p>
        </div>

        <Card padding="lg" className="border-krew-border/80 bg-krew-card shadow-2xl">
          <div className="mb-4">
            <StatusPill type="architected" label="Registration Scaffolding" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Creator / Brand Name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Aryan Sharma"
              leftIcon={<User className="w-4 h-4" />}
              required
            />

            <Input
              label="Work Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="creator@krew.studio"
              leftIcon={<Mail className="w-4 h-4" />}
              required
            />

            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              leftIcon={<Lock className="w-4 h-4" />}
              required
            />

            <Button
              type="submit"
              variant="primary"
              size="md"
              isLoading={isLoading}
              rightIcon={<ArrowRight className="w-4 h-4" />}
              className="w-full shadow-purple-glow"
            >
              Assemble My Crew
            </Button>
          </form>

          <div className="mt-6 pt-5 border-t border-krew-border/60 text-center text-xs text-krew-text-secondary">
            <span>Already have an account? </span>
            <Link to="/login" className="text-krew-lavender font-semibold hover:underline">
              Sign In
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};
