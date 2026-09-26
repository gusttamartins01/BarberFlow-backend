import type { Request, Response } from 'express';

export default function notFoundHandler(
	_request: Request,
	response: Response
): void {
	response.status(404).json({
		message: 'Página não encontrada.'
	});
}
