import type { Request, Response } from 'express';
import type {
	CreateCustomer,
	UpdateCustomer
} from '../schemas/customer.schema.ts';
import * as CustomerService from '../services/customer.service.ts';

export async function getAllCustomers(
	_request: Request,
	response: Response
): Promise<void> {
	const customers = await CustomerService.findAllCustomers();

	response.status(200).json(customers);
}

export async function getCustomersById(
	request: Request,
	response: Response
): Promise<void> {
	const id = +request.params.id;

	const customer = await CustomerService.findCustomerById(id);

	response.status(200).json(customer);
}

export async function createCustomers(
	request: Request,
	response: Response
): Promise<void> {
	const body = request.body as CreateCustomer;

	const customer = await CustomerService.insertCustomer(body);

	response.status(201).json(customer);
}

export async function updateCustomers(
	request: Request,
	response: Response
): Promise<void> {
	const id = +request.params.id;
	const body = request.body as UpdateCustomer;

	const customer = await CustomerService.modifyCustomer(id, body);

	response.status(200).json(customer);
}

export async function deleteCustomers(
	request: Request,
	response: Response
): Promise<void> {
	const id = +request.params.id;

	await CustomerService.removeCustomer(id);

	response.status(204).send();
}
