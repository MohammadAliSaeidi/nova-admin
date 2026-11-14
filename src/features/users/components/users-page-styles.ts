import styled from "styled-components";

export const PageContent = styled.section`
	height: 100%;
	min-height: 0;
	display: flex;
	flex-direction: column;
`;

export const PageHeading = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 16px;
	margin-block: 22px 8px;

	h1 {
		margin: 0;
	}
`;

export const Results = styled.div`
	flex: 1;
	min-height: 0;
	overflow: auto;
`;

export const Status = styled.p`
	display: flex;
	align-items: center;
	gap: 8px;
	color: ${({ theme }) => theme.colors.muted};
`;
