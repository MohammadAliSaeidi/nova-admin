import * as yup from "yup";
import { getMessages } from "../../../shared/data/internationalization/messages";
import type { Locale } from "../../../shared/types/locale";

export function loginSchema(locale: Locale) {
	const messages = getMessages(locale);
	return yup.object({
		username: yup.string().trim().required(messages.usernameRequired),
		password: yup.string().required(messages.passwordRequired),
	});
}
