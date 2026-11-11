import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../hooks/useToast';
import { Card } from '../../components/common/Card';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { StatusPill } from '../../components/common/StatusPill';
import {
  Settings as SettingsIcon,
  Key,
  Shield,
  Bell,
  Cpu,
  Sparkles,
  Save,
  CheckCircle2,
  Lock
} from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { user } = useAuth();
  const { showToast } = useToast();

  const [geminiApiKey, setGeminiApiKey] = useState('AIzaSy*******************************');
  const [openAiKey, setOpenAiKey] = useState('');
  const [anthropicKey, setAnthropicKey] = useState('');
  const [storageProvider, setStorageProvider] = useState('local');

  const handleSaveApiKeys = (e: React.FormEvent) => {
    e.preventDefault();
    showToast({
      title: 'Provider Keys Stored Locally',
      message: 'Keys ready for live hackathon autonomous agent orchestration.',
      type: 'success'
    });
  };

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-krew-border/60 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono uppercase tracking-wider text-krew-lavender bg-krew-purple/15 px-2.5 py-0.5 rounded-full border border-krew-purple/30 flex items-center gap-1.5">
              <SettingsIcon className="w-3.5 h-3.5 text-krew-purple" />
              <span>STUDIO CONFIGURATION</span>
            </span>
            <StatusPill type="architected" label="Settings Scaffolding" />
          </div>
          <h1 className="font-display font-bold text-3xl text-white tracking-tight">
            Settings & Integrations
          </h1>
          <p className="text-xs sm:text-sm text-krew-text-secondary mt-1 max-w-2xl">
            Configure your creator workspace, team preferences, and API integrations reserved for autonomous LLM agent execution during the live hackathon sprint.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Card 1: Live Sprint Model & AI Orchestration Keys */}
        <Card padding="lg" className="space-y-5 border-krew-purple/40 bg-krew-card">
          <div className="flex items-center justify-between border-b border-krew-border/60 pb-3">
            <div className="flex items-center gap-2">
              <Key className="w-5 h-5 text-krew-purple" />
              <h3 className="font-display text-lg font-bold text-white">
                Live Sprint LLM Provider Config
              </h3>
            </div>
            <StatusPill type="live_reserved" label="Live Sprint Ready" />
          </div>

          <p className="text-xs text-krew-text-secondary leading-relaxed">
            These API keys will be used by the backend orchestrator during the 6-hour hackathon to power Gemini multimodal video analysis, script generation, and multi-agent coordination.
          </p>

          <form onSubmit={handleSaveApiKeys} className="space-y-4">
            <Input
              label="Google Gemini API Key (Primary Recommended)"
              type="password"
              value={geminiApiKey}
              onChange={(e) => setGeminiApiKey(e.target.value)}
              placeholder="AIzaSy..."
              leftIcon={<Cpu className="w-4 h-4 text-krew-cyan" />}
              hint="Powers Strategy, Video Intelligence, and Visual Agents."
            />

            <Input
              label="OpenAI API Key (Secondary Optional)"
              type="password"
              value={openAiKey}
              onChange={(e) => setOpenAiKey(e.target.value)}
              placeholder="sk-proj-..."
              leftIcon={<Key className="w-4 h-4 text-krew-text-muted" />}
            />

            <Input
              label="Anthropic Claude API Key (Optional)"
              type="password"
              value={anthropicKey}
              onChange={(e) => setAnthropicKey(e.target.value)}
              placeholder="sk-ant-..."
              leftIcon={<Key className="w-4 h-4 text-krew-text-muted" />}
            />

            <Button
              type="submit"
              variant="primary"
              size="md"
              leftIcon={<Save className="w-4 h-4" />}
              className="w-full shadow-purple-glow"
            >
              Save Model Configuration
            </Button>
          </form>
        </Card>

        {/* Card 2: Creator Studio Preferences */}
        <Card padding="lg" className="space-y-5 bg-krew-card border-krew-border">
          <div className="flex items-center gap-2 border-b border-krew-border/60 pb-3">
            <Shield className="w-5 h-5 text-krew-cyan" />
            <h3 className="font-display text-lg font-bold text-white">
              Studio Governance & Security
            </h3>
          </div>

          <div className="space-y-3">
            <div className="p-3.5 rounded-xl bg-krew-surface border border-krew-border flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-white">Human-in-the-Loop Safeguard</p>
                <p className="text-xs text-krew-text-muted">
                  Require explicit creator sign-off before any content is marked distribution ready.
                </p>
              </div>
              <Badge variant="emerald" size="xs">
                MANDATORY (ON)
              </Badge>
            </div>

            <div className="p-3.5 rounded-xl bg-krew-surface border border-krew-border flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-white">Creator DNA Memory Persistence</p>
                <p className="text-xs text-krew-text-muted">
                  Synchronize vocabulary rules and forbidden words across all 6 agent prompts.
                </p>
              </div>
              <Badge variant="purple" size="xs">
                ACTIVE
              </Badge>
            </div>

            <div className="p-3.5 rounded-xl bg-krew-surface border border-krew-border flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-white">Local Asset Storage</p>
                <p className="text-xs text-krew-text-muted">
                  Keep raw media assets on local machine during pre-event prototyping.
                </p>
              </div>
              <Badge variant="cyan" size="xs">
                LOCAL MODE
              </Badge>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-krew-bg border border-krew-border space-y-1 text-xs">
            <span className="font-mono text-krew-lavender font-semibold block">
              Hackathon Track Note:
            </span>
            <p className="text-krew-text-secondary leading-relaxed">
              GeNarrative Clash 2026: Autonomous Creator Agents — Content Strategy & Distribution. 50% pre-event rule strictly respected.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

