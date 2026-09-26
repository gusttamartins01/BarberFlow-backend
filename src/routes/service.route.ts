import { Router } from 'express';
import * as ServiceController from '../controllers/service.controller.ts';
import validate, { validateId } from '../middlewares/validate.ts';
import {
	createServiceSchema,
	updateServiceSchema
} from '../schemas/service.schema.ts';

const router = Router();
router.param('id', validateId);

router.get('/', ServiceController.getAllServices);
router.get('/:id', ServiceController.getServiceById);
router.post(
	'/',
	validate(createServiceSchema),
	ServiceController.createService
);
router.put(
	'/:id',
	validate(updateServiceSchema),
	ServiceController.updateService
);
router.delete('/:id', ServiceController.deleteService);

export default router;
