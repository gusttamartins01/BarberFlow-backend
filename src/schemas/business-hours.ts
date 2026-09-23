import { z } from 'zod';
import { timeSchema } from './shared.ts';

export const createBusinessHoursSchema = z
	.object({
		dayOfWeek: z.number().int().min(0).max(6),
		openTime: timeSchema,
		closeTime: timeSchema,
		isOpen: z.boolean()
	})
	.refine((hours) => !hours.isOpen || hours.openTime < hours.closeTime, {
		message: 'O horario final deve ser posterior ao horario inicial',
		path: ['closeTime']
	});

export const updateBusinessHoursSchema = createBusinessHoursSchema.partial();

export type CreateBusinessHoursInput = z.infer<
	typeof createBusinessHoursSchema
>;
export type UpdateBusinessHoursInput = z.infer<
	typeof updateBusinessHoursSchema
>;
