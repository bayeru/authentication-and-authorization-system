import { authActions } from './../auth/auth-slice';
import { api } from "../../api/api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError, AxiosStatic } from "axios";
import { stat } from "fs";
import { store } from "../../store/store";

const API_URL = "http://localhost:8000/api";

type UserState = {
	userDetails: { id:string, name:string, email: string; createdAt: string | undefined } | null;
	loading: boolean;
	error: string | null;
	message: string | null;
};

const initialState: UserState = {
	userDetails: null,
	loading: false,
	error: null,
	message: null
};

export const deleteUser = createAsyncThunk(
	"user/deleteUser",
	async (token: string, thunkAPI) => {
		try {
			const { data } = await api.deleteUser(token);
			return data;
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

export const getUserDetails = createAsyncThunk(
	"user/getUserDetails",
	async (token: string, thunkAPI) => {
		try {
			const result = await api.getUserDetails(token);
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

export const updateUserDetails = createAsyncThunk(
	"user/updateUserDetails",
	async (userDetails: any, thunkAPI) => {
		try {
			const result = await api.updateUserDetails(userDetails);
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

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		resetState: (state) => {
			state.userDetails = null;
			state.loading = false;
			state.error = null;
			state.message = null;
		},
		clearError: (state) => {
			state.error = null;
		},
		clearMessage: (state) => {
			state.message = null;
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(getUserDetails.pending, (state, action) => {
				state.loading = true;
			})
			.addCase(getUserDetails.fulfilled, (state, action) => {
				state.userDetails = action.payload;
				state.loading = false;
				state.error = null;
				state.message = null;
			})
			.addCase(getUserDetails.rejected, (state, action) => {
				state.userDetails = null;
				state.loading = false;
				state.error = action.payload as string;
				state.message = null;
			})
			.addCase(updateUserDetails.pending, (state, action) => {
				state.loading = true;
			})
			.addCase(updateUserDetails.fulfilled, (state, action) => {
				state.userDetails = action.payload;
				state.loading = false;
				state.error = null;
				state.message = "User details updated successfully";
			})
			.addCase(updateUserDetails.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			})
			.addCase(deleteUser.pending, (state, action) => {
				state.loading = true;
			})
			.addCase(deleteUser.fulfilled, (state, action) => {
				state.userDetails = null;
				state.loading = false;
				state.error = null;
				state.message = action.payload as string;
				//store.dispatch(authActions.logout());
			})
			.addCase(deleteUser.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;				
			})
			.addCase(authActions.logout, (state, action) => {
				state.userDetails = null;
				state.loading = false;
				state.error = null;
				state.message = null;
			});
	},
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
