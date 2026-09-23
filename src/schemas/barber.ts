import { z } from 'zod';

export const createBarberSchema = z.object({
	name: z.string().trim().min(2).max(120)
});

export const updateBarberSchema = createBarberSchema.partial();

export type CreateBarberInput = z.infer<typeof createBarberSchema>;
export type UpdateBarberInput = z.infer<typeof updateBarberSchema>;
