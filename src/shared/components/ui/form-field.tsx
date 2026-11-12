import type { ReactNode } from "react";
import styled from "styled-components";

const FieldRoot = styled.div`
	display: grid;
	gap: 7px;
`;

const Label = styled.label`
	font-weight: 700;
`;

const ErrorText = styled.p`
	margin: 0;
	color: ${({ theme }) => theme.colors.danger};
	font-size: 14px;
`;

interface FormFieldProps {
	id: string;
	label: string;
	error?: string;
	children: ReactNode;
}

export function FormField({ id, label, error, children }: FormFieldProps) {
	return (
		<FieldRoot>
			<Label htmlFor={id}>{label}</Label>
			{children}
			{error && <ErrorText id={`${id}-error`}>{error}</ErrorText>}
		</FieldRoot>
	);
}
