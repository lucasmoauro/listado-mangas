import { useContext, useEffect, useState } from "react";

import { InfinitySpin } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

import { context } from "../../context/MangaContext";

import { Nav } from "../Nav/Nav";
import { Search } from "../Search/Search";
import { Modal } from "../Modal/Modal";

import trashBin from "../../images/delete.png";
import { getMangas, updateStock } from "../../mongoDB/mongo";
import { sessionValidation } from "../../helper/login";
import { alertToast } from "../Alerts/Alerts";

export const TableScreen = () => {
	const {
		isLogged,
		setIsModalOpen,
		isModalOpen,
		setMangaToDelete,
		mangas,
		setMangas,
		setIsLogged,
	} = useContext(context);

	const navigate = useNavigate();

	const [search, setSearch] = useState("");
	const [isLoading, setIsLoading] = useState(true);

	const handleSearch = (e) => {
		e.preventDefault();
		const query = e.target.value;
		setSearch(query);
	};

	const handleModal = (manga) => {
		sessionValidation().catch(({ response }) => {
			setIsLogged(false);
			localStorage.removeItem("token");
			navigate("/login");
			alertToast("error", response.data.message);
		});
		if (isLogged && localStorage.getItem("token") !== null) {
			setMangaToDelete(manga);
			setIsModalOpen(true);
		}
	};

	//Fn que cambia el boolean del stock (checkbox) permitiendo que la celda cambie a rojo si esta agotado
	const handleStock = (manga) => {
		sessionValidation().catch(({ response }) => {
			setIsLogged(false);
			localStorage.removeItem("token");
			navigate("/login");
			alertToast("error", response.data.message);
		});

		if (isLogged && localStorage.getItem("token") !== null) {
			manga.stock = !manga.stock;
			mangas.splice(mangas.indexOf(manga), 1, manga);

			updateStock(manga.id, manga.stock);
			setMangas([...mangas]);
		}
	};

	const handleNavigate = async ({ id }) => {
		await sessionValidation().catch(({ response }) => {
			setIsLogged(false);
			localStorage.removeItem("token");
			navigate("/login");
			alertToast("error", response.data.message);
		});

		if (isLogged && localStorage.getItem("token") !== null) {
			navigate(`/manga/${id}`);
		}
	};

	useEffect(() => {
		getMangas().then((manga) => {
			setIsLoading(false);
			setMangas(manga);
		});
	}, []); // eslint-disable-line

	//Retorna un efecto debounce al hacer una busqueda
	const filteredMangas = mangas.filter((manga) => {
		return manga.titulo.toLowerCase().includes(search.toLowerCase());
	});

	return (
		<div className="container">
			{!isLoading ? <Search search={handleSearch} /> : null}
			<Nav />
			{isLoading && (
				<div className="loading">
					<div className="loading__container">
						<div>
							<InfinitySpin />
							<h2>Cargando...</h2>
						</div>
					</div>
				</div>
			)}
			{!isLoading && (
				<div className="overflow">
					<table className="table">
						<thead>
							<tr className="table__title">
								<th>Nombre</th>
								<th>Deposito</th>
								<th>Pasillo</th>
								<th>Nivel</th>
								<th>Seccion</th>
								{isLogged && (
									<>
										<th>Agotado</th>
										<th>Borrar</th>
									</>
								)}
							</tr>
						</thead>
						<tbody>
							{filteredMangas.map((manga, i) => {
								return (
									<tr
										className={`
									${!manga.stock ? "table__cell-nostock" : "table__cell"}
									${isLogged && "pointer"}
									${isLogged && !manga.stock ? "pointer-nostock" : null}
									`}
										key={i}
									>
										<td onClick={() => handleNavigate(manga)}>
											{manga.titulo}
										</td>
										<td onClick={() => handleNavigate(manga)}>
											{manga.deposito}
										</td>
										<td onClick={() => handleNavigate(manga)}>
											{manga.pasillo}
										</td>
										<td onClick={() => handleNavigate(manga)}>{manga.nivel}</td>
										<td onClick={() => handleNavigate(manga)}>
											{manga.seccion}
										</td>
										{isLogged && (
											<>
												<td>
													<input
														type="checkbox"
														name="agotado"
														id="agotado"
														checked={!manga.stock}
														onChange={() => handleStock(manga)}
													/>
												</td>
												<td onClick={() => handleModal(manga)}>
													<div className="bin">
														<img src={trashBin} alt="trash bin" width={25} />
													</div>
												</td>
											</>
										)}
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			)}
			{isModalOpen && <Modal />}
		</div>
	);
};
