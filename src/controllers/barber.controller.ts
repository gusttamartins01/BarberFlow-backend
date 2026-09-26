import type { Request, Response } from 'express';
import type { CreateBarber, UpdateBarber } from '../schemas/barber.schema.ts';
import * as BarberService from '../services/barber.service.ts';

export async function getAllBarbers(
	_request: Request,
	response: Response
): Promise<void> {
	const barbers = await BarberService.findAllBarbers();

	response.status(200).json(barbers);
}

export async function getBarberById(
	request: Request,
	response: Response
): Promise<void> {
	const id = +request.params.id;

	const barber = await BarberService.findBarberById(id);

	response.status(200).json(barber);
}

export async function createBarber(
	request: Request,
	response: Response
): Promise<void> {
	const body = request.body as CreateBarber;

	const barber = await BarberService.insertBarber(body);

	response.status(201).json(barber);
}

export async function updateBarber(
	request: Request,
	response: Response
): Promise<void> {
	const id = +request.params.id;
	const body = request.body as UpdateBarber;

	const barber = await BarberService.modifyBarber(id, body);

	response.status(200).json(barber);
}

export async function deleteBarber(
	request: Request,
	response: Response
): Promise<void> {
	const id = +request.params.id;

	await BarberService.removeBarber(id);

	response.status(204).send();
}
