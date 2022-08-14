import { api } from "../../api/api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError, AxiosStatic } from "axios";
import { stat } from "fs";

const API_URL = "http://localhost:8000/api";

type AuthState = {
	authUser: null | { email: string; name: string, token: string, verified: boolean };
	loading: boolean;
	error: string | null;
};

const initialState: AuthState = {
	authUser: JSON.parse(localStorage.getItem("user") as string),
	loading: false,
	error: null
};

export const login = createAsyncThunk(
	"auth/login",
	async (authUser: any, thunkAPI) => {
		try {
			const result = await api.login(authUser);
			localStorage.setItem("user", JSON.stringify(result));
			return result;
		} catch (err) {
			const axiosError = err as AxiosError;
			let message = "";
			
			if (axiosError.response && axiosError.response.data) {
				message = (axiosError.response.data as { message: string }).message;
			} else {
				message = (err as Error).message;
			}

			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const signup = createAsyncThunk(
	"auth/signup",
	async (authUser: any, thunkAPI) => {
		try {
			const result = await api.signup(authUser);
			return result;
		} catch (err) {
			const axiosError = err as AxiosError;
			let message = "";
			
			if (axiosError.response && axiosError.response.data) {
				message = (axiosError.response.data as { message: string }).message;
			} else {
				message = (err as Error).message;
			}

			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const verify = createAsyncThunk(
	"auth/verify",
	async (token: string, thunkAPI) => {
		try {
			const result = await api.verify(token);
			return result;
		} catch (err) {
			const axiosError = err as AxiosError;
			let message = "";
			
			if (axiosError.response && axiosError.response.data) {
				message = (axiosError.response.data as { message: string }).message;
			} else {
				message = (err as Error).message;
			}

			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		resetState: (state) => {
			state.authUser = null;
			state.loading = false;
			state.error = null;
		},
		clearErrors: (state) => {
			state.error = null;
		},
		logout: (state) => {
			state.authUser = null;	
			state.loading = false;
			state.error = null;
			localStorage.removeItem("user");
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(login.pending, (state, action) => {
				state.loading = true;
			})
			.addCase(login.fulfilled, (state, action) => {
				state.authUser = action.payload;
				state.loading = false;
				state.error = null;
			})
			.addCase(login.rejected, (state, action) => {
				state.authUser = null;
				state.loading = false;
				state.error = action.payload as string;
			})
			.addCase(signup.pending, (state, action) => {
				state.loading = true;
			})
			.addCase(signup.fulfilled, (state, action) => {
				state.authUser = action.payload;
				state.loading = false;
				state.error = null;
			})
			.addCase(signup.rejected, (state, action) => {
				state.authUser = null;
				state.loading = false;
				state.error = action.payload as string;
			})
			.addCase(verify.pending, (state, action) => {
				state.loading = true;
			})
			.addCase(verify.fulfilled, (state, action) => {
				state.authUser = action.payload;
				state.loading = false;
				state.error = null;
			})
			.addCase(verify.rejected, (state, action) => {
				state.authUser = null;
				state.loading = false;
				state.error = action.payload as string;
			});

	},
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
