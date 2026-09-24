import { z } from 'zod';

export const createBarberSchema = z.object({
	name: z.string().trim().min(2).max(120)
});

export const updateBarberSchema = createBarberSchema.partial();

export type CreateBarber = z.infer<typeof createBarberSchema>;
export type UpdateBarber = z.infer<typeof updateBarberSchema>;
