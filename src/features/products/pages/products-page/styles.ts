import styled from "styled-components";

export const Status = styled.p`
	display: flex;
	align-items: center;
	gap: 8px;
	color: ${({ theme }) => theme.colors.muted};
`;
