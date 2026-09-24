import { z } from 'zod';
import { timeSchema } from './shared.schema.ts';

const businessHoursFieldsSchema = z.object({
	dayOfWeek: z
		.number('Entrada inválida: esperava-se um número.')
		.int('Entrada inválida: esperava-se um número inteiro.')
		.min(0, 'Valor inválido: o dia deve estar entre 0 e 6.')
		.max(6, 'Valor inválido: o dia deve estar entre 0 e 6.'),
	openTime: timeSchema,
	closeTime: timeSchema,
	isOpen: z.boolean(
		'Entrada inválida: esperava-se um valor de verdadeiro ou falso.'
	)
});

export const createBusinessHoursSchema = businessHoursFieldsSchema.refine(
	(hours) => !hours.isOpen || hours.openTime < hours.closeTime,
	{
		message: 'O horario final deve ser posterior ao horario inicial',
		path: ['closeTime']
	}
);

export const updateBusinessHoursSchema = businessHoursFieldsSchema
	.partial()
	.refine(
		(hours) =>
			hours.isOpen !== true ||
			!hours.openTime ||
			!hours.closeTime ||
			hours.openTime < hours.closeTime,
		{
			message: 'O horario final deve ser posterior ao horario inicial',
			path: ['closeTime']
		}
	);

export type CreateBusinessHours = z.infer<typeof createBusinessHoursSchema>;
export type UpdateBusinessHours = z.infer<typeof updateBusinessHoursSchema>;
