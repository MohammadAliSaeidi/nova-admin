import {
	ApiError,
	type ApiErrorKind,
} from "../../../shared/types/api-error";
import { getMessages } from "../../../shared/data/internationalization/messages";
import type { Locale } from "../../../shared/types/locale";

const messageKeyByErrorKind = {
	network: "loginNetworkError",
	unauthorized: "loginInvalidCredentials",
	validation: "loginInvalidCredentials",
	server: "loginServerError",
	unknown: "loginUnknownError",
} as const satisfies Record<
	ApiErrorKind,
	keyof ReturnType<typeof getMessages>
>;

export function getLoginErrorMessage(error: unknown, locale: Locale): string {
	const errorKind = error instanceof ApiError ? error.kind : "unknown";
	return getMessages(locale)[messageKeyByErrorKind[errorKind]];
}
