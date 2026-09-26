import type { Request, Response } from 'express';
import type {
	CreateAppointment,
	UpdateAppointment
} from '../schemas/appointment.schema.ts';
import * as AppointmentService from '../services/appointment.service.ts';

export async function getAllAppointments(
	_request: Request,
	response: Response
): Promise<void> {
	const appointments = await AppointmentService.findAllAppointments();

	response.status(200).json(appointments);
}

export async function getAppointmentById(
	request: Request,
	response: Response
): Promise<void> {
	const id = +request.params.id;

	const appointment = await AppointmentService.findAppointmentById(id);

	response.status(200).json(appointment);
}

export async function createAppointment(
	request: Request,
	response: Response
): Promise<void> {
	const body = request.body as CreateAppointment;

	const appointment = await AppointmentService.insertAppointment(body);

	response.status(201).json(appointment);
}

export async function updateAppointment(
	request: Request,
	response: Response
): Promise<void> {
	const id = +request.params.id;
	const body = request.body as UpdateAppointment;

	const appointment = await AppointmentService.modifyAppointment(id, body);

	response.status(200).json(appointment);
}

export async function deleteAppointment(
	request: Request,
	response: Response
): Promise<void> {
	const id = +request.params.id;

	await AppointmentService.removeAppointment(id);

	response.status(204).send();
}
