import { Response } from "express";
import axios, { AxiosError } from "axios";

const API_URL = "http://localhost:8000/api";

export const getUserProfile = async (token: string) => {
	try {
		const response = await axios.get(`${API_URL}/users/profile`, {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data;
	} catch (err) {
		console.log(err);
	}
};

export const signup = async (user: any) => {
	try {
		const response = await axios.post(`${API_URL}/users/signup`, user);
		return response.data;
	} catch (err) {
		console.log(err);
	}
};

export const login = async (user: any) => {
	try {
		const response = await axios.post(`${API_URL}/auth/login`, user);
		return response.data;
	} catch (err) {
		const axiosErr = err as AxiosError;

		if (axiosErr.response) {
			if (axiosErr.response.status === 401) {
				return new Error("Incorrect email or password. Please try again.");
			}
		}
	}
};

export const api = {

	login,
	signup,
	getUserProfile

}