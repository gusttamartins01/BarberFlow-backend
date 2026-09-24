import { z } from 'zod';
import {
	dateSchema,
	idSchema,
	moneySchema,
	optionalTextSchema,
	timeSchema
} from './shared.schema.ts';

export const appointmentStatusSchema = z.enum([
	'pending',
	'confirmed',
	'cancelled',
	'completed'
]);

export const createAppointmentSchema = z
	.object({
		customerId: idSchema,
		barberId: idSchema,
		serviceId: idSchema,
		date: dateSchema,
		startTime: timeSchema,
		endTime: timeSchema,
		status: appointmentStatusSchema.default('pending'),
		totalPrice: moneySchema,
		notes: optionalTextSchema
	})
	.refine((appointment) => appointment.startTime < appointment.endTime, {
		message: 'O horario final deve ser posterior ao horario inicial',
		path: ['endTime']
	});

export const updateAppointmentSchema = createAppointmentSchema.partial();

export type CreateAppointmentInput = z.infer<typeof createAppointmentSchema>;
export type UpdateAppointmentInput = z.infer<typeof updateAppointmentSchema>;
