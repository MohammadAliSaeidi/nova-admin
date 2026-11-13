import type { ProductListItem } from "./product-list-item";

export interface ProductListQueryData {
	products: ProductListItem[];
	hasBaseList: boolean;
}
