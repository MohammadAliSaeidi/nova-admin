import { axiosInstance } from "../../../shared/lib/api/axios-instance";

export async function getCategories(): Promise<string[]> {
	const response = await axiosInstance.get<string[]>("/products/categories");

	return response.data;
}
