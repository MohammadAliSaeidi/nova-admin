export type ApiErrorKind =
	| "network"
	| "unauthorized"
	| "forbidden"
	| "conflict"
	| "validation"
	| "server"
	| "unknown";

export class ApiError extends Error {
	readonly kind: ApiErrorKind;
	readonly status?: number;
	constructor(
		message: string,
		kind: ApiErrorKind,
		status?: number,
	) {
		super(message);

		this.name = "ApiError";
		this.kind = kind;
		this.status = status;
	}
}
