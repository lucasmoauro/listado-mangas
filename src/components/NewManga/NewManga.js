import { useEffect, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { useNavigate, useParams } from "react-router-dom";
import { createManga, getManga, updateManga } from "../../mongoDB/mongo";
import { alertToast } from "../Alerts/Alerts";

export const NewManga = () => {
	const [formValues, setFormValues] = useState({
		titulo: "",
		deposito: "",
		pasillo: "",
		nivel: "",
		seccion: "",
		stock: true,
	});

	const [isLoading, setIsLoading] = useState(false);

	const navigate = useNavigate();
	const { id } = useParams();

	const handleSubmit = (e) => {
		e.preventDefault();
		setIsLoading(true);

		if (
			!formValues.titulo ||
			!formValues.deposito ||
			!formValues.pasillo ||
			!formValues.nivel ||
			!formValues.seccion
		) {
			alertToast("error", "Los campos no pueden estar vacios.");
			setIsLoading(false);
			return;
		}

		if (id) {
			updateManga(formValues, id);
			alertToast("success", "Manga editado correctamente.");
			setIsLoading(false);
			navigate("/");
		} else {
			createManga(formValues);
			alertToast("success", "Manga creado correctamente.");
			setIsLoading(false);
			setFormValues({
				titulo: "",
				deposito: "",
				pasillo: "",
				nivel: "",
				seccion: "",
				stock: true,
			});
		}
	};

	useEffect(() => {
		if (id) {
			getManga(id).then(({ deposito, nivel, pasillo, seccion, titulo }) => {
				setFormValues({
					titulo,
					deposito,
					nivel,
					pasillo,
					seccion,
				});
			});
		}
	}, []); //eslint-disable-line

	return (
		<div className="form">
			<div className="form__containerNewManga">
				<button onClick={() => navigate("/")} className="form__button">
					Volver
				</button>
			</div>
			<form onSubmit={handleSubmit} className="form__newManga">
				<div className="form__main">
					<div className="form__section">
						<div>
							<label htmlFor="Manga" className="label">
								Manga
							</label>
						</div>
						<input
							autoComplete="off"
							type="text"
							id="Manga"
							className="form__inputManga input"
							onChange={(e) =>
								setFormValues({
									...formValues,
									titulo: e.target.value.toUpperCase(),
								})
							}
							value={formValues.titulo}
						/>
					</div>
					<div className="form__section">
						<div>
							<label htmlFor="Deposito" className="label">
								Deposito
							</label>
						</div>
						<select
							name=""
							id="Deposito"
							className="form__inputManga input"
							onChange={(e) =>
								setFormValues({ ...formValues, deposito: e.target.value })
							}
							value={formValues.deposito}
						>
							<option value="">Seleccione un deposito</option>
							<option value="1">1</option>
							<option value="2">2</option>
							<option value="3">3</option>
						</select>
					</div>
					<div className="form__section">
						<div>
							<label htmlFor="Pasillo" className="label">
								Pasillo
							</label>
						</div>
						<input
							autoComplete="off"
							type="text"
							id="Pasillo"
							className="form__inputManga input"
							onChange={(e) =>
								setFormValues({
									...formValues,
									pasillo: e.target.value.toUpperCase(),
								})
							}
							value={formValues.pasillo}
						/>
					</div>
					<div className="form__section">
						<div>
							<label htmlFor="Nivel" className="label">
								Nivel
							</label>
						</div>
						<input
							autoComplete="off"
							type="number"
							min={1}
							max={4}
							id="Nivel"
							className="form__inputManga input"
							onChange={(e) =>
								setFormValues({ ...formValues, nivel: e.target.value })
							}
							value={formValues.nivel}
						/>
					</div>
					<div className="form__section">
						<div>
							<label htmlFor="Seccion" className="label">
								Seccion
							</label>
						</div>
						<input
							autoComplete="off"
							type="text"
							id="Seccion"
							className="form__inputManga input"
							onChange={(e) =>
								setFormValues({
									...formValues,
									seccion: e.target.value.toUpperCase(),
								})
							}
							value={formValues.seccion}
						/>
					</div>
					{isLoading ? (
						<div>
							<RotatingLines width="50" />
						</div>
					) : (
						<div>
							<button className="form__button">Enviar</button>
						</div>
					)}
				</div>
			</form>
		</div>
	);
};
