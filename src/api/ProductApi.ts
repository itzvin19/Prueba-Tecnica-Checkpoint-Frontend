import { isAxiosError } from "axios";
import { api } from "../lib/axios";
import { Product, Products } from "../types";

export const getAllProducts = async () => {
	try {
		const { data } = await api("/productos");
		const result = Products.safeParse(data);
		if (result.success) {
			return result.data;
		}
		throw new Error("Ocurrió un error");
	} catch (error) {
		if (isAxiosError(error) && error.response) {
			throw new Error(error.response.data);
		}
		throw new Error("Ocurrió un error");
	}
};

export const getSingleProduct = async (id: number) => {
	try {
		const { data } = await api(`/productos/${id}`);
		const result = Product.safeParse(data);
		if (result.success) {
			return result.data;
		}
		throw new Error("Ocurrió un error");
	} catch (error) {
		if (isAxiosError(error) && error.response) {
			throw new Error(error.response.data);
		}
		throw new Error("Ocurrió un error");
	}
};

export const AddLead = async ({
	correo,
	id,
}: { correo: string; id: number }) => {
	try {
		const { data } = await api.post(
			`/productos/add-lead/${id}`,
			{
				correo,
			},
			{
				responseType: "blob",
			},
		);

		const url = window.URL.createObjectURL(
			new Blob([data], { type: "application/pdf" }),
		);

		const link = document.createElement("a");
		link.href = url;
		link.setAttribute("download", "documento.pdf");
		document.body.appendChild(link);
		link.click();

		window.URL.revokeObjectURL(url);
	} catch (error) {
		if (isAxiosError(error) && error.response) {
			throw new Error(error.response.data);
		}
		throw new Error("Ocurrió un error al descargar el PDF");
	}
};

export const DirectDownload = async (id: number) => {
	try {
		const { data } = await api.post(
			`/productos/download/${id}`,
			{},
			{
				responseType: "blob",
			},
		);

		const url = window.URL.createObjectURL(
			new Blob([data], { type: "application/pdf" }),
		);

		const link = document.createElement("a");
		link.href = url;
		link.setAttribute("download", "documento.pdf");
		document.body.appendChild(link);
		link.click();

		window.URL.revokeObjectURL(url);
	} catch (error) {
		if (isAxiosError(error) && error.response) {
			throw new Error(error.response.data);
		}
		throw new Error("Ocurrió un error al descargar el PDF");
	}
};
