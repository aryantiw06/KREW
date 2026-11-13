import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export const config = {
  port: Number.parseInt(process.env.PORT || '5001', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  apiPrefix: process.env.API_PREFIX || '/api/v1',
  corsOrigins: (process.env.CORS_ORIGIN || 'http://localhost:5173').split(',').map((origin) => origin.trim()).filter(Boolean),
  mongoUri: process.env.MONGODB_URI || '',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  // Extension endpoints reserved for live sprint
  geminiApiKey: process.env.GEMINI_API_KEY || '',
  openAiApiKey: process.env.OPENAI_API_KEY || '',
  anthropicApiKey: process.env.ANTHROPIC_API_KEY || '',
  databaseMode: process.env.MONGODB_URI && !process.env.MONGODB_URI.includes('<') ? 'mongodb' : 'in-memory'
};

