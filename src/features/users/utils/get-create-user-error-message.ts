import { getMessages } from "../../../shared/data/dictionary/get-messages";
import { ApiError, type ApiErrorKind } from "../../../shared/types/api-error";
import type { Locale } from "../../../shared/types/locale";

const messageKeyByKind = {
	network: "createUserNetworkError",
	unauthorized: "createUserUnauthorizedError",
	forbidden: "createUserForbiddenError",
	conflict: "createUserConflictError",
	validation: "createUserValidationError",
	server: "createUserServerError",
	unknown: "createUserUnknownError",
} as const satisfies Record<ApiErrorKind, keyof ReturnType<typeof getMessages>>;

export function getCreateUserErrorMessage(
	error: unknown,
	locale: Locale,
): string {
	const messages = getMessages(locale);
	const kind = error instanceof ApiError ? error.kind : "unknown";
	return messages[messageKeyByKind[kind]];
}
