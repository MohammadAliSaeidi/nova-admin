import { useLocation } from "react-router-dom";
import { Button, LinkButton } from "../../../shared/components/ui/button";
import { SearchablePaginatedList } from "../../../shared/components/ui/searchable-paginated-list";
import { useMessages } from "../../../shared/data/dictionary/use-messages";
import { routePaths } from "../../../shared/data/route-paths";
import { useAppSelector } from "../../../shared/lib/redux/hooks";
import { useUsers } from "../hooks/use-users";
import { searchUsers } from "../utils/search-users";
import { UsersTable } from "../components/users-table";
import {
	PageContent,
	PageHeading,
	Results,
	Status,
} from "../components/users-page-styles";

const USERS_PER_PAGE = 10;

function hasUserCreatedNotice(state: unknown): boolean {
	return (
		typeof state === "object" &&
		state !== null &&
		"userCreated" in state &&
		state.userCreated === true
	);
}

export function UsersPage() {
	const locale = useAppSelector((state) => state.preferences.locale);
	const messages = useMessages();
	const location = useLocation();
	const usersQuery = useUsers();
	const allUsers = usersQuery.data?.users;
	const heading = (
		<PageHeading>
			<h1>{messages.users}</h1>
			<LinkButton to={routePaths.usersNew}>{messages.createUser}</LinkButton>
		</PageHeading>
	);
	if (usersQuery.isPending && !allUsers) {
		return (
			<PageContent>
				{heading}
				<Status role="status">{messages.loadingUsers}</Status>
			</PageContent>
		);
	}
	if (usersQuery.isError && !allUsers) {
		return (
			<PageContent>
				{heading}
				<Status role="alert">
					{messages.usersLoadError}
					<Button
						type="button"
						disabled={usersQuery.isFetching}
						onClick={() => void usersQuery.refetch()}
					>
						{messages.retry}
					</Button>
				</Status>
			</PageContent>
		);
	}

	return (
		<PageContent>
			{heading}
			{hasUserCreatedNotice(location.state) && (
				<Status role="status">{messages.userCreated}</Status>
			)}
			{usersQuery.data && !usersQuery.data.hasBaseList && (
				<Status role="alert">
					{messages.usersListIncomplete}
					<Button
						type="button"
						disabled={usersQuery.isFetching}
						onClick={() => void usersQuery.refetch()}
					>
						{messages.retry}
					</Button>
				</Status>
			)}
			<SearchablePaginatedList
				id="users-search"
				label={messages.searchUsers}
				items={allUsers ?? []}
				dataReady={allUsers !== undefined}
				searchItems={searchUsers}
				pageSize={USERS_PER_PAGE}
				locale={locale}
				paginationLabel={messages.usersPaginationLabel}
				previousLabel={messages.previousPage}
				nextLabel={messages.nextPage}
				pageSummary={messages.pageSummary}
				afterSearch={usersQuery.isError && (
					<Status role="alert">
						{messages.usersLoadError}
						<Button
							type="button"
							disabled={usersQuery.isFetching}
							onClick={() => void usersQuery.refetch()}
						>
							{messages.retry}
						</Button>
					</Status>
				)}
				renderResults={(users, visibleUsers) => (
					<Results>
						{users.length === 0 ? (
							<Status role="status">
								{allUsers && allUsers.length > 0
									? messages.noUsersMatch
									: messages.noUsers}
							</Status>
						) : (
							<UsersTable
								users={visibleUsers}
								messages={messages}
								isFetching={usersQuery.isFetching}
							/>
						)}
					</Results>
				)}
			/>
		</PageContent>
	);
}
