import {
	getDoc,
	getDocs,
	setDoc,
	deleteDoc,
	doc,
	collection,
	query,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

//Funcion que crea o actualiza un manga en la base de datos
export const createManga = async ({
	titulo,
	deposito,
	pasillo,
	nivel,
	seccion,
}) => {
	const newManga = {
		titulo: titulo,
		deposito: deposito,
		pasillo: pasillo,
		nivel: nivel,
		seccion: seccion,
		stock: true,
	};

	const response = await setDoc(doc(db, "mangas", titulo), newManga);

	return response;
};

//Actualiza el stock en firebase al enviar el titulo del manga para hacer la busqueda
export const updateStock = async (
	titulo,
	{ deposito, pasillo, nivel, seccion, stock }
) => {
	const newStock = {
		titulo,
		deposito,
		pasillo,
		nivel,
		seccion,
		stock,
	};

	const response = await setDoc(doc(db, "mangas", titulo), newStock);

	return response;
};

//Funcion que trae todos los mangas de la base de datos
export const getMangas = async () => {
	const q = query(collection(db, "mangas"));

	const querySnapshot = await getDocs(q);

	const arr = [];

	querySnapshot.forEach((doc) => arr.push(doc.data()));

	return arr;
};

//Funcion que trae un solo manga de la base de datos
export const getManga = async (manga) => {
	const docRef = doc(db, "mangas", manga);

	const docSnap = await getDoc(docRef);

	if (docSnap.exists()) {
		return docSnap.data();
	} else {
		console.log("no data");
	}
};

//Funcion que elimina un manga de la base de datos

export const deleteManga = async (manga) => {
	await deleteDoc(doc(db, "mangas", manga));
};
