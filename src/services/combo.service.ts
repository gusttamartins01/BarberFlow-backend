import type { Decimal } from '@prisma/client/runtime/client';
import { NotFoundError } from '../errors/index.ts';
import prisma from '../lib/prisma.ts';
import type { CreateCombo, UpdateCombo } from '../schemas/combo.schema.ts';
import type { Combo } from '../types.ts';

function mapComboWithServices(combo: {
	id: number;
	name: string;
	description: string;
	price: Decimal;
	createdAt: Date;
	updatedAt: Date;
	comboServices: Array<{ service: Combo['services'][number] }>;
}): Combo {
	return {
		...combo,
		services: combo.comboServices.map(({ service }) => service)
	};
}

export async function findAllCombos(): Promise<Combo[]> {
	const combos = await prisma.combo.findMany({
		include: {
			comboServices: {
				include: {
					service: true
				}
			}
		}
	});

	return combos.map((combo) => mapComboWithServices(combo));
}

export async function findComboById(id: number): Promise<Combo> {
	const combo = await prisma.combo.findUnique({
		where: { id },
		include: {
			comboServices: {
				include: {
					service: true
				}
			}
		}
	});

	if (!combo) {
		throw new NotFoundError(`Combo com ID ${id} não encontrado.`);
	}

	return mapComboWithServices(combo);
}

export async function insertCombo(data: CreateCombo): Promise<Combo> {
	const { serviceIds, ...comboData } = data;

	const combo = await prisma.combo.create({
		data: {
			...comboData,
			comboServices: {
				create: serviceIds.map((serviceId) => ({
					service: {
						connect: { id: serviceId }
					}
				}))
			}
		},
		include: {
			comboServices: {
				include: {
					service: true
				}
			}
		}
	});

	return mapComboWithServices(combo);
}

export async function modifyCombo(
	id: number,
	data: UpdateCombo
): Promise<Combo> {
	await findComboById(id);

	const { serviceIds, ...comboData } = data;

	const combo = await prisma.combo.update({
		where: { id },
		data: {
			...comboData,
			...(serviceIds
				? {
						comboServices: {
							deleteMany: {},
							create: serviceIds.map((serviceId) => ({
								service: {
									connect: { id: serviceId }
								}
							}))
						}
					}
				: {})
		},
		include: {
			comboServices: {
				include: {
					service: true
				}
			}
		}
	});

	return mapComboWithServices(combo);
}

export async function removeCombo(id: number): Promise<void> {
	await findComboById(id);

	await prisma.combo.delete({
		where: { id }
	});
}
