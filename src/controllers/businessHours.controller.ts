import type { Request, Response } from 'express';
import type {
	CreateBusinessHours,
	UpdateBusinessHours
} from '../schemas/businessHours.schema.ts';
import * as BusinessHoursService from '../services/businessHours.service.ts';

export async function getAllBusinessHours(
	_request: Request,
	response: Response
): Promise<void> {
	const businessHours = await BusinessHoursService.findAllBusinessHours();

	response.status(200).json(businessHours);
}

export async function getBusinessHoursById(
	request: Request,
	response: Response
): Promise<void> {
	const id = +request.params.id;

	const businessHour = await BusinessHoursService.findBusinessHoursById(id);

	response.status(200).json(businessHour);
}

export async function createBusinessHours(
	request: Request,
	response: Response
): Promise<void> {
	const body = request.body as CreateBusinessHours;

	const businessHour = await BusinessHoursService.insertBusinessHours(body);

	response.status(201).json(businessHour);
}

export async function updateBusinessHours(
	request: Request,
	response: Response
): Promise<void> {
	const id = +request.params.id;
	const body = request.body as UpdateBusinessHours;

	const businessHour = await BusinessHoursService.modifyBusinessHours(id, body);

	response.status(200).json(businessHour);
}

export async function deleteBusinessHours(
	request: Request,
	response: Response
): Promise<void> {
	const id = +request.params.id;

	await BusinessHoursService.removeBusinessHours(id);

	response.status(204).send();
}
