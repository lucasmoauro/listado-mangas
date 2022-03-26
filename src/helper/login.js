import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";

export const signIn = async (email, password) => {
	await signInWithEmailAndPassword(auth, email, password)
		.then(({ user }) => {
			return user.accessToken;
		})
		.then((token) => {
			localStorage.setItem("token", token);
			localStorage.setItem("user", "admin");
		})

		.catch((error) => error);
};
