import type { Request, Response } from 'express';
import type {
	CreateService,
	UpdateService
} from '../schemas/service.schema.ts';
import * as ServiceService from '../services/service.service.ts';

export async function getAllServices(
	_request: Request,
	response: Response
): Promise<void> {
	const services = await ServiceService.findAllServices();

	response.status(200).json(services);
}

export async function getServiceById(
	request: Request,
	response: Response
): Promise<void> {
	const id = Number(request.params.id);

	const service = await ServiceService.findServiceById(id);

	response.status(200).json(service);
}

export async function createService(
	request: Request,
	response: Response
): Promise<void> {
	const body = request.body as CreateService;

	const service = await ServiceService.insertService(body);

	response.status(201).json(service);
}

export async function updateService(
	request: Request,
	response: Response
): Promise<void> {
	const id = Number(request.params.id);
	const body = request.body as UpdateService;

	const service = await ServiceService.modifyService(id, body);

	response.status(200).json(service);
}

export async function deleteService(
	request: Request,
	response: Response
): Promise<void> {
	const id = Number(request.params.id);

	await ServiceService.removeService(id);

	response.status(204).send();
}
