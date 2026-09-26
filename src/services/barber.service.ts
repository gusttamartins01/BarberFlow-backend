import { NotFoundError } from '../errors/index.ts';
import prisma from '../lib/prisma.ts';
import type { CreateBarber, UpdateBarber } from '../schemas/barber.schema.ts';
import type { Barber } from '../types.ts';

export async function findAllBarbers(): Promise<Barber[]> {
	return await prisma.barber.findMany();
}

export async function findBarberById(id: number): Promise<Barber> {
	const barber = await prisma.barber.findUnique({
		where: { id }
	});

	if (!barber) throw new NotFoundError(`Barbeiro com ID ${id} não encontrado.`);

	return barber;
}

export async function insertBarber(data: CreateBarber): Promise<Barber> {
	return await prisma.barber.create({
		data
	});
}

export async function modifyBarber(
	id: number,
	data: UpdateBarber
): Promise<Barber> {
	await findBarberById(id);

	return await prisma.barber.update({
		where: { id },
		data
	});
}

export async function removeBarber(id: number): Promise<void> {
	await findBarberById(id);

	await prisma.barber.delete({
		where: { id }
	});
}
