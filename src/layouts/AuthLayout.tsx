import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";

function AuthLayout() {
	return (
		<div className="w-full min-h-screen flex items-center justify-center p-10">
			<div className="bg-white shadow-lg rounded-md w-1/3">
				<div className="w-full">
					<h1 className="uppercase font-bold text-center text-2xl p-4 ">
						CheckPoint Test
					</h1>
				</div>
				<div className="px-5 py-3">
					<Outlet />
				</div>
			</div>
			<ToastContainer />
		</div>
	);
}

export default AuthLayout;
