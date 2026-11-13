import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAppStore } from "../../../shared/lib/redux/hooks";
import { cacheCreatedProduct } from "../queries/cache-created-product";
import { createProduct } from "../services/create-product";
import type { CreateProductValues } from "../types/create-product-values";

interface MutationVariables {
	values: CreateProductValues;
	sessionGeneration: number;
}

export function useCreateProduct() {
	const reduxStore = useAppStore();
	const queryClient = useQueryClient();
	const mutation = useMutation({
		mutationFn: ({ values }: MutationVariables) => createProduct(values),
		retry: false,
		onSuccess: (product, variables) =>
			cacheCreatedProduct(queryClient, product, () => {
				const auth = reduxStore.getState().auth;
				return (
					auth.token !== null &&
					auth.sessionGeneration === variables.sessionGeneration
				);
			}),
	});

	async function submitProduct(values: CreateProductValues): Promise<boolean> {
		const startAuth = reduxStore.getState().auth;
		if (!startAuth.token) return false;

		await mutation.mutateAsync({
			values,
			sessionGeneration: startAuth.sessionGeneration,
		});

		const currentAuth = reduxStore.getState().auth;
		return (
			currentAuth.token !== null &&
			currentAuth.sessionGeneration === startAuth.sessionGeneration
		);
	}

	return {
		submitProduct,
		isPending: mutation.isPending,
	};
}
