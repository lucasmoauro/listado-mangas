import { useEffect, useState } from "react";

const useMobileScreen = () => {
	const [width, setWidth] = useState(window.innerWidth);
	const handleWindowSizeChange = () => {
		setWidth(window.innerWidth);
	};

	useEffect(() => {
		window.addEventListener("resize", handleWindowSizeChange);
		return () => {
			window.removeEventListener("resize", handleWindowSizeChange);
		};
	}, []);

	return width <= 1023;
};

export default useMobileScreen;
