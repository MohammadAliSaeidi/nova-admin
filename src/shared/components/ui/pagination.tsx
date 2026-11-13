import styled from "styled-components";

const PaginationNav = styled.nav`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-wrap: wrap;
	gap: 8px;
	margin-block: 16px;
`;

const PageButton = styled.button<{ $active?: boolean }>`
	min-width: 40px;
	height: 40px;
	border: 1px solid ${({ theme }) => theme.colors.border};
	border-radius: 10px;
	background: ${({ theme, $active }) =>
		$active ? theme.colors.sidebar : "transparent"};
	color: ${({ theme, $active }) =>
		$active ? theme.colors.sidebarText : theme.colors.text};
	font: inherit;
	cursor: pointer;

	&:focus-visible {
		outline: 2px solid ${({ theme }) => theme.colors.accent};
		outline-offset: 2px;
	}

	&:disabled {
		cursor: not-allowed;
		opacity: 0.55;
	}
`;

const PageSummary = styled.span`
	position: absolute;
	width: 1px;
	height: 1px;
	padding: 0;
	margin: -1px;
	overflow: hidden;
	clip: rect(0, 0, 0, 0);
	white-space: nowrap;
	border: 0;
`;

export interface PaginationProps {
	currentPage: number;
	pageCount: number;
	locale: string;
	direction: "ltr" | "rtl";
	label: string;
	previousLabel: string;
	nextLabel: string;
	pageSummary: (current: string, total: string) => string;
	onPageChange: (page: number) => void;
}

export function Pagination({
	currentPage,
	pageCount,
	locale,
	direction,
	label,
	previousLabel,
	nextLabel,
	pageSummary,
	onPageChange,
}: PaginationProps) {
	if (pageCount <= 1) return null;

	const format = (value: number) => new Intl.NumberFormat(locale).format(value);
	const previous = direction === "rtl" ? "›" : "‹";
	const next = direction === "rtl" ? "‹" : "›";

	return (
		<PaginationNav aria-label={label}>
			<PageButton
				type="button"
				disabled={currentPage <= 1}
				aria-label={previousLabel}
				onClick={() => onPageChange(currentPage - 1)}
			>
				{previous}
			</PageButton>
			{Array.from({ length: pageCount }, (_, index) => index + 1).map(
				(page) => (
					<PageButton
						key={page}
						$active={page === currentPage}
						aria-current={page === currentPage ? "page" : undefined}
						type="button"
						onClick={() => onPageChange(page)}
					>
						{format(page)}
					</PageButton>
				),
			)}
			<PageButton
				type="button"
				disabled={currentPage >= pageCount}
				aria-label={nextLabel}
				onClick={() => onPageChange(currentPage + 1)}
			>
				{next}
			</PageButton>
			<PageSummary aria-live="polite">
				{pageSummary(format(currentPage), format(pageCount))}
			</PageSummary>
		</PaginationNav>
	);
}
