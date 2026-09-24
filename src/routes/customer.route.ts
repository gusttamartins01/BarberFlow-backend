import { Router } from 'express';
import * as CustomerController from '../controllers/customer.controller.ts';
import validate from '../middlewares/validate.ts';
import {
	createCustomerSchema,
	updateCustomerSchema
} from '../schemas/customer.schema.ts';

const router = Router();

router.get('/', CustomerController.getAllCustomers);
router.get('/:id', CustomerController.getCustomersById);
router.post(
	'/',
	validate(createCustomerSchema),
	CustomerController.createCustomers
);
router.put(
	'/:id',
	validate(updateCustomerSchema),
	CustomerController.updateCustomers
);
router.delete('/:id', CustomerController.deleteCustomers);

export default router;
