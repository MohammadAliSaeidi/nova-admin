import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { messages, type Messages } from "./messages";

type MessageKey = keyof Messages;

export function useMessages(): Messages {
	const { t } = useTranslation();

	return useMemo(
		() =>
			Object.fromEntries(
				(Object.keys(messages.en) as MessageKey[]).map((key) => [
					key,
					t(key),
				]),
			) as Messages,
		[t],
	);
}
