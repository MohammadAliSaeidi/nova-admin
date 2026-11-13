import type { QueryClient } from "@tanstack/react-query";
import { PRODUCTS_QUERY_KEYS } from "../hooks/use-products/query-keys";
import { productsQueryOptions } from "../hooks/use-products/query-options";
import type { Product } from "../types/product";
import type { ProductListItem } from "../types/product-list-item";
import type { ProductListQueryData } from "../types/product-list-query-data";

export async function cacheCreatedProduct(
	queryClient: QueryClient,
	product: Product,
	isCurrentSession: () => boolean,
): Promise<void> {
	const queryKey = PRODUCTS_QUERY_KEYS.products.all;
	if (!isCurrentSession()) return;

	await queryClient.cancelQueries({ queryKey, exact: true });
	if (!isCurrentSession()) return;

	let listData = queryClient.getQueryData<ProductListQueryData>(queryKey);
	if (!listData?.hasBaseList) {
		try {
			listData = await queryClient.fetchQuery({
				...productsQueryOptions(),
				retry: false,
				staleTime: 0,
			});
		} catch {
			listData =
				queryClient.getQueryData<ProductListQueryData>(queryKey);
		}
		if (!isCurrentSession()) return;
	}

	const createdProduct: ProductListItem = {
		...product,
		localId: crypto.randomUUID(),
	};
	
	queryClient.setQueryData<ProductListQueryData>(queryKey, (currentData) => {
		const currentList = currentData ?? listData;
		return {
			products: [createdProduct, ...(currentList?.products ?? [])],
			hasBaseList: currentList?.hasBaseList ?? false,
		};
	});
}
