import type { ButtonHTMLAttributes } from "react";
import styled from "styled-components";

type ButtonVariant = "primary" | "outline";

const ButtonRoot = styled.button<{ $variant: ButtonVariant }>`
	display: inline-flex;
	align-items: center;
	justify-content: center;
	gap: 8px;
	border: 1px solid
		${({ theme, $variant }) =>
			$variant === "primary" ? theme.colors.accent : theme.colors.border};
	border-radius: 10px;
	padding: 11px 15px;
	background: ${({ theme, $variant }) =>
		$variant === "primary" ? theme.colors.accent : "transparent"};
	color: ${({ theme, $variant }) =>
		$variant === "primary" ? "#ffffff" : theme.colors.text};
	font-weight: 700;
	cursor: pointer;

	&:disabled {
		cursor: not-allowed;
		opacity: 0.65;
	}
`;

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: ButtonVariant;
}

export function Button({ variant = "primary", ...props }: ButtonProps) {
	return <ButtonRoot $variant={variant} {...props} />;
}
