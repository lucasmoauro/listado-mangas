import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { AppRouter } from "./components/Router/AppRouter";
import "react-toastify/dist/ReactToastify.css";
import { MangaContext } from "./context/MangaContext";

function App() {
	window.onunload = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("user");
	};

	return (
		<MangaContext>
			<BrowserRouter>
				<AppRouter />
				<ToastContainer />
			</BrowserRouter>
		</MangaContext>
	);
}

export default App;
