import { useEffect, useState } from "react";
import styled from "styled-components";
import { Input } from "./input";
import { useDebounce } from "../../hooks/use-debounce";

const SearchRow = styled.div`
	display: flex;
	align-items: center;
	gap: 1rem;

	input {
		width: min(100%, 420px);
		margin-block: 12px;
	}
`;

interface DebouncedSearchInputProps {
	id: string;
	label: string;
	onChange: (value: string) => void;
}

export function DebouncedSearchInput({
	id,
	label,
	onChange,
}: DebouncedSearchInputProps) {
	const [inputValue, setInputValue] = useState("");
	const debouncedValue = useDebounce(inputValue);

	useEffect(() => onChange(debouncedValue), [debouncedValue, onChange]);

	return (
		<SearchRow>
			<label htmlFor={id}>{label}</label>
			<Input
				id={id}
				type="search"
				value={inputValue}
				onChange={(event) => setInputValue(event.target.value)}
			/>
		</SearchRow>
	);
}
