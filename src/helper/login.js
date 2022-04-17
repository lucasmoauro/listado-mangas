import axios from "axios";

// = = = FN que hace log in mediante MONGODB = = =
export const signIn = async (username, password) => {
	const baseUrl = process.env.REACT_APP_APIDEV_LOGIN;

	await axios
		.post(`${baseUrl}/login`, {
			username,
			password,
		})
		.then(({ data }) => {
			localStorage.setItem("token", data.token);
		})
		.catch(({ response }) => console.log(response));
};

//FN que valida la sesion de mongo y renueva el token del usuario
export const sessionValidation = () => {
	const token = localStorage.getItem("token");

	const baseUrl = process.env.REACT_APP_APIDEV_LOGIN;

	return axios
		.post(`${baseUrl}/renew`, "", {
			headers: { token },
		})
		.then(({ data }) => {
			localStorage.setItem("token", data.token);
		});
};
