import express from 'express';
import { pinoHttp } from 'pino-http';
import logger from './lib/logger.ts';
import errorHandler from './middlewares/errorhandler.ts';
import AppointmentRouter from './routes/appointment.route.ts';
import BarberRouter from './routes/barber.route.ts';
import BusinessHours from './routes/businessHours.route.ts';
import ComboRouter from './routes/combo.route.ts';
import CustomerRouter from './routes/customer.route.ts';
import ServiceRouter from './routes/service.route.ts';

const app = express();

app.use(pinoHttp({ logger }));

app.use(express.json());

app.use('/appointments', AppointmentRouter);
app.use('/barbers', BarberRouter);
app.use('/business-hours', BusinessHours);
app.use('/combos', ComboRouter);
app.use('/customers', CustomerRouter);
app.use('/services', ServiceRouter);

app.use((_request, response) => {
	response.status(404).json({
		message: 'Página não encontrada.'
	});
});

app.use(errorHandler);

const PORT = Number(process.env.PORT);

app.listen(PORT, () => {
	logger.info(`Servidor rodando na porta: http://localhost:${PORT}`);
});
