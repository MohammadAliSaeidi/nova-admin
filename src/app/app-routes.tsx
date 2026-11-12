import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "../features/login/pages/login-page";
import { ProductsPage } from "../features/products/pages/products-page";
import { UsersPage } from "../features/users/pages/users-page";
import { AdminLayout } from "../shared/components/admin-layout";
import {
	publicRoutePaths,
	routePaths,
} from "../shared/data/routes/route-paths";
import { ProtectedRoute } from "./protected-route";

export function AppRoutes() {
	return (
		<Routes>
			<Route path={publicRoutePaths.login} element={<LoginPage />} />
			<Route element={<ProtectedRoute />}>
				<Route element={<AdminLayout />}>
					<Route path={routePaths.products} element={<ProductsPage />} />
					<Route path={routePaths.users} element={<UsersPage />} />
				</Route>
			</Route>
			<Route path="*" element={<Navigate to={routePaths.products} replace />} />
		</Routes>
	);
}
