import type { ColorMode } from "../types/color-mode";

const lightColors = {
	background: "#fffaf5",
	surface: "#ffffff",
	text: "#19243c",
	muted: "#586477",
	border: "#dce1e8",
	accent: "#f97316",
	sidebar: "#19243c",
	sidebarText: "#ffffff",
	sidebarActive: "#33435e",
};

const darkColors = {
	background: "#101827",
	surface: "#19243c",
	text: "#f4f6fa",
	muted: "#b6c0cf",
	border: "#3b4960",
	accent: "#fb923c",
	sidebar: "#0c1220",
	sidebarText: "#f4f6fa",
	sidebarActive: "#33435e",
};

export interface AppTheme {
	colors: typeof lightColors;
}

const lightTheme: AppTheme = { colors: lightColors };

const darkTheme: AppTheme = {
	colors: darkColors,
};

export function createTheme(colorMode: ColorMode): AppTheme {
	return colorMode === "dark" ? darkTheme : lightTheme;
}
