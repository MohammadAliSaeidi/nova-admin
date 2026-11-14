export interface CreateUserValues {
	firstName: string;
	lastName: string;
	username: string;
	email: string;
	password: string;
	phone: string;
}

export interface CreateUserPayload {
	email: string;
	username: string;
	password: string;
	name: {
		firstname: string;
		lastname: string;
	};
	phone: string;
}
