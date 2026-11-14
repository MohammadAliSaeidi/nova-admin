import { axiosInstance } from "../../../shared/lib/api/axios-instance";
import { ApiError } from "../../../shared/types/api-error";
import type { CreateUserPayload, CreateUserValues } from "../types/create-user-values";
import type { User } from "../types/user";

function toPayload(values: CreateUserValues): CreateUserPayload {
	return {
		email: values.email.trim(),
		username: values.username.trim(),
		password: values.password,
		name: {
			firstname: values.firstName.trim(),
			lastname: values.lastName.trim(),
		},
		phone: values.phone.trim(),
	};
}

export async function createUser(values: CreateUserValues): Promise<User> {
	const payload = toPayload(values);
	const { data } = await axiosInstance.post<{ id: number }>("/users", payload);
	if (!Number.isSafeInteger(data.id) || data.id <= 0) {
		throw new ApiError("Invalid create user response", "unknown");
	}
	return {
		id: data.id,
		localId: `created-${Date.now()}-${Math.random().toString(36).slice(2)}`,
		firstName: payload.name.firstname,
		lastName: payload.name.lastname,
		fullName: `${payload.name.firstname} ${payload.name.lastname}`,
		username: payload.username,
		email: payload.email,
		phone: payload.phone,
	};
}
