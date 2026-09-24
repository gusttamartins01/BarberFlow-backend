import { z } from 'zod';
import { moneySchema, positiveIntegerSchema } from './shared.schema.ts';

export const createServiceSchema = z.object({
	name: z
		.string('Entrada inválida: esperava-se um texto.')
		.trim()
		.min(2, 'Muito curto: esperava-se um nome com ao menos 2 caracteres.')
		.max(120, 'Muito longo: esperava-se um nome com menos de 120 caracteres.'),
	description: z
		.string('Entrada inválida: esperava-se um texto.')
		.trim()
		.max(
			500,
			'Muito longo: esperava-se uma descrição com menos de 500 caracteres.'
		)
		.optional(),
	price: moneySchema,
	duration: positiveIntegerSchema
});

export const updateServiceSchema = createServiceSchema.partial();

export type CreateService = z.infer<typeof createServiceSchema>;
export type UpdateService = z.infer<typeof updateServiceSchema>;
