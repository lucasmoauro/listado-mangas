import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as Burger } from "../../images/menu-icon.svg";
import { ReactComponent as Close } from "../../images/close-menu.svg";

import useMobileScreen from "../../hook/useMobileScreen";
import { useContext, useState } from "react";
import { context } from "../../context/MangaContext";

import { sessionValidation } from "../../helper/login";
import { alertToast } from "../Alerts/Alerts";

export const Nav = () => {
	const navigate = useNavigate();

	const { isLogged, setIsLogged } = useContext(context);

	const [isClosed, setIsClosed] = useState(true);

	const handleClose = () => {
		setIsClosed(!isClosed);
	};
	const handleLogout = () => {
		setIsLogged(false);
		localStorage.removeItem("token");
		navigate("/");
		alertToast("success", "Sesion Cerrada!")
	};

	const handleSession = () => {
		sessionValidation().catch(({ response }) => {
			setIsLogged(false);
			localStorage.removeItem("token");
			alertToast("error", response.data.message);
		});
	};

	const isMobile = useMobileScreen();

	return (
		<>
			{isMobile ? (
				<nav className={isClosed ? "nav nav-closed" : "nav"}>
					{isClosed ? (
						<div className="menu">
							<Burger className="menu__burger" onClick={handleClose} />
						</div>
					) : (
						<div className="menu">
							<Close className="menu__close" onClick={handleClose} />
						</div>
					)}
					<div className="nav__container">
						{isLogged && (
							<div className="logged">
								<Link to="/manga" onClick={handleSession}>
									Agregar Manga
								</Link>
							</div>
						)}

						{isLogged ? (
							<div className="logged logout ">
								<button onClick={handleLogout}>Cerrar Sesion</button>
							</div>
						) : (
							<div className="logIn">
								<Link to="/login">Login</Link>
							</div>
						)}
					</div>
				</nav>
			) : (
				<div className="container__login">
					{isLogged && (
						<Link
							to="/manga"
							className="container__button"
							onClick={handleSession}
						>
							Agregar Manga
						</Link>
					)}
					{isLogged ? (
						<Link to="/" onClick={handleLogout} className="container__button">
							Cerrar Sesion
						</Link>
					) : (
						<button
							className="container__button log__notebook"
							onClick={() => navigate("/login")}
						>
							Login
						</button>
					)}
				</div>
			)}
		</>
	);
};
