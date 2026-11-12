import { Navigate, Outlet, useLocation } from "react-router-dom";
import { publicRoutePaths } from "../shared/data/routes/route-paths";
import { useAppSelector } from "../shared/lib/redux/hooks";

export function ProtectedRoute() {
	const token = useAppSelector((state) => state.auth.token);

	const location = useLocation();

	if (!token) {
		return (
			<Navigate
				to={publicRoutePaths.login}
				replace
				state={{ from: location.pathname }}
			/>
		);
	}

	return <Outlet />;
}
