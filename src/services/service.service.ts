import { NotFoundError } from '../errors/index.ts';
import prisma from '../lib/prisma.ts';
import type {
	CreateService,
	UpdateService
} from '../schemas/service.schema.ts';
import type { Service } from '../types.ts';

export async function findAllServices(): Promise<Service[]> {
	const Services = await prisma.service.findMany();

	return Services;
}

export async function findServiceById(id: number): Promise<Service> {
	const Service = await prisma.service.findUnique({
		where: { id }
	});

	if (!Service) throw new NotFoundError(`Serviço com ID ${id} não encontrado.`);

	return Service;
}

export async function insertService(data: CreateService): Promise<Service> {
	return await prisma.service.create({
		data
	});
}

export async function modifyService(
	id: number,
	data: UpdateService
): Promise<Service> {
	await findServiceById(id);

	return await prisma.service.update({
		where: { id },
		data
	});
}

export async function removeService(id: number): Promise<void> {
	await findServiceById(id);

	await prisma.service.delete({
		where: { id }
	});
}
