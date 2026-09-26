import { Router } from 'express';
import * as ComboController from '../controllers/combo.controller.ts';
import validate, { validateId } from '../middlewares/validate.ts';
import {
	createComboSchema,
	updateComboSchema
} from '../schemas/combo.schema.ts';

const router = Router();
router.param('id', validateId);

router.get('/', ComboController.getAllCombos);
router.get('/:id', ComboController.getComboById);
router.post('/', validate(createComboSchema), ComboController.createCombo);
router.put('/:id', validate(updateComboSchema), ComboController.updateCombo);
router.delete('/:id', ComboController.deleteCombo);

export default router;
