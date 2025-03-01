import { useQuery } from "@tanstack/react-query";

import StoreItem from "./StoreItem";
import { getAllProducts } from "../api/ProductApi";

function Store() {
	const { data, isPending, isError } = useQuery({
		queryKey: ["Products"],
		queryFn: getAllProducts,
		retry: 1,
		refetchOnWindowFocus: false,
	});

	if (isPending) return <p>Cargando...</p>;
	if (isError) return <p>Error</p>;
	if (data)
		return (
			<section className="w-full p-5 flex justify-center">
				<div className="w-11/12 grid grid-cols-5 gap-6">
					{data.map((producto) => (
						<StoreItem key={producto.id} producto={producto} />
					))}
				</div>
			</section>
		);
}

export default Store;
