import type { Request, Response } from 'express';
import type {
	CreateCustomer,
	UpdateCustomer
} from '../schemas/customer.schema.ts';
import * as CustomerService from '../services/customer.service.ts';

export function getAllCustomers(_request: Request, response: Response): void {
	const customers = CustomerService.findAllCustomers();

	response.status(200).json(customers);
}

export function getCustomersById(request: Request, response: Response): void {
	const id = Number(request.params.id);

	const customer = CustomerService.findCustomerById(id);

	response.status(200).json(customer);
}

export function createCustomers(request: Request, response: Response): void {
	const body = request.body as CreateCustomer;

	const customer = CustomerService.insertCustomer(body);

	response.status(201).json(customer);
}

export function updateCustomers(request: Request, response: Response): void {
	const id = Number(request.params.id);
	const body = request.body as UpdateCustomer;

	const customer = CustomerService.modifycustomer(id, body);

	response.status(200).json(customer);
}

export function deleteCustomers(request: Request, response: Response): void {
	const id = Number(request.params.id);

	CustomerService.removeCustomer(id);

	response.status(204).send();
}
