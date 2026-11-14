export interface User {
	id: number;
	localId: string;
	firstName: string;
	lastName: string;
	fullName: string;
	username: string;
	email: string;
	phone: string;
}

export interface UserListData {
	users: User[];
	hasBaseList: boolean;
}
