import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { context } from "../../context/MangaContext";

export const PrivateRoute = ({ children }) => {
	const { isLogged } = useContext(context);

	return isLogged ? children : <Navigate to="/login" />;
};
