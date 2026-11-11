import { createApp } from './app';
import { config } from './config/environment';
import { connectDatabase } from './config/database';
import { logger } from './utils/logger';
import http from 'http';

async function bootstrap() {
  const app = createApp();

  // Attempt database connection (with graceful offline fallback)
  await connectDatabase();

  const startServer = (port: number) => {
    const server = http.createServer(app);

    server.on('error', (err: any) => {
      if (err.code === 'EADDRINUSE') {
        logger.warn(`[Server] Port ${port} is in use (often AirPlay Receiver on macOS). Falling back to port ${port + 1}...`);
        startServer(port + 1);
      } else {
        logger.error('[Server] Fatal server error:', err);
        process.exit(1);
      }
    });

    server.listen(port, () => {
      logger.info(`=======================================================`);
      logger.info(`🎬 KREW — Digital Production Studio API`);
      logger.info(`🚀 Server running on http://localhost:${port}`);
      logger.info(`📡 Health Endpoint: http://localhost:${port}${config.apiPrefix}/health`);
      logger.info(`✨ Environment: ${config.nodeEnv}`);
      logger.info(`⚡ 50/50 Hackathon Governance: Pre-event scaffold active`);
      logger.info(`=======================================================`);
    });

    const gracefulShutdown = (signal: string) => {
      logger.info(`[Server] Received ${signal}. Shutting down gracefully.`);
      server.close(() => {
        logger.info('[Server] HTTP server closed.');
        process.exit(0);
      });
    };

    process.on('SIGINT', () => gracefulShutdown('SIGINT'));
    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
  };

  startServer(config.port);
}

bootstrap().catch((err) => {
  logger.error('[Bootstrap] Fatal server startup error:', err);
  process.exit(1);
});
