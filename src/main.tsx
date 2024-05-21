// Import React
import React from "react";
import ReactDOM from "react-dom/client";

// Import React Query
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "@/query-client";

// Import App
import App from "./app";

// Import Styles
import "@/assets/styles/global.scss";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<App />
		</QueryClientProvider>
	</React.StrictMode>
);
