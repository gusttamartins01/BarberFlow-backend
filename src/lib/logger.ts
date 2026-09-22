import pino from 'pino';

const isDevelopement = process.env.NODE_ENV !== 'production';

const logger = pino({
	level: process.env.LOG_LEVEL ?? 'info',
	transport: isDevelopement ? { target: 'pino-pretty' } : undefined
});

export default logger;
