export function getPageCount(itemCount: number, pageSize: number): number {
	if (pageSize <= 0) return 0;
	return Math.ceil(itemCount / pageSize);
}

export function clampPage(page: number, pageCount: number): number {
	if (pageCount <= 0) return 1;
	return Math.min(Math.max(Math.trunc(page), 1), pageCount);
}

export function getPageItems<T>(
	items: readonly T[],
	page: number,
	pageSize: number,
): T[] {
	if (pageSize <= 0) return [];
	const start = (Math.max(1, Math.trunc(page)) - 1) * pageSize;
	return items.slice(start, start + pageSize);
}
