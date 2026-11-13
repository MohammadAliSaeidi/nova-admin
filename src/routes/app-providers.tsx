import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import i18n from "../shared/data/dictionary/i18n";
import { useAppSelector } from "../shared/lib/redux/hooks";
import { GlobalStyles } from "../shared/styles/global-styles";
import { AppRoutes } from "./app-routes";
import { createTheme } from "../shared/styles/theme";

export function AppProviders() {
	const colorMode = useAppSelector((state) => state.preferences.colorMode);
	const locale = useAppSelector((state) => state.preferences.locale);

	React.useEffect(() => {
		document.documentElement.lang = locale;
		document.documentElement.dir = locale === "fa" ? "rtl" : "ltr";
		void i18n.changeLanguage(locale);
	}, [locale]);

	return (
		<ThemeProvider theme={createTheme(colorMode)}>
			<GlobalStyles />
			<BrowserRouter>
				<AppRoutes />
			</BrowserRouter>
		</ThemeProvider>
	);
}

