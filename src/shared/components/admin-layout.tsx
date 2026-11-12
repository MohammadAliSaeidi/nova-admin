import { NavLink, Outlet } from "react-router-dom";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../lib/redux/hooks";
import { getMessages } from "../data/dictionary/messages";
import { routePaths } from "../data/route-paths";
import { clearToken } from "../lib/redux/slices/auth-slice";

const Shell = styled.div`
	min-height: 100vh;
	display: grid;
	grid-template-columns: 250px minmax(0, 1fr);
`;

const Sidebar = styled.aside`
	padding: 28px 18px;
	background: ${({ theme }) => theme.colors.sidebar};
	color: ${({ theme }) => theme.colors.sidebarText};
`;

const Brand = styled.div`
	padding: 0 12px 32px;
	font-size: 20px;
	font-weight: 800;
`;

const Navigation = styled.nav`
	display: grid;
	gap: 8px;

	a {
		padding: 12px;
		color: inherit;
		text-decoration: none;
		border-radius: 10px;
		opacity: 0.78;
	}

	a.active {
		background: ${({ theme }) => theme.colors.sidebarActive};
		opacity: 1;
	}
`;

const Main = styled.main`
	min-width: 0;
	padding: 28px 36px;
`;

const Header = styled.header`
	display: flex;
	justify-content: flex-end;
	margin-bottom: 36px;
`;

const LogoutButton = styled.button`
	border: 0;
	border-radius: 10px;
	padding: 10px 16px;
	background: ${({ theme }) => theme.colors.surface};
	color: ${({ theme }) => theme.colors.text};
	cursor: pointer;
`;

export function AdminLayout() {
	const dispatch = useAppDispatch();
	const locale = useAppSelector((state) => state.preferences.locale);
	const messages = getMessages(locale);

	return (
		<Shell>
			<Sidebar>
				<Brand>{messages.appName}</Brand>

				<Navigation>
					<NavLink to={routePaths.products}>
						{messages.products}
					</NavLink>

					<NavLink to={routePaths.users}>
						{messages.users}
					</NavLink>
				</Navigation>
			</Sidebar>

			<Main>
				<Header>
					<LogoutButton
						type="button"
						onClick={() => dispatch(clearToken())}
					>
						{messages.logout}
					</LogoutButton>
				</Header>

				<Outlet />
			</Main>
		</Shell>
	);
}
