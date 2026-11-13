import { memo, useMemo } from "react";
import styled from "styled-components";
import { SharedTable } from "../../../../shared/components/ui/table";
import type { Messages } from "../../../../shared/data/dictionary/messages";
import type { Locale } from "../../../../shared/types/locale";
import type { SharedTableColumn } from "../../../../shared/types/table";
import type { ProductListItem } from "../../types/product-list-item";

const ProductImage = styled.img`
	width: 48px;
	height: 48px;
	object-fit: contain;
`;

type Props = {
	products: ProductListItem[];
	locale: Locale;
	messages: Messages;
	isFetching: boolean;
};

function ProductsTableView(props: Props) {
	const { products, locale, messages, isFetching } = props;

	const formatPrice = useMemo(
		() =>
			new Intl.NumberFormat(locale === "fa" ? "fa-IR" : "en-US", {
				style: "currency",
				currency: "USD",
			}),
		[locale],
	);
	const columns: SharedTableColumn<ProductListItem>[] = [
		{
			id: "image",
			header: messages.image,
			cell: (product) => (
				<ProductImage
					src={product.image}
					alt=""
					width={48}
					height={48}
					loading="lazy"
				/>
			),
		},
		{
			id: "title",
			header: messages.title,
			cell: (product) => product.title,
		},
		{
			id: "price",
			header: messages.price,
			cell: (product) => formatPrice.format(product.price),
		},
		{
			id: "category",
			header: messages.category,
			cell: (product) => product.category,
		},
	];

	return (
		<SharedTable
			caption={messages.products}
			columns={columns}
			rows={products}
			getRowKey={(product) =>
				product.localId
					? `created:${product.localId}`
					: `remote:${product.id}`
			}
			busy={isFetching}
		/>
	);
}

const ProductsTable = memo(ProductsTableView);

export default ProductsTable;
