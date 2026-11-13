import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { Button, LinkButton } from "../../../../shared/components/ui/button";
import { Pagination } from "../../../../shared/components/ui/pagination";
import { useMessages } from "../../../../shared/data/dictionary/use-messages";
import { routePaths } from "../../../../shared/data/route-paths";
import { useAppSelector } from "../../../../shared/lib/redux/hooks";
import {
	clampPage,
	getPageCount,
	getPageItems,
} from "../../../../shared/lib/utils/pagination";
import { useSearchParam } from "../../../../shared/hooks/use-search-param";
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

const PRODUCTS_PER_PAGE = 10;

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
	const messages = useMessages();
	const [search, setSearch] = useState("");
	const pageParam = useSearchParam("page");
	const { updateParam: replacePageParam } = useSearchParam("page", {
		method: "replace",
	});
	const location = useLocation();
	const productsQuery = useProducts();
	const allProducts = productsQuery.data?.products;
	const products = useMemo(
		() => searchProducts(allProducts ?? [], search),
		[allProducts, search],
	);
	const pageCount = getPageCount(products.length, PRODUCTS_PER_PAGE);
	const parsedPage = /^\d+$/.test(pageParam.value ?? "")
		? Number(pageParam.value)
		: 1;
	const currentPage = clampPage(parsedPage, pageCount);
	const visibleProducts = getPageItems(products, currentPage, PRODUCTS_PER_PAGE);

	useEffect(() => {
		if (!allProducts || pageParam.value === null) return;
		if (pageParam.value !== String(currentPage)) {
			replacePageParam(String(currentPage));
		}
	}, [allProducts, currentPage, pageParam.value, replacePageParam]);
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
				onChange={(value) => {
					setSearch(value);
					pageParam.deleteParam();
				}}
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
					products={visibleProducts}
					locale={locale}
					messages={messages}
					isFetching={productsQuery.isFetching}
				/>
			)}
			<Pagination
				currentPage={currentPage}
				pageCount={pageCount}
				locale={locale}
				direction={locale === "fa" ? "rtl" : "ltr"}
				label={messages.paginationLabel}
				previousLabel={messages.previousPage}
				nextLabel={messages.nextPage}
				pageSummary={(current, total) =>
					messages.pageSummary
						.replace("{{current}}", current)
						.replace("{{total}}", total)
				}
				onPageChange={(page) => pageParam.updateParam(String(page))}
			/>
		</section>
	);
}
