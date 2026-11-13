import { useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { Button, LinkButton } from "../../../../shared/components/ui/button";
import { getMessages } from "../../../../shared/data/dictionary/messages";
import { routePaths } from "../../../../shared/data/route-paths";
import { useAppSelector } from "../../../../shared/lib/redux/hooks";
import { ProductsSearch } from "../../components/products-search";
import ProductsTable from "../../components/products-table";
import { useProducts } from "../../hooks/use-products/use-products";
import { searchProducts } from "../../utils/search-products";
import { Status } from "./styles";

const PageHeading = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 16px;
	margin-block: 22px 8px;

	h1 {
		margin: 0;
	}
`;

function hasProductCreatedNotice(state: unknown): boolean {
	return (
		typeof state === "object" &&
		state !== null &&
		"productCreated" in state &&
		state.productCreated === true
	);
}

export default function ProductsPage() {
	const locale = useAppSelector((state) => state.preferences.locale);
	const messages = getMessages(locale);
	const [search, setSearch] = useState("");
	const location = useLocation();
	const productsQuery = useProducts();
	const allProducts = productsQuery.data?.products;
	const products = useMemo(
		() => searchProducts(allProducts ?? [], search),
		[allProducts, search],
	);
	const heading = (
		<PageHeading>
			<h1>{messages.products}</h1>
			<LinkButton to={routePaths.productsNew}>
				{messages.createProduct}
			</LinkButton>
		</PageHeading>
	);

	if (productsQuery.isPending && !allProducts) {
		return (
			<section>
				{heading}
				<Status role="status">{messages.loadingProducts}</Status>
			</section>
		);
	}

	if (productsQuery.isError && !allProducts) {
		return (
			<section>
				{heading}
				<Status role="alert">
					{messages.productsLoadError}
					<Button
						type="button"
						disabled={productsQuery.isFetching}
						onClick={() => void productsQuery.refetch()}
					>
						{messages.retry}
					</Button>
				</Status>
			</section>
		);
	}

	return (
		<section>
			{heading}
			{hasProductCreatedNotice(location.state) && (
				<Status role="status">{messages.productCreated}</Status>
			)}
			{productsQuery.data && !productsQuery.data.hasBaseList && (
				<Status role="alert">
					{messages.productsListIncomplete}{" "}
					<Button
						type="button"
						disabled={productsQuery.isFetching}
						onClick={() => void productsQuery.refetch()}
					>
						{messages.retry}
					</Button>
				</Status>
			)}
			<ProductsSearch
				label={messages.searchProducts}
				onChange={setSearch}
			/>
			{productsQuery.isError &&
				productsQuery.data?.hasBaseList !== false && (
					<Status role="alert">
						{messages.productsLoadError}
						<Button
							type="button"
							disabled={productsQuery.isFetching}
							onClick={() => void productsQuery.refetch()}
						>
							{messages.retry}
						</Button>
					</Status>
				)}
			{products.length === 0 ? (
				<Status role="status">
					{allProducts && allProducts.length > 0
						? messages.noProductsMatch
						: messages.noProducts}
				</Status>
			) : (
				<ProductsTable
					products={products}
					locale={locale}
					messages={messages}
					isFetching={productsQuery.isFetching}
				/>
			)}
		</section>
	);
}
