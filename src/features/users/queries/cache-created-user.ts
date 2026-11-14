import type { QueryClient } from "@tanstack/react-query";
import { getUsers } from "../services/get-users";
import type { User, UserListData } from "../types/user";
import { usersQueryKey } from "../hooks/use-users";

export async function cacheCreatedUser(
	queryClient: QueryClient,
	user: User,
	isCurrentSession: () => boolean,
): Promise<void> {
	await queryClient.cancelQueries({ queryKey: usersQueryKey });
	if (!isCurrentSession()) return;

	let current = queryClient.getQueryData<UserListData>(usersQueryKey);
	if (!current?.hasBaseList) {
		try {
			const users = await getUsers();
			if (!isCurrentSession()) return;
			current = { users, hasBaseList: true };
		} catch {
			if (!isCurrentSession()) return;
			current = current ?? { users: [], hasBaseList: false };
		}
	}
	if (!isCurrentSession()) return;
	queryClient.setQueryData<UserListData>(usersQueryKey, {
		users: [user, ...current.users],
		hasBaseList: current.hasBaseList,
	});
}
