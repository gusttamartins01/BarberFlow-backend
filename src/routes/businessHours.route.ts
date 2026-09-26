import { Router } from 'express';
import * as BusinessHoursController from '../controllers/businessHours.controller.ts';
import validate, { validateId } from '../middlewares/validate.ts';
import {
	createBusinessHoursSchema,
	updateBusinessHoursSchema
} from '../schemas/businessHours.schema.ts';

const router = Router();
router.param('id', validateId);

router.get('/', BusinessHoursController.getAllBusinessHours);
router.get('/:id', BusinessHoursController.getBusinessHoursById);
router.post(
	'/',
	validate(createBusinessHoursSchema),
	BusinessHoursController.createBusinessHours
);
router.put(
	'/:id',
	validate(updateBusinessHoursSchema),
	BusinessHoursController.updateBusinessHours
);
router.delete('/:id', BusinessHoursController.deleteBusinessHours);

export default router;
