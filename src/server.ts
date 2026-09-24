import express from 'express';
import { pinoHttp } from 'pino-http';
import logger from './lib/logger.ts';
import errorHandler from './middlewares/errorhandler.ts';

const app = express();

app.use(pinoHttp({ logger }));

app.use(express.json());

app.use('/customers', (_request, response) => {
	response.status(200).json({
		message: 'Olá, mundo!'
	});
});

app.use((_request, response) => {
	response.status(404).json({
		message: 'Página não encontrada.'
	});
});

app.use(errorHandler);

const PORT = Number(process.env.PORT);

app.listen(PORT, () => {
	console.log(`Servidor rodando na porta: http://localhost:${PORT}`);
});
