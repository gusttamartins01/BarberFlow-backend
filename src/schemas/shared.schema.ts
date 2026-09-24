import { z } from 'zod';

export const idSchema = z.number().int().positive();

export const positiveIntegerSchema = z.number().int().positive();

export const moneySchema = z.number().finite().nonnegative();

export const dateSchema = z
	.string()
	.regex(/^\d{4}-\d{2}-\d{2}$/, 'Use a data no formato AAAA-MM-DD');

export const timeSchema = z
	.string()
	.regex(/^([01]\d|2[0-3]):[0-5]\d$/, 'Use o horario no formato HH:mm');

export const optionalTextSchema = z.string().trim().max(500).optional();

export const phoneSchema = z.string().trim().min(8).max(20);
