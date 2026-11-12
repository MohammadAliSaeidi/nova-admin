import { getMessages } from "../../../shared/data/internationalization/messages";
import { useAppSelector } from "../../../shared/lib/redux/hooks";

export function ProductsPage() {
	const locale = useAppSelector((state) => state.preferences.locale);
	const messages = getMessages(locale);

	return (
		<section>
			<h1>{messages.products}</h1>
		</section>
	);
}
