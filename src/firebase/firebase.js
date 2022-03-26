import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyCr-_dskWzT19tzYj07C99LNaL_g2J8Vlg",
	authDomain: "control-de-mangas.firebaseapp.com",
	projectId: "control-de-mangas",
	storageBucket: "control-de-mangas.appspot.com",
	messagingSenderId: "165389566251",
	appId: "1:165389566251:web:dad9f0dcc685bfa07c056e"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth(app);
