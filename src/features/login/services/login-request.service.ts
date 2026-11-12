import { axiosInstance } from "../../../shared/lib/utils/api/axios-instance";
import type { LoginPayload } from "../types/login-payload";
import type { LoginResponse } from "../types/login-response";

export async function loginRequest(
	payload: LoginPayload,
): Promise<LoginResponse> {
	const response = await axiosInstance.post<LoginResponse>(
		"/auth/login",
		payload,
	);

	return response.data;
}
