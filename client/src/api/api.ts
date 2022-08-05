import axios from "axios";

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
	const response = await axios.post(
		"http://localhost:3000/api/user/login",
		user
	);
	return response.data;
};

export const logout = async (id: string) => {
	const response = await axios.post(
		`http://localhost:3000/api/user/logout/${id}`
	);
	return response.data;
};
