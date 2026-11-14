import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParam } from "./use-search-param";
import {
	clampPage,
	getPageCount,
	getPageItems,
} from "../lib/utils/pagination";

interface UseSearchablePaginationOptions<Item> {
	items: readonly Item[];
	searchItems: (items: readonly Item[], query: string) => readonly Item[];
	pageSize: number;
	dataReady: boolean;
}

function parsePage(value: string | null): number {
	return /^\d+$/.test(value ?? "") ? Number(value) : 1;
}

export function useSearchablePagination<Item>({
	items,
	searchItems,
	pageSize,
	dataReady,
}: UseSearchablePaginationOptions<Item>) {
	const [search, setSearch] = useState("");
	const {
		value: pageParam,
		updateParam,
		deleteParam,
	} = useSearchParam("page");
	const { updateParam: replacePageParam } = useSearchParam("page", {
		method: "replace",
	});
	const filteredItems = useMemo(
		() => searchItems(items, search),
		[items, search, searchItems],
	);
	const pageCount = getPageCount(filteredItems.length, pageSize);
	const currentPage = clampPage(parsePage(pageParam), pageCount);
	const visibleItems = getPageItems(filteredItems, currentPage, pageSize);

	const onSearchChange = useCallback(
		(value: string) => {
			if (value === search) return;
			setSearch(value);
			deleteParam();
		},
		[deleteParam, search],
	);
	const onPageChange = useCallback(
		(page: number) => updateParam(String(page)),
		[updateParam],
	);

	useEffect(() => {
		if (!dataReady || pageParam === null) return;
		if (pageParam !== String(currentPage)) {
			replacePageParam(String(currentPage));
		}
	}, [currentPage, dataReady, pageParam, replacePageParam]);

	return {
		filteredItems,
		visibleItems,
		currentPage,
		pageCount,
		onSearchChange,
		onPageChange,
	};
}
