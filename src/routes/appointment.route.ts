import { Router } from 'express';
import * as AppointmentController from '../controllers/appointment.controller.ts';
import validate from '../middlewares/validate.ts';
import {
	createAppointmentSchema,
	updateAppointmentSchema
} from '../schemas/appointment.schema.ts';

const router = Router();

router.get('/', AppointmentController.getAllAppointments);
router.get('/:id', AppointmentController.getAppointmentById);
router.post(
	'/',
	validate(createAppointmentSchema),
	AppointmentController.createAppointment
);
router.put(
	'/:id',
	validate(updateAppointmentSchema),
	AppointmentController.updateAppointment
);
router.delete('/:id', AppointmentController.deleteAppointment);

export default router;
