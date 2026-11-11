import mongoose from 'mongoose';
import { config } from './environment';
import { logger } from '../utils/logger';

export async function connectDatabase(): Promise<boolean> {
  try {
    if (!config.mongoUri || config.mongoUri.includes('<username>')) {
      logger.warn('[Database] MONGODB_URI placeholder detected. Running in decoupled pre-event persistence mode.');
      return false;
    }

    mongoose.set('strictQuery', true);
    await mongoose.connect(config.mongoUri, {
      serverSelectionTimeoutMS: 3000
    });

    logger.info('[Database] MongoDB Atlas connected successfully.');
    return true;
  } catch (error: any) {
    logger.warn(`[Database] MongoDB connection bypassed (${error.message}). Running with in-memory store for pre-event evaluation.`);
    return false;
  }
}

export function isDbConnected(): boolean {
  return mongoose.connection.readyState === 1;
}

