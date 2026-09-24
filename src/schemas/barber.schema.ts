import { z } from 'zod';

export const createBarberSchema = z.object({
	name: z
		.string('Entrada inválida: esperava-se um texto.')
		.trim()
		.min(2, 'Muito curto: esperava-se um nome com ao menos 2 caracteres.')
		.max(120, 'Muito longo: esperava-se um nome com menos de 120 caracteres.')
});

export const updateBarberSchema = createBarberSchema.partial();

export type CreateBarber = z.infer<typeof createBarberSchema>;
export type UpdateBarber = z.infer<typeof updateBarberSchema>;
