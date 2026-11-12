import { getMessages } from "../../../shared/data/internationalization/messages";
import { useAppSelector } from "../../../shared/lib/redux/hooks";

export function UsersPage() {
	const locale = useAppSelector((state) => state.preferences.locale);
	const messages = getMessages(locale);

	return (
		<section>
			<h1>{messages.users}</h1>
		</section>
	);
}
