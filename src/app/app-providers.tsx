import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { useAppSelector } from "../shared/lib/redux/hooks";
import { createTheme } from "../shared/styles/theme";
import { AppRoutes } from "./app-routes";

export function AppProviders() {
	const colorMode = useAppSelector((state) => state.preferences.colorMode);
	const locale = useAppSelector((state) => state.preferences.locale);

	React.useEffect(() => {
		document.documentElement.lang = locale;
		document.documentElement.dir = locale === "fa" ? "rtl" : "ltr";
	}, [locale]);

	return (
		<ThemeProvider theme={createTheme(colorMode)}>

			<BrowserRouter>
				<AppRoutes />
			</BrowserRouter>
		</ThemeProvider>
	);
}

