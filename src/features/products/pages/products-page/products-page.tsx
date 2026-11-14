import { useLocation } from "react-router-dom";
import { Button, LinkButton } from "../../../../shared/components/ui/button";
import { SearchablePaginatedList } from "../../../../shared/components/ui/searchable-paginated-list";
import { useMessages } from "../../../../shared/data/dictionary/use-messages";
import { routePaths } from "../../../../shared/data/route-paths";
import { useAppSelector } from "../../../../shared/lib/redux/hooks";
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

export default function ProductsPage() {
	const locale = useAppSelector((state) => state.preferences.locale);
	const messages = useMessages();
	const location = useLocation();
	const productsQuery = useProducts();
	const { data, isPending, isError, isFetching, refetch } = productsQuery;
	const allProducts = data?.products;

	const handleRetry = () => void refetch();

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
			<SearchablePaginatedList
				id="products-search"
				label={messages.searchProducts}
				items={allProducts ?? []}
				dataReady={allProducts !== undefined}
				searchItems={searchProducts}
				pageSize={PRODUCTS_PER_PAGE}
				locale={locale}
				paginationLabel={messages.paginationLabel}
				previousLabel={messages.previousPage}
				nextLabel={messages.nextPage}
				pageSummary={messages.pageSummary}
				afterSearch={showBackgroundError && (
					<Status role="alert">
						{messages.productsLoadError}
						{retryButton}
					</Status>
				)}
				renderResults={(products, visibleProducts) => (
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
				)}
			/>
		</>,
	);
}
