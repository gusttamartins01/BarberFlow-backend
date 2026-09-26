import type { Request, Response } from 'express';
import type { CreateCombo, UpdateCombo } from '../schemas/combo.schema.ts';
import * as ComboService from '../services/combo.service.ts';

export async function getAllCombos(
	_request: Request,
	response: Response
): Promise<void> {
	const combos = await ComboService.findAllCombos();

	response.status(200).json(combos);
}

export async function getComboById(
	request: Request,
	response: Response
): Promise<void> {
	const id = +request.params.id;

	const combo = await ComboService.findComboById(id);

	response.status(200).json(combo);
}

export async function createCombo(
	request: Request,
	response: Response
): Promise<void> {
	const body = request.body as CreateCombo;

	const combo = await ComboService.insertCombo(body);

	response.status(201).json(combo);
}

export async function updateCombo(
	request: Request,
	response: Response
): Promise<void> {
	const id = +request.params.id;
	const body = request.body as UpdateCombo;

	const combo = await ComboService.modifyCombo(id, body);

	response.status(200).json(combo);
}

export async function deleteCombo(
	request: Request,
	response: Response
): Promise<void> {
	const id = +request.params.id;

	await ComboService.removeCombo(id);

	response.status(204).send();
}
