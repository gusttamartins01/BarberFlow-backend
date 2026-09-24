import type { Request, Response } from 'express';
import type {
	CreateAppointment,
	UpdateAppointment
} from '../schemas/appointment.schema.ts';
import * as AppointmentService from '../services/appointment.service.ts';

export function getAllAppointments(
	_request: Request,
	response: Response
): void {
	const appointments = AppointmentService.findAllAppointments();

	response.status(200).json(appointments);
}

export function getAppointmentById(request: Request, response: Response): void {
	const id = Number(request.params.id);

	const appointment = AppointmentService.findAppointmentById(id);

	response.status(200).json(appointment);
}

export function createAppointment(request: Request, response: Response): void {
	const body = request.body as CreateAppointment;

	const appointment = AppointmentService.insertAppointment(body);

	response.status(201).json(appointment);
}

export function updateAppointment(request: Request, response: Response): void {
	const id = Number(request.params.id);
	const body = request.body as UpdateAppointment;

	const appointment = AppointmentService.modifyAppointment(id, body);

	response.status(200).json(appointment);
}

export function deleteAppointment(request: Request, response: Response): void {
	const id = Number(request.params.id);

	AppointmentService.removeAppointment(id);

	response.status(204).send();
}
