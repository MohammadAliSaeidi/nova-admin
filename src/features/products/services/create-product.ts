import { axiosInstance } from "../../../shared/lib/api/axios-instance";
import { ApiError } from "../../../shared/types/api-error";
import type { CreateProductPayload, CreateProductValues } from "../types/create-product-values";
import type { Product } from "../types/product";

function toPayload(values: CreateProductValues): CreateProductPayload {
	const price = Number(values.price);
	if (!Number.isFinite(price) || price <= 0) {
		throw new ApiError("Invalid product price", "validation");
	}

	return {
		title: values.title.trim(),
		description: values.description.trim(),
		price,
		category: values.category,
		image: values.imageUrl.trim(),
	};
}

function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === "object" && value !== null;
}

export async function createProduct(
	values: CreateProductValues,
): Promise<Product> {
	const payload = toPayload(values);
	const response = await axiosInstance.post<unknown>("/products", payload);
	const id = isRecord(response.data) ? response.data.id : undefined;

	if (typeof id !== "number" || !Number.isSafeInteger(id) || id <= 0) {
		throw new ApiError("Invalid created product response", "unknown");
	}

	return { id, ...payload };
}
