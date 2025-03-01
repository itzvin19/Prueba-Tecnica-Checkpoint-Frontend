import { useForm } from "react-hook-form";
import type { LoginForm } from "../types";
import { useMutation } from "@tanstack/react-query";
import { Login } from "../api/AuthApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

function LoginView() {
	const defaultValues: LoginForm = {
		correo: "",
		contraseña: "",
	};

	const navigate = useNavigate();

	const {
		register,
		formState: { errors },
		handleSubmit,
		reset,
		resetField,
	} = useForm({ defaultValues });

	const { mutate, isPending } = useMutation({
		mutationFn: Login,
		onSuccess: (data) => {
			reset();
			localStorage.setItem("SESSION_JWT", data);
			toast.success("Sesión iniciada, redirigiendo...");
			setTimeout(() => {
				navigate("/");
			}, 1000);
		},
		onError: (error) => {
			toast.error(error.message);
			resetField("contraseña");
		},
	});

	const handleLogin = (data: LoginForm) => {
		mutate(data);
	};

	return (
		<div className="flex flex-col gap-5">
			<h2 className="text-2xl font-bold">Iniciar Sesión</h2>
			<form
				className="flex flex-col gap-4"
				onSubmit={handleSubmit(handleLogin)}
			>
				<div className="flex flex-col gap-2">
					<label htmlFor="correoTxt" className="font-semibold">
						Correo
					</label>
					<input
						type="text"
						id="correoTxt"
						placeholder="correo@correo.com"
						className="px-2 py-1 border-1 rounded-sm 2xl:text-lg"
						{...register("correo", {
							required: "Debe ingresar un correo",
							pattern: {
								value: /^[\w.-]+@([\w-]+\.)+[a-zA-Z]{2,}$/,
								message: "Inserte un correo válido",
							},
							maxLength: { value: 200, message: "Email demasiado largo" },
						})}
					/>
					{errors.correo ? (
						<span className="text-red-700">{errors.correo.message}</span>
					) : null}
				</div>
				<div className="flex flex-col gap-2">
					<label htmlFor="txtPassword" className="font-semibold">
						Contraseña
					</label>
					<input
						id="txtPassword"
						type="password"
						className="px-2 py-1 border-1 rounded-sm 2xl:text-lg"
						{...register("contraseña", {
							required: "Debe ingresar una contraseña",
						})}
					/>
					{errors.contraseña ? (
						<span className="text-red-700">{errors.contraseña.message}</span>
					) : null}
				</div>
				<button
					type="submit"
					className="p-2 rounded-md cursor-pointer bg-[#222222] text-white font- text-lg disabled:opacity-50 2xl:text-xl"
					disabled={isPending}
				>
					{isPending ? "Ingresando..." : "Ingresar"}
				</button>
			</form>
			<div className="flex md:gap-2.5 flex-col md:flex-row 2xl:text-lg">
				<span>¿Aún no tienes una cuenta?</span>
				<a className="underline font-semibold" href="/registro">
					Registrate aquí
				</a>
			</div>
		</div>
	);
}

export default LoginView;
