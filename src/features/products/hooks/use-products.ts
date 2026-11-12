import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../services/get-products";

export const productsQueryKey = ["products", "all"] as const;

export function useProducts() {
	return useQuery({
		queryKey: productsQueryKey,
		queryFn: ({ signal }) => getProducts(signal),
	});
}
