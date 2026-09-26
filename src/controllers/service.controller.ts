import type { Request, Response } from 'express';
import type {
	CreateService,
	UpdateService
} from '../schemas/service.schema.ts';
import * as ServiceService from '../services/service.service.ts';

export function getAllServices(_request: Request, response: Response): void {
	const services = ServiceService.findAllServices();

	response.status(200).json(services);
}

export function getServiceById(request: Request, response: Response): void {
	const id = +request.params.id;

	const service = ServiceService.findServiceById(id);

	response.status(200).json(service);
}

export function createService(request: Request, response: Response): void {
	const body = request.body as CreateService;

	const service = ServiceService.insertService(body);

	response.status(201).json(service);
}

export function updateService(request: Request, response: Response): void {
	const id = +request.params.id;
	const body = request.body as UpdateService;

	const service = ServiceService.modifyService(id, body);

	response.status(200).json(service);
}

export function deleteService(request: Request, response: Response): void {
	const id = +request.params.id;

	ServiceService.removeService(id);

	response.status(204).send();
}
