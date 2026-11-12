import React from "react";
import ReactDOM from "react-dom/client";
import { Provider as ReduxProvider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { store } from "./shared/lib/redux/store";
import { AppProviders } from "./app/app-providers";
import "./shared/styles/typography.css";

const queryClient = new QueryClient({
 defaultOptions: { queries: { retry: 1, refetchOnWindowFocus: false } },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<ReduxProvider store={store}>
			<QueryClientProvider client={queryClient}>
				<AppProviders />
			</QueryClientProvider>
		</ReduxProvider>
	</React.StrictMode>,
);
