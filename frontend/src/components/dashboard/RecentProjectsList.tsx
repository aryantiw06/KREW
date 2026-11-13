import React, { useEffect, useState } from 'react';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { ContentProject } from '../../types/project.types';
import { useAuth } from '../../contexts/AuthContext';
import { projectService } from '../../services/projectService';
import { formatDuration, formatDate } from '../../utils/formatters';
import { Film, Clock, ArrowRight, Play, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const RecentProjectsList: React.FC = () => {
  const navigate = useNavigate();
  const {user}=useAuth(); const [projects,setProjects]=useState<ContentProject[]>([]); const [loading,setLoading]=useState(true); const [error,setError]=useState('');
  useEffect(()=>{if(!user?.token)return; projectService.list(user.token,{sort:'desc'}).then(r=>{if(!r.success||!r.data)throw new Error(r.message);setProjects(r.data.items.filter(p=>p.status!=='archived').slice(0,4));}).catch(e=>setError(e instanceof Error?e.message:'Unable to load recent projects')).finally(()=>setLoading(false));},[user?.token]);

  const statusBadges = {
    review_ready: <Badge variant="cyan" size="xs">Review Ready</Badge>,
    in_production: <Badge variant="purple" size="xs">In Production</Badge>,
    draft: <Badge variant="neutral" size="xs">Draft</Badge>,
    queued: <Badge variant="neutral" size="xs">Queued</Badge>,
    approved: <Badge variant="emerald" size="xs">Approved</Badge>,
    archived: <Badge variant="neutral" size="xs">Archived</Badge>
  };

  return (
    <Card padding="md" className="space-y-4">
      <div className="flex items-center justify-between border-b border-krew-border/60 pb-3">
        <div>
          <h4 className="font-display font-bold text-white text-base">
            Recent Studio Productions
          </h4>
          <p className="text-xs text-krew-text-secondary">
            Backend-saved projects; no agent processing is implied.
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
          onClick={() => navigate('/production')}
        >
          View All
        </Button>
      </div>

      <div className="space-y-3">
        {loading ? <p className="text-sm text-krew-text-secondary">Loading projects…</p> : error ? <p role="alert" className="text-sm text-rose-300">{error}</p> : projects.length === 0 ? <p className="text-sm text-krew-text-secondary">No projects yet. Create a draft in Production Studio.</p> : projects.map((project) => (
          <div
            key={project.id}
            onClick={() => navigate('/production')}
            className="p-3.5 rounded-xl bg-krew-surface hover:bg-krew-cardHover border border-krew-border hover:border-krew-purple/40 transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3"
          >
            <div className="flex items-start gap-3 min-w-0">
              <div className="w-9 h-9 rounded-lg bg-krew-card border border-krew-border flex items-center justify-center text-krew-lavender shrink-0 mt-0.5">
                <Film className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  {statusBadges[project.status] || <Badge variant="neutral" size="xs">{project.status}</Badge>}
                  {project.sourceDuration && (
                    <span className="text-[11px] font-mono text-krew-text-muted flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {formatDuration(project.sourceDuration)}
                    </span>
                  )}
                </div>
                <h5 className="text-sm font-semibold text-white truncate max-w-lg">
                  {project.title}
                </h5>
                <div className="flex flex-wrap items-center gap-2 text-xs text-krew-text-muted mt-1">
                  <span>{project.targetPlatforms.join(' • ')}</span>
                  <span>•</span>
                  <span>{formatDate(project.createdAt)}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

