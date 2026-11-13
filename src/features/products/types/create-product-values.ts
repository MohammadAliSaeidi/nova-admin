export interface CreateProductValues {
	title: string;
	description: string;
	price: string;
	category: string;
	imageUrl: string;
}

export interface CreateProductPayload {
	title: string;
	description: string;
	price: number;
	category: string;
	image: string;
}
