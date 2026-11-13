import { useMemo } from "react";
import styled from "styled-components";
import { useCaretRestore } from "../../hooks/use-carret-restore";
import {
	groupDraft,
	isValidDraft,
	normalizeDecimal,
} from "../../lib/utils/decimal";
import { Input } from "./input";

const Wrapper = styled.div`
	position: relative;
	display: flex;
	align-items: center;
`;

const CurrencySymbol = styled.span`
	position: absolute;
	inset-inline-start: 12px;
	color: ${({ theme }) => theme.colors.muted};
	pointer-events: none;
`;

const PriceField = styled(Input)`
	width: 100%;
	padding-inline-start: calc(12px + var(--symbol-width, 1ch) + 8px);
`;

interface PriceInputProps extends Omit<
	React.ComponentProps<typeof Input>,
	"value" | "onChange" | "type"
> {
	value: string;
	onValueChange: (value: string) => void;
	currency?: string;
	locale: string;
}

export function PriceInput({
	value,
	onValueChange,
	currency = "USD",
	locale,
	...rest
}: PriceInputProps) {
	const symbol = useMemo(
		() =>
			new Intl.NumberFormat(locale, { style: "currency", currency })
				.formatToParts(0)
				.find((p) => p.type === "currency")?.value ?? currency,
		[locale, currency],
	);

	const display = groupDraft(value);
	const { ref, capture } = useCaretRestore(display);

	return (
		<Wrapper>
			<CurrencySymbol aria-hidden="true">{symbol}</CurrencySymbol>
			<PriceField
				{...rest}
				ref={ref}
				style={
					{
						"--symbol-width": `${symbol.length}ch`,
					} as React.CSSProperties
				}
				type="text"
				inputMode="decimal"
				dir="ltr"
				autoComplete="off"
				value={display}
				onChange={(e) => {
					const next = normalizeDecimal(e.target.value);
					if (!isValidDraft(next)) return;
					capture(e.target);
					onValueChange(next);
				}}
			/>
		</Wrapper>
	);
}
