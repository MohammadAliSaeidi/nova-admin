import styled from "styled-components";

export const Heading = styled.h1`
	margin: 0 0 8px;
	font-size: 28px;
`;

export const Description = styled.p`
	margin: 0 0 24px;
	color: ${({ theme }) => theme.colors.muted};
`;

export const Form = styled.form`
	display: grid;
	gap: 18px;
	max-width: 720px;
`;

export const Fields = styled.fieldset`
	display: grid;
	gap: 18px;
	min-width: 0;
	margin: 0;
	padding: 0;
	border: 0;
`;

export const Notice = styled.p`
	margin: 0;
	color: ${({ theme }) => theme.colors.danger};
`;

export const Status = styled.p`
	margin: 0;
	color: ${({ theme }) => theme.colors.muted};
`;

export const Actions = styled.div`
	display: flex;
	gap: 12px;
`;
