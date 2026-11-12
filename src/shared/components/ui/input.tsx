import type { InputHTMLAttributes } from "react";
import styled from "styled-components";

export const Input = styled.input<InputHTMLAttributes<HTMLInputElement>>`
	border: 1px solid
		${({ theme, "aria-invalid": invalid }) =>
			invalid === true ? theme.colors.danger : theme.colors.border};
	border-radius: 9px;
	padding: 11px 13px;
	background: ${({ theme }) => theme.colors.background};
	color: ${({ theme }) => theme.colors.text};
`;
