import { Route, Routes } from "react-router-dom";
import LoginPage from "../features/login/pages/login-page";
import { routePaths } from "../shared/data/routes/route-paths";

export function AppRoutes() {
	return (
		<Routes>
			<Route path={routePaths.login} element={<LoginPage />} />
		</Routes>
	);
}
