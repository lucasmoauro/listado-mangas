import { useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { context } from "../../context/MangaContext";
import { sessionValidation } from "../../helper/login";
import { alertToast } from "../Alerts/Alerts";
import { LoginScreen } from "../Login/LoginScreen";
import { NewManga } from "../NewManga/NewManga";
import { TableScreen } from "../Table/TableScreen";
import { PrivateRoute } from "./PrivateRoute";

export const AppRouter = () => {
	const { isLogged } = useContext(context);

	return (
		<Routes>
			<Route path="/" element={<TableScreen />} />
			{!isLogged ? (
				<Route path="/login" element={<LoginScreen />} />
			) : (
				<Route path="/login" element={<Navigate to="/" />} />
			)}

			<Route
				path="/manga/:id"
				element={
					<PrivateRoute>
						<NewManga />
					</PrivateRoute>
				}
			/>

			<Route
				path="/manga"
				element={
					<PrivateRoute>
						<NewManga />
					</PrivateRoute>
				}
			/>

			<Route path="/*" element={<Navigate to="/" />} />
		</Routes>
	);
};
