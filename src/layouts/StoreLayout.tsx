import NavBar from "../components/NavBar";
import { Outlet } from "react-router";

function StoreLayout() {
	return (
		<>
			<NavBar />
			<main>
				<Outlet />
			</main>
		</>
	);
}

export default StoreLayout;
