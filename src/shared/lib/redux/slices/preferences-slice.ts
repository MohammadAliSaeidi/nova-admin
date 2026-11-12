import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ColorMode } from "../../../types/color-mode";
import type { Locale } from "../../../types/locale";

interface PreferencesState {
	locale: Locale;
	colorMode: ColorMode;
}

const initialState: PreferencesState = { locale: "fa", colorMode: "light" };

const preferencesSlice = createSlice({
	name: "preferences",
	initialState,
	reducers: {
		setLocale(state, action: PayloadAction<Locale>) {
			state.locale = action.payload;
		},

		setColorMode(state, action: PayloadAction<ColorMode>) {
			state.colorMode = action.payload;
		},
	},
});

export const { setLocale, setColorMode } = preferencesSlice.actions;

export default preferencesSlice.reducer;
