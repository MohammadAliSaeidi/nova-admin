import { axiosInstance } from "../../../shared/lib/api/axios-instance";
import { ApiError } from "../../../shared/types/api-error";

export async function getCategories(): Promise<string[]> {
	const response = await axiosInstance.get<unknown>("/products/categories");
	if (
		!Array.isArray(response.data) ||
		response.data.some(
			(category) =>
				typeof category !== "string" || category.trim().length === 0,
		)
	) {
		throw new ApiError("Invalid categories response", "unknown");
	}

	return response.data;
}
