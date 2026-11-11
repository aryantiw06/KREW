import { Request, Response } from 'express';
import { sendSuccess } from '../utils/apiResponse';
import { isDbConnected } from '../config/database';
import { config } from '../config/environment';

export function getHealth(req: Request, res: Response) {
  const healthData = {
    service: 'KREW Backend Production API',
    status: 'ONLINE',
    uptimeSeconds: Math.floor(process.uptime()),
    environment: config.nodeEnv,
    version: '0.1.0-alpha',
    database: {
      connected: isDbConnected(),
      mode: isDbConnected() ? 'MongoDB Atlas Live' : 'In-Memory Pre-Event Scaffolding'
    },
    hackathonGovernance: {
      event: 'GeNarrative Clash 2026',
      track: 'Autonomous Creator Agents — Content Strategy & Distribution',
      rule: '50/50 Pre-Event Boundary Enforced',
      preEventPhase: {
        frontend: 'Complete UI/UX & Component Architecture (100% permitted scope)',
        backend: 'Express, Routing, Models, Schemas & Agent Service Contracts (100% permitted scope)'
      },
      liveSprintReserved: [
        'Autonomous agent execution & tool calling',
        'LLM inference & prompt tuning',
        'Multi-agent peer-to-peer communication bus',
        'Actual multimodal video intelligence',
        'Actual AI thumbnail generation',
        'Actual social distribution API triggers'
      ]
    }
  };

  return sendSuccess(res, healthData, 'KREW Studio Backend is operational and healthy.');
}

