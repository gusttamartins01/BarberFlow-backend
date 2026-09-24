import express from 'express';
import { pinoHttp } from 'pino-http';
import logger from './lib/logger.ts';
import errorHandler from './middlewares/errorhandler.ts';
import AppointmentRouter from './routes/appointment.route.ts';
import CustomerRouter from './routes/customer.route.ts';

const app = express();

app.use(pinoHttp({ logger }));

app.use(express.json());

app.use('/customers', CustomerRouter);
app.use('/appointments', AppointmentRouter);

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
