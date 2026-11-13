import { axiosInstance } from "../../../shared/lib/api/axios-instance";
import type {
	CreateProductPayload,
	CreateProductValues,
} from "../types/create-product-values";
import type { Product } from "../types/product";

function toPayload(values: CreateProductValues): CreateProductPayload {
	return {
		title: values.title.trim(),
		description: values.description.trim(),
		price: Number(values.price),
		category: values.category,
		image: values.imageUrl.trim(),
	};
}

export async function createProduct(
	values: CreateProductValues,
): Promise<Product> {
	const payload = toPayload(values);
	const { data } = await axiosInstance.post<{ id: number }>(
		"/products",
		payload,
	);
	return { id: data.id, ...payload };
}
