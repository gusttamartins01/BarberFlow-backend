import { Router } from 'express';
import * as BarberController from '../controllers/barber.controller.ts';
import validate, { validateId } from '../middlewares/validate.ts';
import {
	createBarberSchema,
	updateBarberSchema
} from '../schemas/barber.schema.ts';

const router = Router();
router.param('id', validateId);

router.get('/', BarberController.getAllBarbers);
router.get('/:id', BarberController.getBarberById);
router.post('/', validate(createBarberSchema), BarberController.createBarber);
router.put('/:id', validate(updateBarberSchema), BarberController.updateBarber);
router.delete('/:id', BarberController.deleteBarber);

export default router;
