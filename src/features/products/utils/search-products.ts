import type { Product } from "../types/product";

export function searchProducts(products: Product[], query: string): Product[] {
	const normalizedQuery = query.trim().toLocaleLowerCase();
	if (!normalizedQuery) return products;

	return products.filter(({ title, category }) =>
		`${title} ${category}`.toLocaleLowerCase().includes(normalizedQuery),
	);
}
