import { isAxiosError } from "axios";
import { api } from "../lib/axios";
import type { LoginForm } from "../types";

export const Login = async (data: LoginForm) => {
	try {
		const { data: queryData } = await api.post("/auth/login", data);
		return queryData;
	} catch (error) {
		if (isAxiosError(error) && error.response) {
			throw new Error(error.response.data);
		}
		throw new Error("Ocurrió un error");
	}
};

export const Register = async (data: LoginForm) => {
	try {
		const { data: queryData } = await api.post("/auth/register", data);
		return queryData;
	} catch (error) {
		if (isAxiosError(error) && error.response) {
			throw new Error(error.response.data.error);
		}
		throw new Error("Ocurrió un error");
	}
};

export const GetUser = async () => {
	try {
		const { data } = await api("/auth/me");
		return data;
	} catch (error) {
		if (isAxiosError(error) && error.response) {
			throw new Error(error.response.data.error);
		}
		throw new Error("Ocurrió un error");
	}
};
