import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
	token: string | null;
	sessionGeneration: number;
}

const initialState: AuthState = { token: null, sessionGeneration: 0 };

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setToken(state, action: PayloadAction<string>) {
			state.token = action.payload;
			state.sessionGeneration += 1;
		},

		clearToken(state) {
			state.token = null;
			state.sessionGeneration += 1;
		},
	},
});

export const { setToken, clearToken } = authSlice.actions;

export default authSlice.reducer;
