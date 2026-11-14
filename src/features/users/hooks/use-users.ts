import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../services/get-users";
import type { UserListData } from "../types/user";

export const usersQueryKey = ["users", "all"] as const;

export function useUsers() {
	return useQuery({
		queryKey: usersQueryKey,
		queryFn: async ({ signal }): Promise<UserListData> => ({
			users: await getUsers(signal),
			hasBaseList: true,
		}),
		staleTime: 30_000,
	});
}
