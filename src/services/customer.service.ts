import { NotFoundError } from '../errors/index.ts';
import prisma from '../lib/prisma.ts';
import type {
	CreateCustomer,
	UpdateCustomer
} from '../schemas/customer.schema.ts';
import type { Customer } from '../types.ts';

export async function findAllCustomers(): Promise<Customer[]> {
	return await prisma.customer.findMany();
}

export async function findCustomerById(id: number): Promise<Customer> {
	const customer = await prisma.customer.findUnique({
		where: { id }
	});

	if (!customer)
		throw new NotFoundError(`Usuário com ID ${id} não encontrado.`);

	return customer;
}

export async function insertCustomer(data: CreateCustomer): Promise<Customer> {
	return await prisma.customer.create({
		data
	});
}

export async function modifyCustomer(
	id: number,
	data: UpdateCustomer
): Promise<Customer> {
	await findCustomerById(id);

	return await prisma.customer.update({
		where: { id },
		data
	});
}

export async function removeCustomer(id: number): Promise<void> {
	await findCustomerById(id);

	await prisma.customer.delete({
		where: { id }
	});
}
