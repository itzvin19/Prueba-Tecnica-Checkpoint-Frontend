import axios from "axios";

export const api = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((config) => {
	const token = localStorage.getItem("SESSION_JWT");
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});