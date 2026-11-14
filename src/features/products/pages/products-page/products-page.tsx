import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { Button, LinkButton } from "../../../../shared/components/ui/button";
import { Pagination } from "../../../../shared/components/ui/pagination";
import { useMessages } from "../../../../shared/data/dictionary/use-messages";
import { routePaths } from "../../../../shared/data/route-paths";
import { useSearchParam } from "../../../../shared/hooks/use-search-param";
import { useAppSelector } from "../../../../shared/lib/redux/hooks";
import {
	clampPage,
	getPageCount,
	getPageItems,
} from "../../../../shared/lib/utils/pagination";
import { ProductsSearch } from "../../components/products-search";
import ProductsTable from "../../components/products-table";
import { useProducts } from "../../hooks/use-products/use-products";
import { searchProducts } from "../../utils/search-products";
import { PageContent, PageHeading, ProductResults, Status } from "./styles";

const PRODUCTS_PER_PAGE = 10;

function hasProductCreatedNotice(state: unknown): boolean {
	return (
		typeof state === "object" &&
		state !== null &&
		"productCreated" in state &&
		state.productCreated === true
	);
}

function parsePage(value: string | null): number {
	return /^\d+$/.test(value ?? "") ? Number(value) : 1;
}

function formatPageSummary(
	template: string,
	current: string,
	total: string,
): string {
	return template
		.replace("{{current}}", String(current))
		.replace("{{total}}", String(total));
}

export default function ProductsPage() {
	const locale = useAppSelector((state) => state.preferences.locale);
	const messages = useMessages();
	const location = useLocation();
	const productsQuery = useProducts();
	const { data, isPending, isError, isFetching, refetch } = productsQuery;
	const allProducts = data?.products;

	const [search, setSearch] = useState("");

	const {
		value: pageParam,
		updateParam: updatePageParam,
		deleteParam: deletePageParam,
	} = useSearchParam("page");
	const { updateParam: replacePageParam } = useSearchParam("page", {
		method: "replace",
	});

	const products = useMemo(
		() => searchProducts(allProducts ?? [], search),
		[allProducts, search],
	);
	const pageCount = getPageCount(products.length, PRODUCTS_PER_PAGE);
	const currentPage = clampPage(parsePage(pageParam), pageCount);
	const visibleProducts = getPageItems(
		products,
		currentPage,
		PRODUCTS_PER_PAGE,
	);

	const handleSearchChange = useCallback(
		(value: string) => {
			if (value === search) return;
			setSearch(value);
			deletePageParam();
		},
		[deletePageParam, search],
	);

	const handleRetry = () => void refetch();

	useEffect(() => {
		if (!allProducts || pageParam === null) return;
		if (pageParam !== String(currentPage)) {
			replacePageParam(String(currentPage));
		}
	}, [allProducts, currentPage, pageParam, replacePageParam]);

	const retryButton = (
		<Button type="button" disabled={isFetching} onClick={handleRetry}>
			{messages.retry}
		</Button>
	);

	const page = (content: React.ReactNode) => (
		<PageContent>
			<PageHeading>
				<h1>{messages.products}</h1>
				<LinkButton to={routePaths.productsNew}>
					{messages.createProduct}
				</LinkButton>
			</PageHeading>
			{content}
		</PageContent>
	);

	if (isPending && !allProducts) {
		return page(
			<Status role="status">{messages.loadingProducts}</Status>,
		);
	}

	if (isError && !allProducts) {
		return page(
			<Status role="alert">
				{messages.productsLoadError}
				{retryButton}
			</Status>,
		);
	}

	const showCreatedNotice = hasProductCreatedNotice(location.state);
	const showIncompleteList = data !== undefined && !data.hasBaseList;
	const showBackgroundError = isError && data?.hasBaseList !== false;
	const emptyMessage = allProducts?.length
		? messages.noProductsMatch
		: messages.noProducts;

	return page(
		<>
			{showCreatedNotice && (
				<Status role="status">{messages.productCreated}</Status>
			)}
			{showIncompleteList && (
				<Status role="alert">
					{messages.productsListIncomplete} {retryButton}
				</Status>
			)}
			<ProductsSearch
				label={messages.searchProducts}
				onChange={handleSearchChange}
			/>
			{showBackgroundError && (
				<Status role="alert">
					{messages.productsLoadError}
					{retryButton}
				</Status>
			)}
			<ProductResults>
				{products.length === 0 ? (
					<Status role="status">{emptyMessage}</Status>
				) : (
					<ProductsTable
						products={visibleProducts}
						locale={locale}
						messages={messages}
						isFetching={isFetching}
					/>
				)}
			</ProductResults>
			<Pagination
				currentPage={currentPage}
				pageCount={pageCount}
				locale={locale}
				direction={locale === "fa" ? "rtl" : "ltr"}
				label={messages.paginationLabel}
				previousLabel={messages.previousPage}
				nextLabel={messages.nextPage}
				pageSummary={(current, total) =>
					formatPageSummary(messages.pageSummary, current, total)
				}
				onPageChange={(next) => updatePageParam(String(next))}
			/>
		</>,
	);
}
