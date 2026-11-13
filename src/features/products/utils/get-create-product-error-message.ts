import { getMessages } from "../../../shared/data/dictionary/get-messages";
import { ApiError } from "../../../shared/types/api-error";
import type { Locale } from "../../../shared/types/locale";

export function getCreateProductErrorMessage(error: unknown, locale: Locale) {
	const messages = getMessages(locale);
	if (!(error instanceof ApiError)) return messages.createProductUnknownError;

	switch (error.kind) {
		case "network":
			return messages.createProductNetworkError;
		case "unauthorized":
			return messages.createProductUnauthorizedError;
		case "forbidden":
			return messages.createProductForbiddenError;
		case "conflict":
			return messages.createProductConflictError;
		case "validation":
			return messages.createProductValidationError;
		case "server":
			return messages.createProductServerError;
		default:
			return messages.createProductUnknownError;
	}
}
