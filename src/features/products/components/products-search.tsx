import { useEffect, useState } from "react";
import styled from "styled-components";
import { Input } from "../../../shared/components/ui/input";
import { useDebounce } from "../../../shared/hooks/use-debounce";

const SearchInput = styled(Input)`
	width: min(100%, 420px);
	margin: 20px 0;
`;

interface ProductsSearchProps {
	label: string;
	onChange: (value: string) => void;
}

const Container = styled.div`
	display: flex;
	align-items: center;
	gap: 1rem;
`;

export function ProductsSearch(props: ProductsSearchProps) {
	const { label, onChange } = props;
	const [inputValue, setInputValue] = useState("");
	const debouncedValue = useDebounce(inputValue);

	useEffect(() => onChange(debouncedValue), [debouncedValue, onChange]);

	return (
		<Container>
			<label htmlFor="products-search">{label}</label>
			<SearchInput
				id="products-search"
				type="search"
				value={inputValue}
				onChange={(event) => setInputValue(event.target.value)}
			/>
		</Container>
	);
}
