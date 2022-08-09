import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

type AuthState = {

	user: null;
	loading: boolean;
	error: null;
	token: null;

};

const initialState:AuthState = {

	user: null,
	loading: false,
	error: null,
	token: null

};

export const authSlice = createSlice({

	name: "auth",
	initialState,
	reducers: {
		setError: (state, action) => {

			state.error = action.payload;

		}
	},
	extraReducers: {
		// [signup.pending]: (state, action) => {
			
		// 	state.loading = true;
		// 	state.error = null;

		// },
		// [signup.fulfilled]: (state, action) => {

		// 	state.loading = false;
		// 	state.error = null;
		// 	state.token = action.payload;

		// },
		// [signup.rejected]: (state, action) => {

		// 	state.loading = false;
		// 	state.error = action.payload;

		// },
		// [login.pending]: (state, action) => {
			
		// 	state.loading = true;
		// 	state.error = null;

		// },
		// [login.fulfilled]: (state, action) => {,

		// 	state.loading = false;
		// 	state.error = null;
		// 	state.token = action.payload;

		// }
	}
});


export default authSlice.reducer;
