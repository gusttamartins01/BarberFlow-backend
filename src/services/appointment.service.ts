import { NotFoundError, ValidationError } from '../errors/index.ts';
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

async function findServicePrice(serviceId: number) {
	const service = await prisma.service.findUnique({
		where: { id: serviceId },
		select: { price: true }
	});

	if (!service)
		throw new NotFoundError(`Serviço com ID ${serviceId} não encontrado.`);

	return service.price;
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
	const totalPrice = await findServicePrice(data.serviceId);

	return await prisma.appointment.create({
		data: {
			...prepareCreateData(data),
			totalPrice
		}
	});
}

export async function modifyAppointment(
	id: number,
	data: UpdateAppointment
): Promise<Appointment> {
	const appointment = await findAppointmentById(id);
	const startTime = data.startTime ?? appointment.startTime;
	const endTime = data.endTime ?? appointment.endTime;

	if (startTime >= endTime) {
		throw new ValidationError('Dados inválidos', [
			{
				field: 'endTime',
				message: 'O horário final deve ser posterior ao horário inicial.'
			}
		]);
	}

	const totalPrice =
		data.serviceId === undefined
			? appointment.totalPrice
			: await findServicePrice(data.serviceId);

	return await prisma.appointment.update({
		where: { id },
		data: {
			...prepareUpdateData(data),
			totalPrice
		}
	});
}

export async function removeAppointment(id: number): Promise<void> {
	await findAppointmentById(id);

	await prisma.appointment.delete({
		where: { id }
	});
}
