import { z } from 'zod';
import { phoneSchema } from './shared.ts';

export const createCustomerSchema = z.object({
	name: z.string().trim().min(2).max(120),
	phone: phoneSchema,
	email: z.email().optional()
});

export const updateCustomerSchema = createCustomerSchema.partial();

export type CreateCustomerInput = z.infer<typeof createCustomerSchema>;
export type UpdateCustomerInput = z.infer<typeof updateCustomerSchema>;
