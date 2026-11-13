import { Suspense, type ReactNode } from "react";
import styled from "styled-components";
import Loading from "./ui/loading/loading";

const LoadingWrapper = styled.div`
	height: 100%;
	width: 100%;
	display: flex;
	flex: 1;
	flex-shrink: 0;
	justify-content: center;
	align-items: center;
`;

type PageSuspenseProps = {
	children: ReactNode;
	label?: string;
	className?: string;
	fallback?: ReactNode;
};

export const SuspenseWrapper = ({
	children,
	label = "Loading...",
	className,
	fallback,
}: PageSuspenseProps) => {
	return (
		<Suspense
			fallback={
				fallback ?? (
					<LoadingWrapper className={className}>
						<Loading variant="accent" label={label} />
					</LoadingWrapper>
				)
			}
		>
			{children}
		</Suspense>
	);
};
