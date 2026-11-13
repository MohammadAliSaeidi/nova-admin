import type { Product } from "./product";

export interface ProductListItem extends Product {
	localId?: string;
}
