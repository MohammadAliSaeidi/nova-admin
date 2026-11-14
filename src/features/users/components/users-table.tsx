import { SharedTable } from "../../../shared/components/ui/table";
import type { Messages } from "../../../shared/data/dictionary/messages";
import type { SharedTableColumn } from "../../../shared/types/table";
import type { User } from "../types/user";

interface UsersTableProps {
	users: User[];
	messages: Messages;
	isFetching: boolean;
}

export function UsersTable({ users, messages, isFetching }: UsersTableProps) {
	const columns: SharedTableColumn<User>[] = [
		{ id: "name", header: messages.name, cell: (user) => user.fullName },
		{ id: "username", header: messages.username, cell: (user) => user.username },
		{ id: "email", header: messages.email, cell: (user) => <span dir="ltr">{user.email}</span> },
		{ id: "phone", header: messages.phone, cell: (user) => <span dir="ltr">{user.phone}</span> },
	];
	return (
		<SharedTable
			caption={messages.users}
			columns={columns}
			rows={users}
			getRowKey={(user) => user.localId}
			busy={isFetching}
		/>
	);
}
