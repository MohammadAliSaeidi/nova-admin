import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { useAppStore } from "../../../shared/lib/redux/hooks";
import { cacheCreatedUser } from "../queries/cache-created-user";
import { createUser } from "../services/create-user";
import type { CreateUserValues } from "../types/create-user-values";

export function useCreateUser() {
	const reduxStore = useAppStore();
	const queryClient = useQueryClient();
	const valuesRef = useRef<CreateUserValues | null>(null);
	const generationRef = useRef<number>(-1);
	const mutation = useMutation({
		mutationFn: async () => {
			if (!valuesRef.current) throw new Error("Missing user form values");
			return createUser(valuesRef.current);
		},
		retry: false,
		onSuccess: (user) => {
			const generation = generationRef.current;
			return cacheCreatedUser(queryClient, user, () => {
				const auth = reduxStore.getState().auth;
				return auth.token !== null && auth.sessionGeneration === generation;
			});
		},
	});

	async function submitUser(values: CreateUserValues): Promise<boolean> {
		const startAuth = reduxStore.getState().auth;
		if (!startAuth.token) return false;
		generationRef.current = startAuth.sessionGeneration;
		valuesRef.current = values;
		try {
			await mutation.mutateAsync();
			const currentAuth = reduxStore.getState().auth;
			return currentAuth.token !== null &&
				currentAuth.sessionGeneration === startAuth.sessionGeneration;
		} finally {
			valuesRef.current = null;
		}
	}

	return { submitUser, isPending: mutation.isPending };
}
