import type { ReactNode } from "react";
import styled from "styled-components";
import { Pagination } from "./pagination";
import { DebouncedSearchInput } from "./debounced-search-input";
import { useSearchablePagination } from "../../hooks/use-searchable-pagination";
import type { Locale } from "../../types/locale";

const ListRoot = styled.div`
	flex: 1;
	min-height: 0;
	display: flex;
	flex-direction: column;
`;

interface SearchablePaginatedListProps<Item> {
	id: string;
	label: string;
	items: readonly Item[];
	dataReady: boolean;
	searchItems: (items: readonly Item[], query: string) => readonly Item[];
	pageSize: number;
	locale: Locale;
	paginationLabel: string;
	previousLabel: string;
	nextLabel: string;
	pageSummary: string;
	afterSearch?: ReactNode;
	renderResults: (
		filteredItems: readonly Item[],
		visibleItems: Item[],
	) => ReactNode;
}

export function SearchablePaginatedList<Item>({
	id,
	label,
	items,
	dataReady,
	searchItems,
	pageSize,
	locale,
	paginationLabel,
	previousLabel,
	nextLabel,
	pageSummary,
	afterSearch,
	renderResults,
}: SearchablePaginatedListProps<Item>) {
	const {
		filteredItems,
		visibleItems,
		currentPage,
		pageCount,
		onSearchChange,
		onPageChange,
	} = useSearchablePagination({ items, searchItems, pageSize, dataReady });

	return (
		<ListRoot>
			<DebouncedSearchInput
				id={id}
				label={label}
				onChange={onSearchChange}
			/>
			{afterSearch}
			{renderResults(filteredItems, visibleItems)}
			<Pagination
				currentPage={currentPage}
				pageCount={pageCount}
				locale={locale}
				direction={locale === "fa" ? "rtl" : "ltr"}
				label={paginationLabel}
				previousLabel={previousLabel}
				nextLabel={nextLabel}
				pageSummary={(current, total) =>
					pageSummary
						.replace("{{current}}", current)
						.replace("{{total}}", total)
				}
				onPageChange={onPageChange}
			/>
		</ListRoot>
	);
}
