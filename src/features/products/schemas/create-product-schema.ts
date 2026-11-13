import * as yup from "yup";
import { getMessages } from "../../../shared/data/dictionary/messages";
import type { Locale } from "../../../shared/types/locale";
import type { CreateProductValues } from "../types/create-product-values";

export function createProductSchema(locale: Locale) {
	const messages = getMessages(locale);

	return yup.object({
		title: yup.string().trim().required(messages.productTitleRequired),
		description: yup
			.string()
			.trim()
			.required(messages.productDescriptionRequired),
		price: yup
			.string()
			.required(messages.productPriceRequired)
			.test(
				"finite-price",
				messages.productPriceInvalid,
				(value) =>
					typeof value === "string" &&
					value.trim().length > 0 &&
					Number.isFinite(Number(value)),
			)
			.test(
				"positive-price",
				messages.productPricePositive,
				(value) => Number(value) > 0,
			),
		category: yup.string().required(messages.productCategoryRequired),
		imageUrl: yup
			.string()
			.trim()
			.required(messages.productImageUrlRequired)
			.test("http-url", messages.productImageUrlInvalid, (value) => {
				if (!value) return false;

				try {
					const url = new URL(value);
					return (
						(url.protocol === "http:" || url.protocol === "https:") &&
						url.hostname.length > 0
					);
				} catch {
					return false;
				}
			}),
	}) satisfies yup.ObjectSchema<CreateProductValues>;
}
