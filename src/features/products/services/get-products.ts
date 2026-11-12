import { axiosInstance } from "../../../shared/lib/api/axios-instance";
import { ApiError } from "../../../shared/types/api-error";
import type { Product } from "../types/product";

export async function getProducts(signal?: AbortSignal): Promise<Product[]> {
	const response = await axiosInstance.get<Product[]>("/products", {
		signal,
	});
	if (!Array.isArray(response.data)) {
		throw new ApiError("Invalid products response", "unknown");
	}

	return response.data;
}
