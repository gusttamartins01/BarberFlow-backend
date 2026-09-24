import type { Decimal } from '@prisma/client/runtime/client';

export type ValidationFieldError = {
	field: string;
	message: string;
};

export type Customer = {
	id: number;
	name: string;
	phone: string;
	createdAt: Date;
	updatedAt: Date;
};

export type Barber = {
	id: number;
	name: string;
	createdAt: Date;
	updatedAt: Date;
};

export type Service = {
	id: number;
	name: string;
	description?: string | null;
	price: Decimal;
	duration: number;
	createdAt: Date;
	updatedAt: Date;
};

export type Combo = {
	id: number;
	name: string;
	description: string;
	price: Decimal;
	services: Service[];
	createdAt: Date;
	updatedAt: Date;
};

export type AppointmentStatus =
	| 'pending'
	| 'confirmed'
	| 'cancelled'
	| 'completed';

export type Appointment = {
	id: number;
	customerId: number;
	barberId: number;
	serviceId: number;
	date: Date;
	startTime: string;
	endTime: string;
	status: AppointmentStatus;
	totalPrice: Decimal;
	notes?: string | null;
	createdAt: Date;
	updatedAt: Date;
};

export type BusinessHours = {
	id: number;
	dayOfWeek: number;
	openTime: string;
	closeTime: string;
	isOpen: boolean;
	createdAt: Date;
	updatedAt: Date;
};
