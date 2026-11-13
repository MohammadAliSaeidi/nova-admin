import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";

type Options = {
	method?: "push" | "replace";
};

export const useSearchParam = (key: string, options: Options = {}) => {
	const { method = "push" } = options;

	const [searchParams, setSearchParams] = useSearchParams();
	const value = searchParams.get(key);

	const updateParam = useCallback(
		(newValue: string) => {
			setSearchParams(
				(prev) => {
					const params = new URLSearchParams(prev);
					params.set(key, newValue);
					return params;
				},
				{ replace: method === "replace" },
			);
		},
		[key, method, setSearchParams],
	);

	const deleteParam = useCallback(() => {
		setSearchParams(
			(prev) => {
				const params = new URLSearchParams(prev);
				params.delete(key);
				return params;
			},
			{ replace: method === "replace" },
		);
	}, [key, method, setSearchParams]);

	return { value, updateParam, deleteParam };
};
