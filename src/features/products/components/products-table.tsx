import { memo, useMemo } from "react";
import styled from "styled-components";
import type { Locale } from "../../../shared/types/locale";
import type { getMessages } from "../../../shared/data/dictionary/messages";
import type { Product } from "../types/product";

const TableWrap = styled.div`
	overflow-x: auto;
`;

const Table = styled.table`
	width: 100%;
	border-collapse: collapse;
	text-align: start;

	th,
	td {
		padding: 12px;
		border-bottom: 1px solid ${({ theme }) => theme.colors.border};
		text-align: start;
	}

	th {
		color: ${({ theme }) => theme.colors.muted};
		font-size: 14px;
	}
`;

const ProductImage = styled.img`
	width: 48px;
	height: 48px;
	object-fit: contain;
`;

type ProductMessages = ReturnType<typeof getMessages>;

interface ProductsTableProps {
	products: Product[];
	locale: Locale;
	messages: ProductMessages;
	isFetching: boolean;
}

function ProductsTableView({
	products,
	locale,
	messages,
	isFetching,
}: ProductsTableProps) {
	const formatPrice = useMemo(
		() =>
			new Intl.NumberFormat(locale === "fa" ? "fa-IR" : "en-US", {
				style: "currency",
				currency: "USD",
			}),
		[locale],
	);

	return (
		<TableWrap aria-busy={isFetching}>
			<Table>
				<thead>
					<tr>
						<th scope="col">{messages.image}</th>
						<th scope="col">{messages.title}</th>
						<th scope="col">{messages.price}</th>
						<th scope="col">{messages.category}</th>
					</tr>
				</thead>
				<tbody>
					{products.map((product) => (
						<tr key={product.id}>
							<td>
								<ProductImage
									src={product.image}
									alt=""
									width={48}
									height={48}
									loading="lazy"
								/>
							</td>
							<td>{product.title}</td>
							<td>{formatPrice.format(product.price)}</td>
							<td>{product.category}</td>
						</tr>
					))}
				</tbody>
			</Table>
		</TableWrap>
	);
}

export const ProductsTable = memo(ProductsTableView);
