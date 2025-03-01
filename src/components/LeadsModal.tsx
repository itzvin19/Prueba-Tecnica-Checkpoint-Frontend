import {
	Description,
	Dialog,
	DialogPanel,
	DialogTitle,
	Transition,
	TransitionChild,
} from "@headlessui/react";
import { Fragment } from "react";
import DownloadIcon from "./icons/DownloadIcon";
import { useForm } from "react-hook-form";
import type { LoginForm } from "../types";
import { AddLead } from "../api/ProductApi";
import { useMutation } from "@tanstack/react-query";
import { useParams } from "react-router";

type LeadsModal = {
	isOpen: boolean;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function LeadsModal({ isOpen, setIsOpen }: LeadsModal) {
	const params = useParams();
	// biome-ignore lint/style/noNonNullAssertion: <explanation>
	const productId = params.productId!;

	const defaultValues: Pick<LoginForm, "correo"> = {
		correo: "",
	};
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm({ defaultValues });

	const { mutateAsync } = useMutation({
		mutationFn: AddLead,
		onSuccess: () => {
			setIsOpen(false);
		},
	});

	const handleDownload = async (data: Pick<LoginForm, "correo">) => {
		await mutateAsync({ correo: data.correo, id: +productId });
	};
	return (
		<>
			<Transition appear show={isOpen} as={Fragment}>
				<Dialog
					as="div"
					className="relative z-50"
					onClose={() => setIsOpen(false)}
				>
					<TransitionChild
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-black/80 bg-opacity-50" />
					</TransitionChild>

					<div className="fixed inset-0 flex items-center justify-center p-4">
						<TransitionChild
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 scale-95"
							enterTo="opacity-100 scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 scale-100"
							leaveTo="opacity-0 scale-95"
						>
							<DialogPanel className="w-full max-w-2/3 bg-white rounded-sm shadow-lg flex gap-4">
								<div className="rounded-l-sm overflow-hidden w-5/8">
									<img
										src="/shoppingcover.webp"
										alt=""
										className="object-cover"
									/>
								</div>
								<div className="flex flex-col items-end gap-1">
									<button
										type="button"
										aria-label="Cerrar Modal"
										className="px-6 py-1 cursor-pointer"
										onClick={() => setIsOpen(false)}
										onKeyDown={(event: React.KeyboardEvent) => {
											if (event.key === "Enter" || event.key === " ") {
												setIsOpen(false);
											}
										}}
									>
										X
									</button>
									<form
										className="gap-5 flex flex-col px-6"
										onSubmit={handleSubmit(handleDownload)}
									>
										<DialogTitle className="text-lg font-bold uppercase">
											Solo un paso más
										</DialogTitle>
										<Description className="mt-2 text-gray-600 text-balance">
											No te pierdas ninguna de las sorpresas que tenemos para
											ti!
										</Description>
										<div className="flex flex-col gap-2.5">
											<input
												type="text"
												id=""
												placeholder="Ingresar correo electrónico"
												className="px-2 py-1  border-1 rounded-sm border-black"
												{...register("correo", {
													required: "Por favor ingrese un correo electrónico",
													pattern: {
														value: /^[\w.-]+@([\w-]+\.)+[a-zA-Z]{2,}$/,
														message: "Por favor inserte un correo válido",
													},
												})}
											/>
											{errors.correo ? (
												<span className="text-red-700">
													{errors.correo.message}
												</span>
											) : null}
										</div>
										<button
											type="submit"
											className="text-balance cursor-pointer w-full font-semibold bg-black text-white rounded-md p-3 flex justify-center gap-2.5 duration-200 hover:shadow-lg focus:outline-gray-400"
										>
											<DownloadIcon />
											<span>Descargar Ficha Técnica</span>
										</button>
									</form>
								</div>
							</DialogPanel>
						</TransitionChild>
					</div>
				</Dialog>
			</Transition>
		</>
	);
}
