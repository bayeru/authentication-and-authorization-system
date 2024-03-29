import { Response } from "express";
import axios, { AxiosError } from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:8000";
const API_URL = `${BACKEND_URL}/api`;

interface AxiosResponseDataMessage {

	message: string;

}

export const deleteUser = async (token: string) => {

	const response = await axios.delete(`${API_URL}/users/delete`, {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`
		},
	});

	return response.data;

};

export const getUserDetails = async (token: string) => {
	
	const response = await axios.get(`${API_URL}/users/profile`, {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	});
	return response.data;
	
};

export const updateUserDetails = async (userDetails: any) => {

	const response = await axios.put(`${API_URL}/users/profile`, userDetails, {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${userDetails.token}`,
		},
	});
	return response.data;

};

export const signup = async (user: any) => {
	
	const response = await axios.post(`${API_URL}/auth/signup`, user);
	return response.data;

};

export const login = async (user: any) => {
	
	const response = await axios.post(`${API_URL}/auth/login`, user);
	return response.data;

};

export const verify = async (token: string) => {
	
	const response = await axios.get(`${API_URL}/auth/verify/${token}`);
	return response.data;
	
};

export const api = {

	login,
	signup,
	verify,
	deleteUser,
	getUserDetails,
	updateUserDetails

}