import { useContext } from "react";

import { context } from "../../context/MangaContext";
import { deleteManga } from "../../db/firebaseDB";
import { alertToast } from "../Alerts/Alerts";

export const Modal = () => {
	const { setIsModalOpen, mangaToDelete, setMangas, mangas } =
		useContext(context);

	const handleClose = () => {
		setIsModalOpen(false);
	};

	const handleDelete = () => {
		deleteManga(mangaToDelete.titulo);
		setMangas(mangas.filter((m) => m.titulo !== mangaToDelete.titulo));
		setIsModalOpen(false);
		alertToast("success", "Manga eliminado correctamente");
	};

	return (
		<div className="modal">
			<div className="modal__container">
				<div>
					<h1>Queres borrar {mangaToDelete.titulo}?</h1>
					<div className="modal__buttons">
						<button onClick={handleDelete}>Borrar</button>
						<button onClick={handleClose}>Cancelar</button>
					</div>
				</div>
			</div>
		</div>
	);
};
