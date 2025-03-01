import { z } from "zod";

export const Product = z.object({
	nombre: z.string(),
	precio: z.number().optional(),
	id: z.number(),
	imagen: z.string(),
	descripcion: z.string(),
});

export type AuthForm = {
	nombre: string;
	correo: string;
	contraseña: string;
	repetir_contraseña: string;
};

export type LoginForm = Pick<AuthForm, "correo" | "contraseña">;
export type RegisterForm = Pick<
	AuthForm,
	"correo" | "contraseña" | "nombre" | "repetir_contraseña"
>;

export const Products = z.array(Product);

export type TProduct = z.infer<typeof Product>;
export type TProducts = TProduct[];
