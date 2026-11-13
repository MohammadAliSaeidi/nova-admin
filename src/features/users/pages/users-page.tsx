import { useMessages } from "../../../shared/data/dictionary/use-messages";

export function UsersPage() {
	const messages = useMessages();

	return (
		<section>
			<h1>{messages.users}</h1>
		</section>
	);
}
