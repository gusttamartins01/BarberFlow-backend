import { z } from 'zod';
import { moneySchema, positiveIntegerSchema } from './shared.schema.ts';

export const createComboSchema = z.object({
	name: z.string().trim().min(2).max(120),
	description: z.string().trim().min(1).max(500),
	price: moneySchema,
	serviceIds: z.array(positiveIntegerSchema).min(1).max(50)
});

export const updateComboSchema = createComboSchema.partial();

export type CreateCombo = z.infer<typeof createComboSchema>;
export type UpdateCombo = z.infer<typeof updateComboSchema>;
