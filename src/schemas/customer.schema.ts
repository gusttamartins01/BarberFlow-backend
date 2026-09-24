import { z } from 'zod';
import { phoneSchema } from './shared.schema.ts';

export const createCustomerSchema = z.object({
	name: z.string().trim().min(2).max(120),
	phone: phoneSchema
});

export const updateCustomerSchema = createCustomerSchema.partial();

export type CreateCustomer = z.infer<typeof createCustomerSchema>;
export type UpdateCustomer = z.infer<typeof updateCustomerSchema>;
