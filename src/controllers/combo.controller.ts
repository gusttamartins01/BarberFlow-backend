import type { Request, Response } from 'express';
import type { CreateCombo, UpdateCombo } from '../schemas/combo.schema.ts';
import * as ComboService from '../services/combo.service.ts';

export function getAllCombos(_request: Request, response: Response): void {
	const combos = ComboService.findAllCombos();

	response.status(200).json(combos);
}

export function getComboById(request: Request, response: Response): void {
	const id = +request.params.id;

	const combo = ComboService.findComboById(id);

	response.status(200).json(combo);
}

export function createCombo(request: Request, response: Response): void {
	const body = request.body as CreateCombo;

	const combo = ComboService.insertCombo(body);

	response.status(201).json(combo);
}

export function updateCombo(request: Request, response: Response): void {
	const id = +request.params.id;
	const body = request.body as UpdateCombo;

	const combo = ComboService.modifyCombo(id, body);

	response.status(200).json(combo);
}

export function deleteCombo(request: Request, response: Response): void {
	const id = +request.params.id;

	ComboService.removeCombo(id);

	response.status(204).send();
}
