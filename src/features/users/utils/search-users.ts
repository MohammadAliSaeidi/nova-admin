import type { User } from "../types/user";

export function searchUsers(
	users: readonly User[],
	query: string,
): readonly User[] {
	const normalizedQuery = query.trim().toLocaleLowerCase();
	if (!normalizedQuery) return users;
	return users.filter(({ fullName, username, email, phone }) =>
		`${fullName} ${username} ${email} ${phone}`
			.toLocaleLowerCase()
			.includes(normalizedQuery),
	);
}
