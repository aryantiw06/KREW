import { Request, Response } from 'express';
import { creatorMemoryService } from '../services/creatorMemory/creatorMemoryService';
import { sendSuccess } from '../utils/apiResponse';

export function getCreatorDna(req: Request, res: Response) {
  const profile = creatorMemoryService.getProfile();
  return sendSuccess(res, profile, 'Creator DNA profile retrieved');
}

export function updateCreatorDna(req: Request, res: Response) {
  const updated = creatorMemoryService.updateProfile(req.body);
  return sendSuccess(res, updated, 'Creator DNA profile updated');
}

export function syncCreatorDna(req: Request, res: Response) {
  const syncResult = creatorMemoryService.syncAgents();
  return sendSuccess(res, syncResult, 'Creator DNA synced across 6 agent scaffolds');
}
