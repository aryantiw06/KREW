import { Request, Response } from 'express';
import { ContentProjectModel } from '../models/ContentProject';
import { IContentProject } from '../interfaces/IContentProject';
import { isDbConnected, getPersistenceMode } from '../config/database';
import { sendSuccess, sendError } from '../utils/apiResponse';

const memoryProjects = new Map<string, IContentProject>();
const statuses = ['draft', 'queued', 'in_production', 'review_ready', 'approved', 'archived'];
const sources = ['raw_video', 'topic_brief', 'podcast_audio', 'screen_recording'];
const owner = (req: Request) => (req as any).user.id as string;
const serializable = (project: any) => project?.toJSON ? project.toJSON() : project;

async function findProject(id: string, creatorId: string): Promise<any> {
  return isDbConnected() ? ContentProjectModel.findOne({ _id: id, creatorId }) : [...memoryProjects.values()].find((item) => item.id === id && item.creatorId === creatorId) || null;
}

export async function getProjects(req: Request, res: Response) {
  try {
    const creatorId = owner(req); const { status, search, sort = 'desc' } = req.query;
    if (status && status !== 'all' && !statuses.includes(String(status))) return sendError(res, 'Invalid project status filter', 400);
    let items: any[] = isDbConnected() ? await ContentProjectModel.find({ creatorId, ...(status && status !== 'all' ? { status } : {}) }).lean() as any[] : [...memoryProjects.values()].filter((item) => item.creatorId === creatorId && (!status || status === 'all' || item.status === status));
    if (typeof search === 'string' && search.trim()) items = items.filter((item: any) => item.title.toLowerCase().includes(search.trim().toLowerCase()));
    items.sort((a: any, b: any) => (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()) * (sort === 'asc' ? 1 : -1));
    return sendSuccess(res, { items: items.map(serializable), persistence: getPersistenceMode() }, 'Projects retrieved');
  } catch { return sendError(res, 'Unable to retrieve projects', 500); }
}

export async function getProjectById(req: Request, res: Response) {
  try { const item = await findProject(req.params.id, owner(req)); return item ? sendSuccess(res, { project: serializable(item), persistence: getPersistenceMode() }, 'Project details retrieved') : sendError(res, 'Project not found', 404); }
  catch { return sendError(res, 'Unable to retrieve project', 500); }
}

export async function createProject(req: Request, res: Response) {
  const body = req.body || {};
  if (typeof body.title !== 'string' || !body.title.trim() || body.title.length > 200) return sendError(res, 'Project title is required and must be at most 200 characters', 400);
  if (body.sourceType !== undefined && !sources.includes(body.sourceType)) return sendError(res, 'Invalid source type', 400);
  if (body.targetPlatforms !== undefined && (!Array.isArray(body.targetPlatforms) || !body.targetPlatforms.every((item: unknown) => typeof item === 'string'))) return sendError(res, 'targetPlatforms must be an array of strings', 400);
  if (body.fileMetadata !== undefined && (!body.fileMetadata || typeof body.fileMetadata !== 'object' || Array.isArray(body.fileMetadata))) return sendError(res, 'fileMetadata must be an object', 400);
  try {
    const project: any = { creatorId: owner(req), title: body.title.trim(), description: typeof body.description === 'string' ? body.description : '', sourceType: body.sourceType || 'topic_brief', sourceFileName: body.sourceFileName, fileMetadata: body.fileMetadata || {}, fileSizeBytes: body.fileMetadata?.fileSizeBytes, status: 'draft', targetPlatforms: body.targetPlatforms || [], activeAgents: [], pipelineStep: 0 };
    if (isDbConnected()) { const created = await ContentProjectModel.create(project); return sendSuccess(res, { project: serializable(created), persistence: getPersistenceMode() }, 'Draft project saved to MongoDB', 201); }
    const created: IContentProject = { ...project, id: `mem-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, createdAt: new Date(), updatedAt: new Date() };
    memoryProjects.set(created.id, created);
    return sendSuccess(res, { project: created, persistence: getPersistenceMode() }, 'Draft project saved in temporary memory; it will be lost when the server restarts', 201);
  } catch { return sendError(res, 'Unable to create project', 500); }
}

export async function updateProject(req: Request, res: Response) {
  const allowed = ['title', 'description', 'sourceType', 'sourceFileName', 'fileMetadata', 'targetPlatforms'];
  const updates: any = {};
  for (const key of allowed) if (req.body?.[key] !== undefined) updates[key] = req.body[key];
  if (!Object.keys(updates).length) return sendError(res, 'No supported project fields provided', 400);
  if (updates.title !== undefined && (typeof updates.title !== 'string' || !updates.title.trim() || updates.title.length > 200)) return sendError(res, 'Invalid project title', 400);
  if (updates.sourceType !== undefined && !sources.includes(updates.sourceType)) return sendError(res, 'Invalid source type', 400);
  if (updates.targetPlatforms !== undefined && (!Array.isArray(updates.targetPlatforms) || !updates.targetPlatforms.every((item: unknown) => typeof item === 'string'))) return sendError(res, 'targetPlatforms must be an array of strings', 400);
  try {
    const existing = await findProject(req.params.id, owner(req)); if (!existing) return sendError(res, 'Project not found', 404);
    const updated = { ...serializable(existing), ...updates, title: updates.title?.trim() || existing.title, updatedAt: new Date() };
    if (isDbConnected()) { const saved = await ContentProjectModel.findOneAndUpdate({ _id: req.params.id, creatorId: owner(req) }, { $set: updates }, { new: true, runValidators: true }); return sendSuccess(res, { project: serializable(saved), persistence: getPersistenceMode() }, 'Project metadata saved'); }
    memoryProjects.set(updated.id, updated); return sendSuccess(res, { project: updated, persistence: getPersistenceMode() }, 'Project metadata saved in temporary memory');
  } catch { return sendError(res, 'Unable to update project metadata', 500); }
}

export async function updateProjectStatus(req: Request, res: Response) {
  const { status } = req.body || {}; if (!statuses.includes(status)) return sendError(res, 'Invalid project status', 400);
  try {
    const existing = await findProject(req.params.id, owner(req)); if (!existing) return sendError(res, 'Project not found', 404);
    if (isDbConnected()) { const saved = await ContentProjectModel.findOneAndUpdate({ _id: req.params.id, creatorId: owner(req) }, { $set: { status, updatedAt: new Date() } }, { new: true, runValidators: true }); return sendSuccess(res, { project: serializable(saved), persistence: getPersistenceMode() }, 'Project status updated'); }
    const updated = { ...existing, status, updatedAt: new Date() }; memoryProjects.set(updated.id, updated); return sendSuccess(res, { project: updated, persistence: getPersistenceMode() }, 'Project status updated in temporary memory');
  } catch { return sendError(res, 'Unable to update project status', 500); }
}

export async function deleteProject(req: Request, res: Response) {
  try {
    const existing = await findProject(req.params.id, owner(req)); if (!existing) return sendError(res, 'Project not found', 404);
    if (isDbConnected()) await ContentProjectModel.findOneAndUpdate({ _id: req.params.id, creatorId: owner(req) }, { $set: { status: 'archived', updatedAt: new Date() } });
    else memoryProjects.set(existing.id, { ...existing, status: 'archived', updatedAt: new Date() });
    return sendSuccess(res, { id: req.params.id, status: 'archived', persistence: getPersistenceMode() }, 'Project archived');
  } catch { return sendError(res, 'Unable to archive project', 500); }
}
