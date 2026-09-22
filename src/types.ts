export type ValidationFieldError = {
	field: string;
	message: string;
};

export type Customer = {
	id: number;
	name: string;
	phone: string;
	email?: string;
	createdAt: string;
	updatedAt: string;
};

export type Barber = {
	id: number;
	name: string;
	createdAt: string;
	updatedAt: string;
};

export type Service = {
	id: number;
	name: string;
	description?: string;
	price: number;
	duration: number;
	createdAt: string;
	updatedAt: string;
};

export type Combo = {
	id: number;
	name: string;
	description: string;
	price: number;
	services: Service[];
	createdAt: string;
	updatedAt: string;
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
	date: string;
	startTime: string;
	endTime: string;
	status: AppointmentStatus;
	totalPrice: number;
	notes?: string;
	createdAt: string;
	updatedAt: string;
};

export type BusinessHours = {
	id: number;
	dayOfWeek: number;
	openTime: string;
	closeTime: string;
	isOpen: boolean;
	createdAt: string;
	updatedAt: string;
};
