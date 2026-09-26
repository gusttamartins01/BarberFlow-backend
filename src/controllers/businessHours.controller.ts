import type { Request, Response } from 'express';
import type {
	CreateBusinessHours,
	UpdateBusinessHours
} from '../schemas/businessHours.schema.ts';
import * as BusinessHoursService from '../services/businessHours.service.ts';

export function getAllBusinessHours(
	_request: Request,
	response: Response
): void {
	const businessHours = BusinessHoursService.findAllBusinessHours();

	response.status(200).json(businessHours);
}

export function getBusinessHoursById(
	request: Request,
	response: Response
): void {
	const id = +request.params.id;

	const businessHour = BusinessHoursService.findBusinessHoursById(id);

	response.status(200).json(businessHour);
}

export function createBusinessHours(
	request: Request,
	response: Response
): void {
	const body = request.body as CreateBusinessHours;

	const businessHour = BusinessHoursService.insertBusinessHours(body);

	response.status(201).json(businessHour);
}

export function updateBusinessHours(
	request: Request,
	response: Response
): void {
	const id = +request.params.id;
	const body = request.body as UpdateBusinessHours;

	const businessHour = BusinessHoursService.modifyBusinessHours(id, body);

	response.status(200).json(businessHour);
}

export function deleteBusinessHours(
	request: Request,
	response: Response
): void {
	const id = +request.params.id;

	BusinessHoursService.removeBusinessHours(id);

	response.status(204).send();
}
