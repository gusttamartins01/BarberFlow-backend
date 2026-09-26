import { NotFoundError } from '../errors/index.ts';
import prisma from '../lib/prisma.ts';
import type {
	CreateAppointment,
	UpdateAppointment
} from '../schemas/appointment.schema.ts';
import type { Appointment } from '../types.ts';

function prepareCreateData(data: CreateAppointment) {
	return {
		...data,
		date: new Date(`${data.date}T00:00:00.000Z`)
	};
}

function prepareUpdateData(data: UpdateAppointment) {
	return {
		...data,
		...(data.date ? { date: new Date(`${data.date}T00:00:00.000Z`) } : {})
	};
}

export async function findAllAppointments(): Promise<Appointment[]> {
	return await prisma.appointment.findMany();
}

export async function findAppointmentById(id: number): Promise<Appointment> {
	const appointment = await prisma.appointment.findUnique({
		where: { id }
	});

	if (!appointment)
		throw new NotFoundError(`Agendamento com ID ${id} não encontrado.`);

	return appointment;
}

export async function insertAppointment(
	data: CreateAppointment
): Promise<Appointment> {
	return await prisma.appointment.create({
		data: prepareCreateData(data)
	});
}

export async function modifyAppointment(
	id: number,
	data: UpdateAppointment
): Promise<Appointment> {
	await findAppointmentById(id);

	return await prisma.appointment.update({
		where: { id },
		data: prepareUpdateData(data)
	});
}

export async function removeAppointment(id: number): Promise<void> {
	await findAppointmentById(id);

	await prisma.appointment.delete({
		where: { id }
	});
}
