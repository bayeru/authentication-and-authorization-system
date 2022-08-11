import { api } from "../../api/api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { stat } from "fs";

const API_URL = "http://localhost:8000/api";

type AuthState = {
	user: null | { email: string; name: string, token: string };
	loading: boolean;
	error: string | null;
};

const initialState: AuthState = {
	user: JSON.parse(localStorage.getItem("user") as string),
	loading: false,
	error: null
};

export const login = createAsyncThunk(
	"auth/login",
	async (user: any, thunkAPI) => {
		try {
			const result = await api.login(user);
			localStorage.setItem("user", JSON.stringify(result));
			return result;
		} catch (err) {			
			return thunkAPI.rejectWithValue((err as Error).message);
		}
	}
);

export const signup = createAsyncThunk(
	"auth/signup",
	async (user: any, thunkAPI) => {
		try {
			const result = await api.signup(user);
			return result;
		} catch (err) {
			return thunkAPI.rejectWithValue((err as Error).message);
		}
	}
);

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		clearErrors: (state) => {
			state.error = null;
		},
		logout: (state) => {
			state.user = null;	
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
				state.user = action.payload;
				state.loading = false;
				state.error = null;
			})
			.addCase(login.rejected, (state, action) => {
				state.user = null;
				state.loading = false;
				state.error = action.payload as string;
			})
			.addCase(signup.pending, (state, action) => {
				state.loading = true;
			})
			.addCase(signup.fulfilled, (state, action) => {
				state.user = action.payload;
				state.loading = false;
				state.error = null;
			})
			.addCase(signup.rejected, (state, action) => {
				state.user = null;
				state.loading = false;
				state.error = action.payload as string;
			});

	},
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
