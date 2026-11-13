import { useMemo, useState } from "react";
import styled from "styled-components";
import { Input } from "./input";

const decimalRe = /^\d*\.?\d*$/;

function normalizeDecimal(value: string): string {
	return value
		.replace(/[۰-۹]/g, (digit) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(digit)))
		.replace(/[٠-٩]/g, (digit) => String("٠١٢٣٤٥٦٧٨٩".indexOf(digit)))
		.replace(/[٫,]/g, ".");
}

const Wrapper = styled.div`
	position: relative;

	input {
		padding-left: 42px;
	}
`;

const CurrencySymbol = styled.span`
	position: absolute;
	left: 12px;
	top: 50%;
	transform: translateY(-50%);
	color: ${({ theme }) => theme.colors.muted};
	pointer-events: none;
`;

interface PriceInputProps extends Omit<
	React.ComponentProps<typeof Input>,
	"value" | "onChange" | "type"
> {
	value: string;
	onValueChange: (value: string) => void;
	currency?: string; // "USD"
	locale: string;
}

export function PriceInput({
	value,
	onValueChange,
	onBlur,
	currency = "USD",
	locale,
	...rest
}: PriceInputProps) {
	const [focused, setFocused] = useState(false);

	const formatter = useMemo(
		() =>
			new Intl.NumberFormat(locale, {
				minimumFractionDigits: 2,
				maximumFractionDigits: 2,
			}),
		[locale],
	);

	const symbol = useMemo(
		() =>
			new Intl.NumberFormat(locale, { style: "currency", currency })
				.formatToParts(0)
				.find((p) => p.type === "currency")?.value ?? currency,
		[locale, currency],
	);

	const display =
		focused || value === "" || Number.isNaN(Number(value))
			? value
			: formatter.format(Number(value));

	return (
		<Wrapper>
			<CurrencySymbol aria-hidden="true">{symbol}</CurrencySymbol>
			<Input
				{...rest}
				type="text"
				inputMode="decimal"
				dir="ltr"
				autoComplete="off"
				value={display}
				onFocus={() => setFocused(true)}
				onBlur={(e) => {
					setFocused(false);
					onBlur?.(e);
				}}
				onChange={(e) => {
					const next = normalizeDecimal(e.target.value);
					if (decimalRe.test(next)) onValueChange(next);
				}}
			/>
		</Wrapper>
	);
}
