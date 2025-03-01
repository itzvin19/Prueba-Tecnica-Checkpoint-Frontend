import { Link } from "react-router";
import type { TProduct } from "../types";

type StoreItemProps = {
	producto: TProduct;
};

function StoreItem({ producto }: StoreItemProps) {
	return (
		<Link
			to={`/producto/${encodeURI(producto.nombre)}/${producto.id}`}
			className="p-4 w-full shadow-md hover:shadow-xl duration-200 bg-white rounded-md flex flex-col gap-3 items-center justify-between group"
		>
			<div className="flex flex-col gap-3 w-full">
				<div className="p-5 shadow-md flex items-center justify-center">
					<img
						src={producto.imagen}
						alt={producto.nombre}
						className="h-32 w-32 object-contain duration-200 z-10 group-hover:scale-110"
					/>
				</div>
				<h3 className="text-xl text-balance line-clamp-2 w-full font-semibold leading-tight h-14">
					{producto.nombre}
				</h3>
				<p className="text-balance line-clamp-4">{producto.descripcion}</p>
			</div>
			{producto.precio !== undefined && (
				<p className="w-full font-semibold text-xl">$ {producto.precio}</p>
			)}
		</Link>
	);
}

export default StoreItem;
