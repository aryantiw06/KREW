import { Request, Response } from 'express';
import { creatorMemoryService } from '../services/creatorMemory/creatorMemoryService';
import { sendSuccess, sendError } from '../utils/apiResponse';

function validateProfile(body: any): string | null {
  const strings = ['creatorName', 'handle', 'bio'];
  if (!body || typeof body !== 'object' || Array.isArray(body)) return 'A profile object is required';
  for (const key of strings) if (typeof body[key] !== 'string' || !body[key].trim()) return `${key} must be a non-empty string`;
  const arrays = ['contentNiche', 'primaryPlatforms', 'contentGuidelines', 'preferredVideoFormats'];
  for (const key of arrays) if (!Array.isArray(body[key]) || !body[key].every((item: unknown) => typeof item === 'string')) return `${key} must be an array of strings`;
  const nested: Array<[string, string[]]> = [['targetAudience', ['demographics', 'interests', 'painPoints']], ['communicationTone', ['primary', 'energyLevel', 'formality']], ['vocabularyPreferences', ['signaturePhrases', 'bannedWords', 'jargonLevel']], ['storytellingStyle', ['hookStyle', 'pacing', 'callToActionPreference']], ['visualIdentity', ['thumbnailStyle', 'fontPreference']]];
  for (const [objectKey, keys] of nested) {
    if (!body[objectKey] || typeof body[objectKey] !== 'object') return `${objectKey} is required`;
    for (const key of keys) {
      const value = body[objectKey][key];
      if (['interests', 'painPoints', 'signaturePhrases', 'bannedWords'].includes(key) ? !Array.isArray(value) || !value.every((item: unknown) => typeof item === 'string') : typeof value !== 'string') return `${objectKey}.${key} has an invalid type`;
    }
  }
  const colors = body.visualIdentity.brandColors;
  if (!colors || ['primary', 'secondary', 'accent'].some((key) => typeof colors[key] !== 'string' || !/^#[0-9a-fA-F]{6}$/.test(colors[key]))) return 'visualIdentity.brandColors must contain valid hex colors';
  return null;
}

function creatorId(req: Request): string { return (req as any).user?.id || 'demo-creator'; }

export async function getCreatorDna(req: Request, res: Response) {
  try { return sendSuccess(res, await creatorMemoryService.getOrCreateProfile(creatorId(req)), 'Creator DNA profile retrieved'); }
  catch { return sendError(res, 'Unable to load Creator DNA profile', 500); }
}

export async function updateCreatorDna(req: Request, res: Response) {
  const validationError = validateProfile(req.body);
  if (validationError) return sendError(res, validationError, 400);
  try { return sendSuccess(res, await creatorMemoryService.saveProfile(creatorId(req), req.body), 'Creator DNA profile saved'); }
  catch { return sendError(res, 'Unable to save Creator DNA profile', 500); }
}

export async function syncCreatorDna(req: Request, res: Response) {
  try { return sendSuccess(res, await creatorMemoryService.recordSyncRequest(creatorId(req)), 'Creator DNA sync request recorded; live 6-agent synchronization is reserved for the live hackathon sprint'); }
  catch { return sendError(res, 'Unable to record Creator DNA sync request', 500); }
}

export async function getCreatorDnaMetadata(req: Request, res: Response) {
  try { return sendSuccess(res, await creatorMemoryService.getMetadata(creatorId(req)), 'Creator DNA metadata retrieved'); }
  catch { return sendError(res, 'Unable to load Creator DNA metadata', 500); }
}
