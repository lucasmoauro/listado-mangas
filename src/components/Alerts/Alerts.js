import { toast } from "react-toastify";

export const alertToast = (alert, msg) => {
	return toast[alert](msg, {
		position: "bottom-right",
		autoClose: 5000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
		theme: "colored",
	});
};
