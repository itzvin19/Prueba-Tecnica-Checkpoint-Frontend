import { Link } from "react-router";
import User from "./User";

function NavBar() {
	return (
		<header className="sticky top-0 z-50">
			<nav className="p-5 py-4 flex justify-center bg-white shadow z-50">
				<div className="w-11/12 flex justify-between items-center">
					<Link aria-label="Regresar a la página principal" to="/" className="uppercase font-bold text-center text-2xl ">
						CheckPoint Test
					</Link>
					<User />
				</div>
			</nav>
		</header>
	);
}

export default NavBar;
