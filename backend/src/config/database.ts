import mongoose from 'mongoose';
import { config } from './environment';
import { logger } from '../utils/logger';

export async function connectDatabase(): Promise<boolean> {
  try {
    if (!config.mongoUri || config.mongoUri.includes('<')) {
      logger.warn('[Database] Mode: in-memory scaffold. Data is temporary and will be lost on restart.');
      return false;
    }

    mongoose.set('strictQuery', true);
    await mongoose.connect(config.mongoUri, {
      serverSelectionTimeoutMS: 3000
    });

    logger.info('[Database] Mode: MongoDB connected; configured database persistence is active.');
    return true;
  } catch (error: any) {
    logger.warn(`[Database] MongoDB unavailable (${error.message}). Mode: in-memory scaffold; data is temporary and will be lost on restart.`);
    return false;
  }
}

export function isDbConnected(): boolean {
  return mongoose.connection.readyState === 1;
}

export function getPersistenceMode() {
  const connected = isDbConnected();
  return { connected, mode: connected ? 'mongodb' as const : 'in-memory' as const, persistenceAcrossRestarts: connected };
}

