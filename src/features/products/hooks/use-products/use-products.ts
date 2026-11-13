import { useQuery } from "@tanstack/react-query";
import { productsQueryOptions } from "./query-options";

export function useProducts() {
	return useQuery(productsQueryOptions());
}
