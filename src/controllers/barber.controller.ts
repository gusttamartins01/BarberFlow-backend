import type { Request, Response } from 'express';
import type { CreateBarber, UpdateBarber } from '../schemas/barber.schema.ts';
import * as BarberService from '../services/barber.service.ts';

export function getAllBarbers(_request: Request, response: Response): void {
	const barbers = BarberService.findAllBarbers();

	response.status(200).json(barbers);
}

export function getBarberById(request: Request, response: Response): void {
	const id = +request.params.id;

	const barber = BarberService.findBarberById(id);

	response.status(200).json(barber);
}

export function createBarber(request: Request, response: Response): void {
	const body = request.body as CreateBarber;

	const barber = BarberService.insertBarber(body);

	response.status(201).json(barber);
}

export function updateBarber(request: Request, response: Response): void {
	const id = +request.params.id;
	const body = request.body as UpdateBarber;

	const barber = BarberService.modifyBarber(id, body);

	response.status(200).json(barber);
}

export function deleteBarber(request: Request, response: Response): void {
	const id = +request.params.id;

	BarberService.removeBarber(id);

	response.status(204).send();
}
