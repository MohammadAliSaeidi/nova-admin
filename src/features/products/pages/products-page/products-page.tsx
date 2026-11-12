import { useMemo, useState } from "react";
import { Button } from "../../../../shared/components/ui/button";
import { getMessages } from "../../../../shared/data/dictionary/messages";
import { useAppSelector } from "../../../../shared/lib/redux/hooks";
import { ProductsSearch } from "../../components/products-search";
import { ProductsTable } from "../../components/products-table";
import { useProducts } from "../../hooks/use-products";
import { Status } from "./styles";
import { searchProducts } from "../../utils/search-products";

export default function ProductsPage() {
	const locale = useAppSelector((state) => state.preferences.locale);
	const messages = getMessages(locale);
	const [search, setSearch] = useState("");
	const productsQuery = useProducts();
	const products = useMemo(
		() =>
			productsQuery.data
				? searchProducts(productsQuery.data, search)
				: [],
		[productsQuery.data, search],
	);

	if (productsQuery.isPending && !productsQuery.data) {
		return (
			<section>
				<h1>{messages.products}</h1>
				<Status role="status">{messages.loadingProducts}</Status>
			</section>
		);
	}

	if (productsQuery.isError && !productsQuery.data) {
		return (
			<section>
				<h1>{messages.products}</h1>
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
			<h1>{messages.products}</h1>
			<ProductsSearch label={messages.searchProducts} onChange={setSearch} />
			{productsQuery.isError && (
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
					{productsQuery.data?.length
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
