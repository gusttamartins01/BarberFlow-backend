import { z } from 'zod';
import { moneySchema, positiveIntegerSchema } from './shared.schema.ts';

export const createServiceSchema = z.object({
	name: z.string().trim().min(2).max(120),
	description: z.string().trim().max(500).optional(),
	price: moneySchema,
	duration: positiveIntegerSchema
});

export const updateServiceSchema = createServiceSchema.partial();

export type CreateService = z.infer<typeof createServiceSchema>;
export type UpdateService = z.infer<typeof updateServiceSchema>;
