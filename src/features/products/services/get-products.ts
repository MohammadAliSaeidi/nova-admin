import { axiosInstance } from "../../../shared/lib/api/axios-instance";
import { ApiError } from "../../../shared/types/api-error";
import type { Product } from "../types/product";

function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === "object" && value !== null;
}

function parseProduct(value: unknown): Product {
	if (!isRecord(value)) {
		throw new ApiError("Invalid products response", "unknown");
	}

	const { id, title, price, description, category, image } = value;
	if (
		typeof id !== "number" ||
		!Number.isSafeInteger(id) ||
		id <= 0 ||
		typeof title !== "string" ||
		typeof price !== "number" ||
		!Number.isFinite(price) ||
		typeof description !== "string" ||
		typeof category !== "string" ||
		typeof image !== "string"
	) {
		throw new ApiError("Invalid products response", "unknown");
	}

	return { id, title, price, description, category, image };
}

export async function getProducts(signal?: AbortSignal): Promise<Product[]> {
	const response = await axiosInstance.get<unknown>("/products", {
		signal,
	});
	if (!Array.isArray(response.data)) {
		throw new ApiError("Invalid products response", "unknown");
	}

	return response.data.map(parseProduct);
}
