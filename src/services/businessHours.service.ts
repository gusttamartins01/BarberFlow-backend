import { NotFoundError } from '../errors/index.ts';
import prisma from '../lib/prisma.ts';
import type {
	CreateBusinessHours,
	UpdateBusinessHours
} from '../schemas/businessHours.schema.ts';
import type { BusinessHours } from '../types.ts';

export async function findAllBusinessHours(): Promise<BusinessHours[]> {
	return await prisma.businessHours.findMany();
}

export async function findBusinessHoursById(
	id: number
): Promise<BusinessHours> {
	const barber = await prisma.businessHours.findUnique({
		where: { id }
	});

	if (!barber)
		throw new NotFoundError(`Horário comercial com ID ${id} não encontrado.`);

	return barber;
}

export async function insertBusinessHours(
	data: CreateBusinessHours
): Promise<BusinessHours> {
	return await prisma.businessHours.create({
		data
	});
}

export async function modifyBusinessHours(
	id: number,
	data: UpdateBusinessHours
): Promise<BusinessHours> {
	await findBusinessHoursById(id);

	return await prisma.businessHours.update({
		where: { id },
		data
	});
}

export async function removeBusinessHours(id: number): Promise<void> {
	await findBusinessHoursById(id);

	await prisma.businessHours.delete({
		where: { id }
	});
}
