import { createContext, useState } from "react";

export const context = createContext();

export const MangaContext = ({ children }) => {
	const { Provider } = context;

	const [mangaToDelete, setMangaToDelete] = useState({});
	const [mangas, setMangas] = useState([]);
	const [isLogged, setIsLogged] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const initialValue = {
		isLogged,
		setIsLogged,
		isModalOpen,
		setIsModalOpen,
		mangaToDelete,
		setMangaToDelete,
		mangas,
		setMangas,
	};

	return <Provider value={initialValue}>{children}</Provider>;
};
