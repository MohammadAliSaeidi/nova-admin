import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { messages, type Messages } from "./messages";
import type { Locale } from "../../types/locale";

type TranslationResource = Record<keyof Messages, string>;

export const resources = {
	fa: { translation: messages.fa satisfies TranslationResource },
	en: { translation: messages.en satisfies TranslationResource },
} satisfies Record<Locale, { translation: TranslationResource }>;

declare module "i18next" {
	interface CustomTypeOptions {
		defaultNS: "translation";
		resources: (typeof resources)["en"];
	}
}

void i18n.use(initReactI18next).init({
	resources,
	lng: "fa",
	fallbackLng: "fa",
	interpolation: { escapeValue: false },
});

export default i18n;
