import { z } from 'zod';
import { moneySchema, positiveIntegerSchema } from './shared.schema.ts';

export const createComboSchema = z.object({
	name: z
		.string('Entrada inválida: esperava-se um texto.')
		.trim()
		.min(2, 'Muito curto: esperava-se um nome com ao menos 2 caracteres.')
		.max(120, 'Muito longo: esperava-se um nome com menos de 120 caracteres.'),
	description: z
		.string('Entrada inválida: esperava-se um texto.')
		.trim()
		.min(1, 'Campo obrigatório: informe uma descrição.')
		.max(
			500,
			'Muito longo: esperava-se uma descrição com menos de 500 caracteres.'
		),
	price: moneySchema,
	serviceIds: z
		.array(
			positiveIntegerSchema,
			'Entrada inválida: esperava-se uma lista de serviços.'
		)
		.min(1, 'Campo obrigatório: informe ao menos um serviço.')
		.max(50, 'Limite atingido: informe no máximo 50 serviços.')
});

export const updateComboSchema = createComboSchema.partial();

export type CreateCombo = z.infer<typeof createComboSchema>;
export type UpdateCombo = z.infer<typeof updateComboSchema>;
