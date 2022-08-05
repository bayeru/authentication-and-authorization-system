import { Response } from 'express';
import axios, { AxiosError } from "axios";

const API_URL = "http://localhost:8000/api";

export const signup = async (user: any) => {
	try {
		const response = await axios.post(`${API_URL}/user/signup`, user);
		return response.data;
	} catch (err) {
		console.log(err);
	}
};

export const login = async (user: any) => {

	try {
		const response = await axios.post(`${API_URL}/auth/login`, user);

	} catch (err) {
		const axiosErr = err as AxiosError;
		
		if (axiosErr.response) {

			if (axiosErr.response.status === 401) {				
				return new Error("Incorrect email or password. Please try again.");
			}

		}

	}
	
};

export const logout = async (id: string) => {
	const response = await axios.post(
		`http://localhost:3000/api/user/logout/${id}`
	);
	return response.data;
};
