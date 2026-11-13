import type { ProductListItem } from "../types/product-list-item";

export function searchProducts(
	products: ProductListItem[],
	query: string,
): ProductListItem[] {
	const normalizedQuery = query.trim().toLocaleLowerCase();
	if (!normalizedQuery) return products;

	return products.filter(({ title, category }) =>
		`${title} ${category}`.toLocaleLowerCase().includes(normalizedQuery),
	);
}
