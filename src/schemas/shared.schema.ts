import { z } from 'zod';

export const idSchema = z
	.number('Entrada inválida: esperava-se um número.')
	.int('Entrada inválida: esperava-se um número inteiro.')
	.positive('Valor inválido: esperava-se um ID positivo.');

export const positiveIntegerSchema = z
	.number('Entrada inválida: esperava-se um número.')
	.int('Entrada inválida: esperava-se um número inteiro.')
	.positive('Valor inválido: esperava-se um número positivo.');

export const moneySchema = z
	.number('Entrada inválida: esperava-se um número.')
	.finite('Valor inválido: esperava-se um número finito.')
	.nonnegative('Valor inválido: não pode ser negativo.');

export const dateSchema = z
	.string('Entrada inválida: esperava-se uma data em texto.')
	.regex(/^\d{4}-\d{2}-\d{2}$/, 'Use a data no formato AAAA-MM-DD')
	.refine(
		(value) => {
			const [year, month, day] = value.split('-').map(Number);
			const isLeapYear =
				year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
			const daysInMonth = [
				31,
				isLeapYear ? 29 : 28,
				31,
				30,
				31,
				30,
				31,
				31,
				30,
				31,
				30,
				31
			][month - 1];

			return year > 0 && day > 0 && day <= (daysInMonth ?? 0);
		},
		{ message: 'Informe uma data válida.' }
	);

export const timeSchema = z
	.string('Entrada inválida: esperava-se um horário em texto.')
	.regex(/^([01]\d|2[0-3]):[0-5]\d$/, 'Use o horario no formato HH:mm');

export const optionalTextSchema = z
	.string('Entrada inválida: esperava-se um texto.')
	.trim()
	.max(500, 'Muito longo: esperava-se um texto com menos de 500 caracteres.')
	.optional();

export const phoneSchema = z
	.string('Entrada inválida: esperava-se um texto.')
	.trim()
	.min(8, 'Muito curto: esperava-se um telefone com ao menos 8 caracteres.')
	.max(20, 'Muito longo: esperava-se um telefone com menos de 20 caracteres.');
