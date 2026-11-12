import type { Locale } from "../../types/locale";

const messages = {
	fa: {
		appName: "NOVA مدیریت",
		login: "ورود",
		loginTitle: "ورود به پنل مدیریت",
		loginDescription: "برای ادامه، نام کاربری و رمز عبور خود را وارد کنید.",
		username: "نام کاربری",
		password: "رمز عبور",
		usernameRequired: "نام کاربری الزامی است.",
		passwordRequired: "رمز عبور الزامی است.",
		loginNetworkError: "ارتباط با سرویس برقرار نشد. اتصال خود را بررسی و دوباره تلاش کنید.",
		loginInvalidCredentials: "نام کاربری یا رمز عبور معتبر نیست.",
		loginServerError: "ورود انجام نشد. کمی بعد دوباره تلاش کنید.",
		loginUnknownError: "خطای ناشناخته‌ای هنگام ورود رخ داد.",
		loggingIn: "در حال ورود…",
		switchLanguage: "تغییر زبان",
		languageEnglish: "English",
		languagePersian: "فارسی",
		toggleTheme: "تغییر پوسته",
		darkMode: "پوستهٔ تیره",
		lightMode: "پوستهٔ روشن",
		products: "محصولات",
		users: "کاربران",
		productsDescription:
			"اتصال فهرست محصولات در مرحلهٔ بعد تکمیل می‌شود.",
		usersDescription: "اتصال فهرست کاربران در مرحلهٔ بعد تکمیل می‌شود.",
		logout: "خروج",
		dashboardTitle: "مدیریت فروشگاه",
		dashboardDescription: "برای شروع، یکی از بخش‌های پنل را انتخاب کنید.",
		setupTitle: "اسکلت پنل آماده است",
		setupDescription:
			"پس از نصب وابستگی‌ها، اتصال سرویس و صفحه‌های مدیریتی را تکمیل کنید.",
	},
	en: {
		appName: "NOVA Admin",
		login: "Login",
		loginTitle: "Sign in to NOVA Admin",
		loginDescription: "Enter your username and password to continue.",
		username: "Username",
		password: "Password",
		usernameRequired: "Username is required.",
		passwordRequired: "Password is required.",
		loginNetworkError: "Could not connect to the service. Check your connection and try again.",
		loginInvalidCredentials: "The username or password is incorrect.",
		loginServerError: "Sign in failed. Please try again shortly.",
		loginUnknownError: "An unexpected sign-in error occurred.",
		loggingIn: "Signing in…",
		switchLanguage: "Switch language",
		languageEnglish: "English",
		languagePersian: "فارسی",
		toggleTheme: "Toggle color theme",
		darkMode: "Dark theme",
		lightMode: "Light theme",
		products: "Products",
		users: "Users",
		productsDescription:
			"The product list will be connected in the next implementation step.",
		usersDescription:
			"The user list will be connected in the next implementation step.",
		logout: "Logout",
		dashboardTitle: "Store administration",
		dashboardDescription: "Choose a section to get started.",
		setupTitle: "Admin scaffold is ready",
		setupDescription:
			"Install the dependencies to continue with API integration and admin pages.",
	},
} satisfies Record<Locale, Record<string, string>>;

export function getMessages(locale: Locale) {
	return messages[locale];
}
