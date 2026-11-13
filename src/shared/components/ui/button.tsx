import type { ButtonHTMLAttributes } from "react";
import { Link, type LinkProps } from "react-router-dom";
import styled, { css } from "styled-components";

type ButtonVariant = "primary" | "outline";

interface VariantProps {
	$variant: ButtonVariant;
}

const baseButton = css<VariantProps>`
	display: inline-flex;
	align-items: center;
	justify-content: center;
	gap: 8px;
	border: 1px solid
		${({ theme, $variant }) =>
			$variant === "primary"
				? theme.colors.accent
				: theme.colors.border};
	border-radius: 10px;
	padding: 0.4375rem 0.5rem;
	background: ${({ theme, $variant }) =>
		$variant === "primary" ? theme.colors.accent : "transparent"};
	color: ${({ theme, $variant }) =>
		$variant === "primary" ? "#ffffff" : theme.colors.text};
	font-weight: 700;
	cursor: pointer;
	text-decoration: none;

	&:disabled {
		cursor: not-allowed;
		opacity: 0.65;
	}
`;

const ButtonRoot = styled.button<VariantProps>`
	${baseButton}
`;

const ButtonLinkRoot = styled(Link)<VariantProps>`
	${baseButton}
`;

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: ButtonVariant;
}

export function Button({ variant = "primary", ...props }: ButtonProps) {
	return <ButtonRoot $variant={variant} {...props} />;
}

type LinkButtonProps = LinkProps & {
	variant?: ButtonVariant;
};

export function LinkButton({ variant = "primary", ...props }: LinkButtonProps) {
	return <ButtonLinkRoot $variant={variant} {...props} />;
}
