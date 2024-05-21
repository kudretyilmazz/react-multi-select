// Import React
import React from "react";
import ReactDOM from "react-dom/client";

// Import App
import App from "./app";

// Import Styles
import "@/assets/styles/global.scss";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
