import styled from "styled-components";

export const Card = styled.section`
	border: 1px solid ${({ theme }) => theme.colors.border};
	border-radius: 16px;
	padding: 24px;
	background: ${({ theme }) => theme.colors.surface};
	box-shadow: 0 12px 32px rgb(25 36 60 / 8%);
`;
