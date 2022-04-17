import axios from "axios";

const baseUrl = process.env.REACT_APP_APIDEV_MANGAS;

//Funcion que trae todos los mangas de la base de datos
export const getMangas = async () => {
	return await axios
		.get(baseUrl)
		.then(({ data }) => data)
		.then(({ mangas }) => mangas);
};

//Funcion que trae un solo manga de la base de datos
export const getManga = async (manga) => {
	return await axios
		.get(`${baseUrl}/${manga}`)
		.then(({ data }) => data)
		.then(({ manga }) => manga);
};

//Funcion que crea un manga en la base de datos
export const createManga = async (formValues) => {
	const token = localStorage.getItem("token");
	return await axios.post(baseUrl, formValues, {
		headers: { token },
	});
};

//Funcion que actualiza un manga en la base de datos
export const updateManga = async (formValues, id) => {
	const token = localStorage.getItem("token");
	return await axios.put(`${baseUrl}/${id}`, formValues, {
		headers: { token },
	});
};

//Funcion que elimina un manga de la base de datos
export const deleteManga = async (id) => {
	const token = localStorage.getItem("token");
	return await axios.delete(`${baseUrl}/${id}`, {
		headers: { token },
	});
};

//Actualiza el stock en la base de datos al enviar el estado actual del manga
export const updateStock = async (id, stock) => {
	const token = localStorage.getItem("token");

	return axios.patch(
		`${baseUrl}/${id}`,
		{ stock },
		{
			headers: { token },
		}
	);
};
