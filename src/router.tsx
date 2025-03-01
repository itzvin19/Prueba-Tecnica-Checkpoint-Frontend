import { BrowserRouter, Route, Routes } from "react-router";
import StoreLayout from "./layouts/StoreLayout";
import StoreView from "./views/StoreView";
import { lazy, Suspense } from "react";
const AuthLayout = lazy(() => import("./layouts/AuthLayout"));
const LoginView = lazy(() => import("./views/LoginView"));
const RegisterView = lazy(() => import("./views/RegisterView"));
const SingleProductView = lazy(() => import("./views/SingleProductView"));

export const Router = () => (
	<BrowserRouter>
		<Suspense fallback={<p>Cargando...</p>}>
			<Routes>
				<Route element={<StoreLayout />}>
					<Route path="/" index element={<StoreView />} />
					<Route path="/producto/:productName/:productId" index element={<SingleProductView />} />
				</Route>
				<Route element={<AuthLayout />}>
					<Route path="/iniciar-sesion" element={<LoginView />} />
					<Route path="/registro" element={<RegisterView />} />
				</Route>
			</Routes>
		</Suspense>
	</BrowserRouter>
);
