import type { NextFunction, Request, Response } from 'express';
import { type ZodType, z } from 'zod';
import { ValidationError } from '../errors/index.ts';

const routeIdSchema = z
	.string()
	.regex(/^[1-9]\d*$/, 'Informe um ID inteiro positivo válido.')
	.refine((value) => Number(value) <= 2147483647, {
		message: 'O ID excede o limite permitido.'
	});

export function validateId(
	_request: Request,
	_response: Response,
	next: NextFunction,
	value: string
): void {
	const result = routeIdSchema.safeParse(value);

	if (!result.success) {
		next(
			new ValidationError('ID inválido', [
				{ field: 'id', message: result.error.issues[0].message }
			])
		);
		return;
	}

	next();
}

export default function validate(schema: ZodType) {
	return (request: Request, _response: Response, next: NextFunction) => {
		const result = schema.safeParse(request.body);

		if (!result.success) {
			const fields = result.error.issues.map((issue) => ({
				field: issue.path.join(''),
				message: issue.message
			}));

			return next(new ValidationError('Dados inválidos', fields));
		}

		request.body = result.data;
		next();
	};
}
