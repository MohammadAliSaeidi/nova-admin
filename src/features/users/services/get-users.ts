import { axiosInstance } from "../../../shared/lib/api/axios-instance";
import type { User } from "../types/user";

export async function getUsers(signal?: AbortSignal): Promise<User[]> {
	const response = await axiosInstance.get<User[]>("/users", { signal });

	return response.data;
}
