import { LogOut } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { NavLink, Outlet } from "react-router-dom";
import styled from "styled-components";
import { useMessages } from "../data/dictionary/use-messages";
import { routePaths } from "../data/route-paths";
import { useAppDispatch } from "../lib/redux/hooks";
import { clearToken } from "../lib/redux/slices/auth-slice";
import { PreferencesControls } from "./preferences-controls";
import { Button } from "./ui/button";

const Shell = styled.div`
	height: 100vh;
	height: 100dvh;
	overflow: hidden;
	display: grid;
	grid-template-columns: 250px minmax(0, 1fr);
	grid-template-rows: minmax(0, 1fr);
`;

const Sidebar = styled.aside`
	min-height: 0;
	display: flex;
	flex-direction: column;
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
	min-height: 0;
	display: grid;
	grid-template-rows: auto minmax(0, 1fr);
	overflow: hidden;
`;

const Content = styled.div`
	min-width: 0;
	min-height: 0;
	overflow: auto;
	overscroll-behavior: contain;
	padding-inline: 28px;
`;

const Header = styled.header`
	display: flex;
	justify-content: flex-end;
	align-items: center;
	padding: 8px 20px;
	background-color: ${({ theme }) => theme.colors.surface};
`;

const LogoutButton = styled(Button)`
	border: 0;
	border-radius: 10px;
	padding: 10px 16px;
	background: ${({ theme }) => theme.colors.muted};
	color: ${({ theme }) => theme.colors.sidebarText};
	cursor: pointer;
`;

const SidebarPreferences = styled(PreferencesControls)`
	flex-direction: column;
	margin-top: auto;

	& > button {
		width: 100%;
		color: ${({ theme }) => theme.colors.sidebarText};
		border-color: ${({ theme }) => theme.colors.sidebarText};
	}
`;

export function AdminLayout() {
	const dispatch = useAppDispatch();
	const queryClient = useQueryClient();
	const messages = useMessages();
	const handleLogout = () => {
		dispatch(clearToken());
		void queryClient.cancelQueries();
		queryClient.clear();
	};

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
				<SidebarPreferences />
			</Sidebar>

			<Main>
				<Header>
					<LogoutButton
						type="button"
						onClick={handleLogout}
					>
						{messages.logout}
						<LogOut />
					</LogoutButton>
				</Header>

				<Content>
					<Outlet />
				</Content>
			</Main>
		</Shell>
	);
}
