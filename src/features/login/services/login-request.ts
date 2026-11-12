import { axiosInstance } from "../../../shared/lib/api/axios-instance";
import { ApiError } from "../../../shared/types/api-error";
import type { LoginPayload } from "../types/login-payload";
import type { LoginResponse } from "../types/login-response";

export async function loginRequest(
	payload: LoginPayload,
): Promise<LoginResponse> {
	const response = await axiosInstance.post<LoginResponse>(
		"/auth/login",
		payload,
	);

	const token = response.data?.token;
	if (typeof token !== "string" || token.trim().length === 0) {
		throw new ApiError("Invalid login response", "unknown");
	}

	return { token };
}
