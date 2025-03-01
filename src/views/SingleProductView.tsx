import { useMutation, useQuery } from "@tanstack/react-query";
import { DirectDownload, getSingleProduct } from "../api/ProductApi";
import { Link, useParams } from "react-router";
import DownloadIcon from "../components/icons/DownloadIcon";
import { GetUser } from "../api/AuthApi";
import LeadsModal from "../components/LeadsModal";
import { useState } from "react";

function SingleProductView() {
	const params = useParams();
	// biome-ignore lint/style/noNonNullAssertion: <explanation>
	const productId = params.productId!;
	const [isOpen, setIsOpen] = useState(false);

	const {
		data: userData,
		isPending: userPending,
		isError: userError,
	} = useQuery({
		queryKey: ["User"],
		queryFn: GetUser,
	});

	const { data, isPending: productPending } = useQuery({
		queryKey: ["SingleProduct"],
		queryFn: () => getSingleProduct(+productId),
	});

	const { mutateAsync, isPending: downloadPending } = useMutation({
		mutationFn: DirectDownload,
	});

	const handleDownload = async () => {
		if (!userError && !userPending && userData.id && userData.nombre) {
			await mutateAsync(+productId);
		} else {
			setIsOpen(true);
		}
	};

	return (
		<div className="w-full p-5 flex flex-col items-center min-h-[calc(100vh-80px)] justify-center">
			<div className="w-11/12 2xl:w-3/4 p-10 bg-white flex flex-col min-h-96 gap-2.5 items-start shadow-lg rounded-lg">
				<Link to="/" aria-label="Regresar a la tienda" className="underline 2xl:text-lg">
					{"< Regresar"}
				</Link>
				<div className="w-full flex flex-col xl:flex-row gap-5 xl:gap-20 ">
					<div className="w-full xl:w-1/2 shadow p-8 flex items-center justify-center">
						<img src={data?.imagen} alt={data?.nombre} className="h-56" />
					</div>
					<div className="flex w-full xl:w-1/2 flex-col gap-6">
						<h1 className="uppercase font-bold text-2xl text-balance 2xl:text-3xl">
							{data?.nombre}
						</h1>
						{data?.precio ? (
							<span className="font-bold text-xl 2xl:text-2xl">$ {data.precio}</span>
						) : null}
						<p className="text-balance 2xl:text-lg">{data?.descripcion}</p>
						<button
							type="button"
							className="text-balance cursor-pointer w-full xl:w-1/2 2xl:w-full font-semibold bg-black text-white rounded-md p-3 flex items-center justify-center gap-2.5 duration-200 hover:shadow-lg focus:outline-gray-400"
							onClick={() => handleDownload()}
							onKeyDown={(event: React.KeyboardEvent) => {
								if (event.key === "Enter" || event.key === " ") {
									handleDownload();
								}
							}}
						>
							<DownloadIcon />
							<span className="2xl:text-xl">
								{downloadPending ? "Descargando..." : "Descargar Ficha Técnica"}
							</span>
						</button>
					</div>
				</div>
			</div>
			<LeadsModal isOpen={isOpen} setIsOpen={setIsOpen} />
		</div>
	);
}

export default SingleProductView;
