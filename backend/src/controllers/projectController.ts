import { Request, Response } from 'express';
import { sendSuccess, sendError } from '../utils/apiResponse';
import { IContentProject } from '../interfaces/IContentProject';

// In-memory collection initialized with sample projects for instant testing
let projectsStore: IContentProject[] = [
  {
    id: 'proj-001',
    creatorId: 'usr-001',
    title: 'The Death of the Solo Creator: Why Autonomous AI Crews are Winning in 2026',
    description: 'A deep-dive video essay exploring how modern digital filmmakers use collaborative AI agents.',
    sourceType: 'raw_video',
    sourceFileName: 'master_essay_ai_crews_4k_prores.mov',
    sourceDuration: 885,
    fileSizeBytes: 2450000000,
    status: 'review_ready',
    targetPlatforms: ['YouTube', 'Instagram', 'LinkedIn'],
    activeAgents: ['director', 'writer', 'editor', 'cinematographer', 'publicist'],
    pipelineStep: 4,
    createdAt: new Date('2026-11-09T08:15:00Z'),
    updatedAt: new Date('2026-11-11T12:00:00Z')
  },
  {
    id: 'proj-002',
    creatorId: 'usr-001',
    title: 'Deconstructing Christopher Nolan’s Sound Design for Mobile Screens',
    description: 'Analyzing frequency curves, dynamic range compression, and dialogue clarity.',
    sourceType: 'raw_video',
    sourceFileName: 'nolan_audio_breakdown_raw.mp4',
    sourceDuration: 620,
    fileSizeBytes: 1240000000,
    status: 'in_production',
    targetPlatforms: ['YouTube', 'Instagram', 'LinkedIn'],
    activeAgents: ['director', 'writer', 'editor'],
    pipelineStep: 3,
    createdAt: new Date('2026-11-10T11:30:00Z'),
    updatedAt: new Date('2026-11-11T16:20:00Z')
  }
];

export function getProjects(req: Request, res: Response) {
  return sendSuccess(res, projectsStore, 'Projects fetched successfully');
}

export function getProjectById(req: Request, res: Response) {
  const { id } = req.params;
  const project = projectsStore.find((p) => p.id === id);
  if (!project) {
    return sendError(res, `Project ${id} not found`, 404);
  }
  return sendSuccess(res, project, 'Project details retrieved');
}

export function createProject(req: Request, res: Response) {
  const { title, description, sourceType, sourceFileName, targetPlatforms } = req.body;

  if (!title) {
    return sendError(res, 'Project title is required', 400);
  }

  const newProject: IContentProject = {
    id: `proj-${Date.now().toString().slice(-4)}`,
    creatorId: (req as any).user?.id || 'usr-001',
    title,
    description: description || '',
    sourceType: sourceType || 'raw_video',
    sourceFileName: sourceFileName || 'raw_recording.mp4',
    sourceDuration: 600,
    fileSizeBytes: 500000000,
    status: 'in_production',
    targetPlatforms: targetPlatforms || ['YouTube', 'Instagram'],
    activeAgents: ['director', 'writer', 'editor'],
    pipelineStep: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  projectsStore = [newProject, ...projectsStore];
  return sendSuccess(res, newProject, 'Project created and dispatched to Director agent', 201);
}

export function updateProjectStatus(req: Request, res: Response) {
  const { id } = req.params;
  const { status, pipelineStep } = req.body;

  const projectIndex = projectsStore.findIndex((p) => p.id === id);
  if (projectIndex === -1) {
    return sendError(res, `Project ${id} not found`, 404);
  }

  const existing = projectsStore[projectIndex];
  const updated: IContentProject = {
    ...existing,
    status: status || existing.status,
    pipelineStep: pipelineStep !== undefined ? pipelineStep : existing.pipelineStep,
    updatedAt: new Date()
  };

  projectsStore[projectIndex] = updated;
  return sendSuccess(res, updated, 'Project status updated');
}
