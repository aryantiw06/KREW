import React, { useState } from 'react';
import { SAMPLE_PROJECTS } from '../../data/sampleProjects';
import { ContentProject, ProjectStatus } from '../../types/project.types';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Input, Textarea } from '../../components/common/Input';
import { Badge } from '../../components/common/Badge';
import { StatusPill } from '../../components/common/StatusPill';
import { Modal } from '../../components/common/Modal';
import { useToast } from '../../hooks/useToast';
import { formatDuration, formatDate } from '../../utils/formatters';
import {
  Clapperboard,
  UploadCloud,
  Film,
  Plus,
  Clock,
  FileVideo,
  CheckCircle2,
  Filter,
  Sparkles,
  ArrowRight,
  HardDrive,
  Info
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const ProductionStudioPage: React.FC = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [projects, setProjects] = useState<ContentProject[]>(SAMPLE_PROJECTS);
  const [filter, setFilter] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New production form state
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const filteredProjects = projects.filter((p) => {
    if (filter === 'all') return true;
    return p.status === filter;
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
    }
  };

  const handleCreateProduction = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) {
      showToast({ title: 'Validation', message: 'Please provide a production title.', type: 'error' });
      return;
    }

    setIsUploading(true);
    await new Promise((r) => setTimeout(r, 900));

    const newProj: ContentProject = {
      id: `proj-${Date.now().toString().slice(-4)}`,
      title: newTitle.trim(),
      description: newDescription.trim() || 'A new multi-agent content campaign initiated by the creator.',
      sourceType: selectedFile ? 'raw_video' : 'topic_brief',
      sourceFileName: selectedFile?.name || 'concept_manifest.pdf',
      sourceDuration: 720,
      fileSizeBytes: selectedFile?.size || 150000000,
      status: 'in_production',
      targetPlatforms: ['YouTube', 'Instagram', 'LinkedIn'],
      activeAgents: ['director', 'writer', 'editor'],
      pipelineStep: 2,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      clipsCount: 0,
      thumbnailCount: 0
    };

    setProjects([newProj, ...projects]);
    setIsUploading(false);
    setIsModalOpen(false);
    setNewTitle('');
    setNewDescription('');
    setSelectedFile(null);

    showToast({
      title: 'Production Created',
      message: 'The Director has received your brief and initialized agent task manifests.',
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
              <Clapperboard className="w-3.5 h-3.5 text-krew-purple" />
              <span>PROJECT MANAGEMENT PIPELINE</span>
            </span>
            <StatusPill type="architected" label="Production Studio Ready" />
          </div>
          <h1 className="font-display font-bold text-3xl text-white tracking-tight">
            Production Studio
          </h1>
          <p className="text-xs sm:text-sm text-krew-text-secondary mt-1 max-w-2xl">
            Where master content campaigns are born. Upload raw footage or topic briefs to dispatch your autonomous crew.
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          onClick={() => setIsModalOpen(true)}
          leftIcon={<Plus className="w-4 h-4" />}
          className="shadow-purple-glow"
        >
          New Production
        </Button>
      </div>

      {/* Upload Zone & Quick Ingestion Banner */}
      <Card
        padding="lg"
        className="border-dashed border-krew-purple/40 bg-gradient-to-br from-krew-surface/60 to-krew-card text-center cursor-pointer hover:border-krew-purple transition-all"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="max-w-xl mx-auto space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-krew-purple/15 text-krew-lavender border border-krew-purple/30 flex items-center justify-center mx-auto shadow-purple-glow">
            <UploadCloud className="w-7 h-7" />
          </div>
          <h3 className="font-display text-xl font-bold text-white">
            Start a New Master Production
          </h3>
          <p className="text-xs text-krew-text-secondary leading-relaxed">
            Drag and drop 4K master video files, podcast WAV audio, or PDF topic briefs. Supported: <span className="font-mono text-krew-lavender">MP4, MOV, MKV, ProRes, WAV, MP3, PDF</span> up to 10GB.
          </p>
          <div className="pt-2">
            <Button variant="outline" size="sm" leftIcon={<FileVideo className="w-4 h-4" />}>
              Select Master Footage
            </Button>
          </div>
        </div>
      </Card>

      {/* Filter and Projects Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {['all', 'in_production', 'review_ready', 'scheduled', 'draft'].map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-colors ${
                filter === s
                  ? 'bg-krew-purple text-white shadow-sm'
                  : 'bg-krew-surface text-krew-text-muted hover:text-white border border-krew-border'
              }`}
            >
              {s.replace('_', ' ')}
            </button>
          ))}
        </div>

        <span className="text-xs font-mono text-krew-text-muted">
          Showing {filteredProjects.length} of {projects.length} productions
        </span>
      </div>

      {/* Project Cards Grid */}
      <div className="space-y-4">
        {filteredProjects.map((project) => (
          <Card
            key={project.id}
            padding="md"
            glowOnHover
            className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-krew-card"
          >
            <div className="flex items-start gap-4 min-w-0">
              <div className="w-12 h-12 rounded-xl bg-krew-surface border border-krew-border flex items-center justify-center text-krew-purple shrink-0">
                <Film className="w-6 h-6" />
              </div>
              <div className="min-w-0 space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant={project.status === 'review_ready' ? 'cyan' : 'purple'} size="xs">
                    {project.status.replace('_', ' ').toUpperCase()}
                  </Badge>
                  {project.sourceDuration && (
                    <span className="text-[11px] font-mono text-krew-text-muted flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {formatDuration(project.sourceDuration)}
                    </span>
                  )}
                  {project.fileSizeBytes && (
                    <span className="text-[11px] font-mono text-krew-text-muted flex items-center gap-1">
                      <HardDrive className="w-3 h-3" />
                      {(project.fileSizeBytes / (1024 * 1024 * 1024)).toFixed(1)} GB
                    </span>
                  )}
                </div>

                <h3 className="font-display text-lg font-bold text-white truncate max-w-2xl">
                  {project.title}
                </h3>
                <p className="text-xs text-krew-text-secondary line-clamp-2 max-w-2xl">
                  {project.description}
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-krew-text-muted font-mono">
                  <span>File: {project.sourceFileName}</span>
                  <span>•</span>
                  <span>Stage {project.pipelineStep}/5</span>
                  <span>•</span>
                  <span>Created: {formatDate(project.createdAt)}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 self-end lg:self-center shrink-0">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/clip-intelligence')}
              >
                Clips ({project.clipsCount || 0})
              </Button>
              <Button
                variant="primary"
                size="sm"
                rightIcon={<ArrowRight className="w-4 h-4" />}
                onClick={() => navigate('/distribution')}
              >
                Open Campaign
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* New Production Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Initialize New Content Production"
        subtitle="The Director will receive this brief and coordinate The Writer, Editor, and Cinematographer."
        maxWidth="xl"
      >
        <form onSubmit={handleCreateProduction} className="space-y-4">
          <Input
            label="Production Title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="e.g. Why Christopher Nolan Never Cuts in the Middle of Action"
            required
          />

          <Textarea
            label="Creative Brief / Master Vision"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            placeholder="Explain what the video is about, the target lesson, emotional climax, and platforms..."
            rows={3}
          />

          {/* Local File Ingestion */}
          <div className="space-y-1.5">
            <label className="block text-xs font-medium uppercase tracking-wider text-krew-text-secondary">
              Attach Master Footage or Topic Brief (Optional)
            </label>
            <div className="border border-dashed border-krew-border rounded-xl p-4 bg-krew-surface text-center">
              <input
                type="file"
                id="file-upload"
                onChange={handleFileChange}
                className="hidden"
                accept="video/*,audio/*,.pdf"
              />
              <label
                htmlFor="file-upload"
                className="cursor-pointer flex flex-col items-center justify-center gap-1 text-xs text-krew-text-secondary hover:text-white"
              >
                <FileVideo className="w-6 h-6 text-krew-lavender" />
                <span className="font-semibold text-white">
                  {selectedFile ? selectedFile.name : 'Click to select local file'}
                </span>
                <span className="text-[10px] text-krew-text-muted">
                  {selectedFile
                    ? `${(selectedFile.size / (1024 * 1024)).toFixed(1)} MB selected`
                    : 'MP4, MOV, MKV, WAV, PDF'}
                </span>
              </label>
            </div>
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              variant="primary"
              size="md"
              isLoading={isUploading}
              className="w-full shadow-purple-glow"
            >
              Dispatch KREW Workforce
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

