import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { context } from "../../context/MangaContext";
import { signIn } from "../../helper/login";
import { alertToast } from "../Alerts/Alerts";

export const LoginScreen = () => {
	const navigate = useNavigate();

	const { setIsLogged } = useContext(context);

	const [formValues, setFormValues] = useState({
		usuario: "test",
		password: "testeo",
	});

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!formValues.usuario || !formValues.password) {
			alertToast("error", "Los campos no pueden estar vacios.");
			return;
		} else {
			await signIn(formValues.usuario, formValues.password);

			if (localStorage.getItem("token")) {
				setIsLogged(true);
				alertToast("success", "Login correcto!");
				navigate("/");
			} else {
				setIsLogged(false);
				alertToast("error", "Usuario o contraseña incorrectos");
			}
		}
	};

	return (
		<div className="login">
			<div className="login__back">
				<button onClick={() => navigate("/")} className="form__button">
					Volver
				</button>
			</div>
			<div className="login__container">
				<h1 className="login__title">Login</h1>
				<form action="" className="form" onSubmit={handleSubmit}>
					<div className="form__container">
						<div>
							<label htmlFor="" className="label">
								Usuario
							</label>
						</div>
						<input
							type="text"
							className="form__input"
							value={formValues.usuario}
							onChange={(e) =>
								setFormValues({ ...formValues, usuario: e.target.value })
							}
						/>
					</div>
					<div className="form__container">
						<div>
							<label htmlFor="" className="label">
								Contraseña
							</label>
						</div>
						<input
							type="password"
							className="form__input"
							value={formValues.password}
							onChange={(e) =>
								setFormValues({ ...formValues, password: e.target.value })
							}
						/>
					</div>
					<div className="form__container">
						<button className="form__button">Login</button>
					</div>
				</form>
			</div>
		</div>
	);
};
