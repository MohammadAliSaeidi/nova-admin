import styled, { keyframes } from "styled-components";

export type LoadingVariant = "accent" | "muted" | "text" | "onAccent";

interface LoadingProps {
	variant?: LoadingVariant;
	size?: number;
	label: string;
}

interface SpinnerProps {
	$variant: LoadingVariant;
	$size: number;
}

const rotation = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const variantColors = {
	accent: "accent",
	muted: "muted",
	text: "text",
	onAccent: "text",
} as const;

const Spinner = styled.span<SpinnerProps>`
	display: inline-block;
	box-sizing: border-box;
	width: ${({ $size }) => $size}px;
	height: ${({ $size }) => $size}px;
	border: 3px solid
		${({ theme, $variant }) => theme.colors[variantColors[$variant]]};
	border-bottom-color: transparent;
	border-radius: 50%;
	animation: ${rotation} 0.8s linear infinite;
`;

function Loading({ variant = "accent", size = 24, label }: LoadingProps) {
	return (
		<Spinner
			$variant={variant}
			$size={size}
			role="status"
			aria-label={label}
		/>
	);
}

export default Loading;
