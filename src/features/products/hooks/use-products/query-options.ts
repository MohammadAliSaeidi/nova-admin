import { getProducts } from "../../services/get-products";
import { PRODUCTS_QUERY_KEYS } from "./query-keys";

export function productsQueryOptions() {
	return {
		queryKey: PRODUCTS_QUERY_KEYS.products.all,
		queryFn: async ({ signal }: { signal: AbortSignal }) => ({
			products: await getProducts(signal),
			hasBaseList: true,
		}),
		staleTime: 30_000,
	};
}
