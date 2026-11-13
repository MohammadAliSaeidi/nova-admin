import type { Locale } from "../../types/locale";
import i18n from "./i18n";
import { messages, type Messages } from "./messages";

type MessageKey = keyof Messages;

export function getMessages(locale: Locale): Messages {
	const t = i18n.getFixedT(locale);

	return Object.fromEntries(
		(Object.keys(messages.en) as MessageKey[]).map((key) => [key, t(key)]),
	) as Messages;
}
