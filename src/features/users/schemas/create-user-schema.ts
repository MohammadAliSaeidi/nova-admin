import * as yup from "yup";
import { getMessages } from "../../../shared/data/dictionary/get-messages";
import type { Locale } from "../../../shared/types/locale";
import type { CreateUserValues } from "../types/create-user-values";

export function createUserSchema(locale: Locale) {
	const messages = getMessages(locale);
	return yup.object({
		firstName: yup.string().trim().required(messages.userFirstNameRequired),
		lastName: yup.string().trim().required(messages.userLastNameRequired),
		username: yup.string().trim().required(messages.userUsernameRequired),
		email: yup
			.string()
			.trim()
			.required(messages.userEmailRequired)
			.email(messages.userEmailInvalid),
		password: yup.string().required(messages.userPasswordRequired),
		phone: yup
			.string()
			.trim()
			.required(messages.userPhoneRequired)
			.test("phone", messages.userPhoneInvalid, (value) => {
				if (!value || !/^[+\d().\-\s]+$/.test(value)) return false;
				const digits = value.replace(/\D/g, "");
				return digits.length >= 7 && digits.length <= 15;
			}),
	}) satisfies yup.ObjectSchema<CreateUserValues>;
}
