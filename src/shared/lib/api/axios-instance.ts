import axios from "axios";
import { ApiError } from "../types/api-error";

const baseURL = import.meta.env.VITE_API_BASE_URL;

export const axiosInstance = axios.create({
	baseURL,
	timeout: 10000,
	headers: {
		"Content-Type": "application/json",
	},
});

axiosInstance.interceptors.response.use(
	(response) => response,

	(error: unknown) => {
		if (!axios.isAxiosError(error)) {
			const apiError = new ApiError(
				"خطای ناشناخته رخ داد.",
				"unknown",
			);
			return Promise.reject(apiError);
		}

		if (!error.response) {
			const apiError = new ApiError(
				"ارتباط با سرویس برقرار نشد.",
				"network",
			);
			return Promise.reject(apiError);
		}

		const status = error.response.status;
		let kind: "unauthorized" | "validation" | "server" | "unknown";
		let message: string;

		if (status === 401) {
			kind = "unauthorized";
			message = "اطلاعات ورود معتبر نیست.";
		} else if (status === 400 || status === 422) {
			kind = "validation";
			message = "درخواست انجام نشد. دوباره تلاش کنید.";
		} else if (status >= 500) {
			kind = "server";
			message = "درخواست انجام نشد. دوباره تلاش کنید.";
		} else {
			kind = "unknown";
			message = "درخواست انجام نشد. دوباره تلاش کنید.";
		}

		const apiError = new ApiError(message, kind, status);
		return Promise.reject(apiError);
	},
);
