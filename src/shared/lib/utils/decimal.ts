const PERSIAN = "۰۱۲۳۴۵۶۷۸۹";
const ARABIC = "٠١٢٣٤٥٦٧٨٩";

export const MAX_DECIMALS = 2;

export function normalizeDecimal(value: string): string {
	return value
		.replace(/[۰-۹]/g, (d) => String(PERSIAN.indexOf(d)))
		.replace(/[٠-٩]/g, (d) => String(ARABIC.indexOf(d)))
		.replace(/[٫]/g, ".")
		.replace(/[,٬،\s]/g, "");
}

const draftRe = new RegExp(`^\\d*\\.?\\d{0,${MAX_DECIMALS}}$`);

export function isValidDraft(value: string): boolean {
	return draftRe.test(value);
}

export function hasAtMostTwoDecimalPlaces(value: string): boolean {
	return isValidDraft(value);
}

export function groupDraft(raw: string, groupSeparator = ","): string {
	const [int = "", frac] = raw.split(".");
	const grouped = int.replace(/\B(?=(\d{3})+(?!\d))/g, groupSeparator);
	return frac === undefined ? grouped : `${grouped}.${frac}`;
}
