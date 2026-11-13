import type { TextareaHTMLAttributes } from "react";
import styled from "styled-components";

export const Textarea = styled.textarea<TextareaHTMLAttributes<HTMLTextAreaElement>>`
	min-height: 120px;
	resize: vertical;
	border: 1px solid
		${({ theme, "aria-invalid": invalid }) =>
			invalid === true ? theme.colors.danger : theme.colors.border};
	border-radius: 9px;
	padding: 11px 13px;
	background: ${({ theme }) => theme.colors.background};
	color: ${({ theme }) => theme.colors.text};
`;
