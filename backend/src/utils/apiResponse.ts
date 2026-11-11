import { Response } from 'express';

export interface ApiResponsePayload<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
  timestamp: string;
}

export function sendSuccess<T = any>(
  res: Response,
  data: T,
  message: string = 'Operation successful',
  statusCode: number = 200
): Response {
  const payload: ApiResponsePayload<T> = {
    success: true,
    message,
    data,
    timestamp: new Date().toISOString()
  };
  return res.status(statusCode).json(payload);
}

export function sendError(
  res: Response,
  message: string = 'Internal server error',
  statusCode: number = 500,
  errorDetail?: string
): Response {
  const payload: ApiResponsePayload<null> = {
    success: false,
    message,
    error: errorDetail,
    timestamp: new Date().toISOString()
  };
  return res.status(statusCode).json(payload);
}
