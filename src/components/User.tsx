import { useQuery, useQueryClient } from "@tanstack/react-query";
import { GetUser } from "../api/AuthApi";
import { Link } from "react-router";

function User() {
	const { data, isError, isPending } = useQuery({
		queryKey: ["User"],
		queryFn: GetUser,
	});

	const queryClient = useQueryClient();

	const logout = () => {
		localStorage.removeItem("SESSION_JWT");
		queryClient.invalidateQueries({ queryKey: ["User"] });
		queryClient.invalidateQueries({ queryKey: ["Products"] });
		queryClient.invalidateQueries({ queryKey: ["SingleProduct"] });
	};

	return (
		<div className="flex flex-col w-1/5">
			<div className="w-full flex">
				<span className="px-3 font-semibold text-center w-full">
					{!isError && !isPending && data.nombre
						? `Hola, ${data.nombre}!`
						: "Hola!"}
				</span>
			</div>
			{!isError && !isPending && data.id && data.nombre ? (
				<button
					type="button"
					aria-label="Cerrar sesión"
					className="px-3 text-center underline cursor-pointer"
					onClick={() => logout()}
					onKeyDown={(event: React.KeyboardEvent) => {
						// Solo ejecuta `logout` si se presiona Enter (Enter) o Espacio (Space)
						if (event.key === "Enter" || event.key === " ") {
							logout();
						}
					}}
				>
					Cerrar Sesión
				</button>
			) : (
				<div className="divide-x-2">
					<Link className="px-3" to="/iniciar-sesion">
						<span>Iniciar Sesión</span>
					</Link>
					<Link className=" px-3" to="/registro">
						<span>Registrarse</span>
					</Link>
				</div>
			)}
		</div>
	);
}

export default User;
