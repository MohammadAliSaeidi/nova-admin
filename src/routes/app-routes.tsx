import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AdminLayout } from "../shared/components/admin-layout";
import { SuspenseWrapper } from "../shared/components/suspense-wrapper";
import { publicRoutePaths, routePaths } from "../shared/data/route-paths";
import { ProtectedRoute } from "./protected-route";
import styled from "styled-components";

const LoginPage = React.lazy(
	() => import("../features/login/pages/login-page"),
);

const ProductsPage = React.lazy(
	() => import("../features/products/pages/products-page"),
);

const CreateProductPage = React.lazy(
	() => import("../features/products/pages/create-product-page"),
);

const UsersPage = React.lazy(() =>
	import("../features/users/pages/users-page").then((module) => ({
		default: module.UsersPage,
	})),
);

const CreateUserPage = React.lazy(
	() => import("../features/users/pages/create-user-page"),
);

const LoginSuspenseWrapper = styled(SuspenseWrapper)`
	height: 100dvh;
`;

export function AppRoutes() {
	return (
		<Routes>
			<Route
				path={publicRoutePaths.login}
				element={
					<LoginSuspenseWrapper>
						<LoginPage />
					</LoginSuspenseWrapper>
				}
			/>
			<Route element={<ProtectedRoute />}>
				<Route element={<AdminLayout />}>
					<Route
						path={routePaths.usersNew}
						element={
							<SuspenseWrapper>
								<CreateUserPage />
							</SuspenseWrapper>
						}
					/>
					<Route
						path={routePaths.productsNew}
						element={
							<SuspenseWrapper>
								<CreateProductPage />
							</SuspenseWrapper>
						}
					/>
					<Route
						path={routePaths.products}
						element={
							<SuspenseWrapper>
								<ProductsPage />
							</SuspenseWrapper>
						}
					/>
					<Route
						path={routePaths.users}
						element={
							<SuspenseWrapper>
								<UsersPage />
							</SuspenseWrapper>
						}
					/>
				</Route>
			</Route>
			<Route
				path="*"
				element={<Navigate to={routePaths.products} replace />}
			/>
		</Routes>
	);
}
