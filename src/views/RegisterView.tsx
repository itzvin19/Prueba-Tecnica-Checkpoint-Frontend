import { useForm } from "react-hook-form";
import type { RegisterForm } from "../types";
import { useMutation } from "@tanstack/react-query";
import { Register } from "../api/AuthApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

function LoginView() {
	const defaultValues: RegisterForm = {
		correo: "",
		contraseña: "",
		nombre: "",
		repetir_contraseña: "",
	};

	const navigate = useNavigate();

	const {
		register,
		formState: { errors },
		handleSubmit,
		watch
	} = useForm({ defaultValues });

	const password=watch("contraseña")
	const { mutate, isPending } = useMutation({
		mutationFn: Register,
		onSuccess: () => {
			toast.success("Registrado correctamente, redirigiendo...");
			setTimeout(() => {
				navigate("/iniciar-sesion");
			}, 1000);
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});

	const handleRegister = (data: RegisterForm) => {
		mutate(data);
	};

	return (
		<div className="flex flex-col gap-5">
			<h2 className="text-2xl font-bold">Registrarse</h2>
			<form
				className="flex flex-col gap-4"
				onSubmit={handleSubmit(handleRegister)}
			>
				<div className="flex flex-col gap-2">
					<label htmlFor="txtName" className="font-semibold">
						Nombre
					</label>
					<input
						id="txtName"
						type="text"
						className="px-2 py-1 border-1 rounded-sm"
						placeholder="Pedro Pérez"
						{...register("nombre", {
							required: "Debe ingresar un Nombre",
							maxLength:{value:50,message:"El nombre debe llevar 50 caractéres como máximo"}
						})}
					/>
					{errors.nombre ? (
						<span className="text-red-700">{errors.nombre.message}</span>
					) : null}
				</div>
				<div className="flex flex-col gap-2">
					<label htmlFor="correoTxt" className="font-semibold">
						Correo
					</label>
					<input
						type="text"
						id="correoTxt"
						placeholder="correo@correo.com"
						className="px-2 py-1 border-1 rounded-sm"
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
						className="px-2 py-1 border-1 rounded-sm"
						{...register("contraseña", {
							required: "Debe ingresar una contraseña",
							pattern:{value:/^(?=.*[A-Z])(?=.*\d)[A-Za-zñÑáéíóúü\d]{8,}$/
							, message:"Ingrese una contraseña válida"}
						})}
					/>
					{errors.contraseña ? (
						<span className="text-red-700">{errors.contraseña.message}</span>
					) : null}
					<span>
						La contraseña debe tener 8 caracteres como mínimo y debe de incluir
						un número y una mayúscula
					</span>
				</div>
				<div className="flex flex-col gap-2">
					<label htmlFor="txtRepeatPassword" className="font-semibold">
						Repetir Contraseña
					</label>
					<input
						id="txtRepeatPassword"
						type="password"
						className="px-2 py-1 border-1 rounded-sm"
						{...register("repetir_contraseña", {
							validate: (value) => value === password || "Las contraseñas no coinciden",
						})}
					/>
					{errors.repetir_contraseña ? (
						<span className="text-red-700">{errors.repetir_contraseña.message}</span>
					) : null}
				</div>
				<button
					type="submit"
					className="p-2 rounded-md cursor-pointer bg-[#222222] text-white font- text-lg disabled:opacity-50"
					disabled={isPending}
				>
					{isPending ? "Registrando..." : "Registrarse"}
				</button>
			</form>
			<div className="flex gap-2.5">
				<span>¿Ya tienes una cuenta?</span>
				<a className="underline font-semibold" href="/iniciar-sesion">
					Ingresa aquí
				</a>
			</div>
		</div>
	);
}

export default LoginView;
