import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../services/get-categories";
import { PRODUCTS_QUERY_KEYS } from "./use-products/query-keys";

export function useProductCategories() {
	return useQuery({
		queryKey: PRODUCTS_QUERY_KEYS.categories.all,
		queryFn: getCategories,
		staleTime: 5 * 60 * 1000,
	});
}
