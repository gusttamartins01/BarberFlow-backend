import express from 'express';
import { pinoHttp } from 'pino-http';
import logger from './lib/logger.ts';
import errorHandler from './middlewares/errorhandler.ts';

const app = express();

app.use(pinoHttp({ logger }));

app.use(express.json());

app.use('/users', (_request, response) => {
	response.status(200).json({
		message: 'Olá, mundo! Jotape viadao'
	});
});

app.use((_request, response) => {
	response.status(404).json({
		message: 'Page not found.'
	});
});

app.use(errorHandler);

const PORT = Number(process.env.PORT);

app.listen(PORT, () => {
	console.log(`Server running on port: http://localhost:${PORT}`);
});
