import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Card } from "../../../shared/components/ui/card";
import { routePaths } from "../../../shared/data/route-paths";
import { useAppSelector } from "../../../shared/lib/redux/hooks";
import { PreferencesControls } from "../../../shared/components/preferences-controls";
import { LoginForm } from "../components/login-form";

const Page = styled.main`
	min-height: 100vh;
	display: grid;
	place-items: center;
	padding: 24px;
`;

const LoginCard = styled(Card)`
	width: min(100%, 440px);
	padding: 32px;
`;

const validDestinations = Object.values(routePaths);

function getSafeDestination(destination: unknown): string {
	return (
		validDestinations.find((path) => path === destination) ??
		routePaths.products
	);
}

const LoginPreferences = styled(PreferencesControls)`
	justify-content: flex-end;
	margin-bottom: 24px;
`;

export default function LoginPage() {
	const token = useAppSelector((state) => state.auth.token);
	const hadSessionOnMount = useRef(Boolean(token));
	const location = useLocation();
	const navigate = useNavigate();
	const destination = getSafeDestination(
		(location.state as { from?: unknown } | null)?.from,
	);

	useEffect(() => {
		// Redirect only sessions that existed before the login form mounted.
		if (hadSessionOnMount.current && token) {
			navigate(destination, { replace: true });
		}
	}, [destination, navigate, token]);

	return (
		<Page>
			<LoginCard aria-labelledby="login-title">
				<LoginPreferences />
				<LoginForm destination={destination} />
			</LoginCard>
		</Page>
	);
}
