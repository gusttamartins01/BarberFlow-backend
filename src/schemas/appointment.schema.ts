import { z } from 'zod';
import {
	dateSchema,
	idSchema,
	optionalTextSchema,
	timeSchema
} from './shared.schema.ts';

export const appointmentStatusSchema = z.enum(
	['pending', 'confirmed', 'cancelled', 'completed'],
	'Entrada inválida: status deve ser pending, confirmed, cancelled ou completed.'
);

const appointmentFieldsSchema = z.object({
	customerId: idSchema,
	barberId: idSchema,
	serviceId: idSchema,
	date: dateSchema,
	startTime: timeSchema,
	endTime: timeSchema,
	status: appointmentStatusSchema.default('pending'),
	notes: optionalTextSchema
});

export const createAppointmentSchema = appointmentFieldsSchema.refine(
	(appointment) => appointment.startTime < appointment.endTime,
	{
		message: 'O horario final deve ser posterior ao horario inicial',
		path: ['endTime']
	}
);

export const updateAppointmentSchema = appointmentFieldsSchema
	.partial()
	.refine(
		(appointment) =>
			!appointment.startTime ||
			!appointment.endTime ||
			appointment.startTime < appointment.endTime,
		{
			message: 'O horario final deve ser posterior ao horario inicial',
			path: ['endTime']
		}
	);

export type CreateAppointment = z.infer<typeof createAppointmentSchema>;
export type UpdateAppointment = z.infer<typeof updateAppointmentSchema>;
