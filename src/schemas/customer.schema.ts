import { z } from 'zod';
import { phoneSchema } from './shared.schema.ts';

export const createCustomerSchema = z.object({
	name: z
		.string('Entrada inválida: esperava-se um texto.')
		.trim()
		.min(2, 'Muito curto: esperava-se um nome com ao menos 2 caracteres.')
		.max(120, 'Muito longo: esperava-se um nome com menos de 120 caracteres.'),
	phone: phoneSchema
});

export const updateCustomerSchema = createCustomerSchema.partial();

export type CreateCustomer = z.infer<typeof createCustomerSchema>;
export type UpdateCustomer = z.infer<typeof updateCustomerSchema>;
