import { useFormik } from "formik";
import { LogIn } from "lucide-react";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../../../shared/components/ui/button";
import { FormField } from "../../../shared/components/ui/form-field";
import { Input } from "../../../shared/components/ui/input";
import { useMessages } from "../../../shared/data/dictionary/use-messages";
import {
	useAppDispatch,
	useAppSelector,
} from "../../../shared/lib/redux/hooks";
import { setToken } from "../../../shared/lib/redux/slices/auth-slice";
import { loginSchema } from "../schema";
import { loginRequest } from "../services/login-request";
import { getLoginErrorMessage } from "../utils/get-login-error-message";

const Heading = styled.h1`
	margin: 0 0 8px;
	font-size: 28px;
`;

const Description = styled.p`
	margin: 0 0 28px;
	color: ${({ theme }) => theme.colors.muted};
`;

const Form = styled.form`
	display: grid;
	gap: 18px;
`;

const ErrorNotice = styled.p`
	margin: 0;
	border: 1px solid ${({ theme }) => theme.colors.danger};
	border-radius: 10px;
	padding: 12px;
	color: ${({ theme }) => theme.colors.danger};
`;

interface LoginValues {
	username: string;
	password: string;
}

interface LoginFormProps {
	destination: string;
}

const initialValues: LoginValues = { username: "", password: "" };

export function LoginForm({ destination }: LoginFormProps) {
	const dispatch = useAppDispatch();
	const locale = useAppSelector((state) => state.preferences.locale);
	const messages = useMessages();
	const navigate = useNavigate();
	const validationSchema = useMemo(() => loginSchema(locale), [locale]);

	const formik = useFormik<LoginValues>({
		initialValues,
		validationSchema,
		onSubmit: async (values, helpers) => {
			helpers.setStatus(undefined);
			try {
				const response = await loginRequest({
					username: values.username.trim(),
					password: values.password,
				});

				dispatch(setToken(response.token));
				helpers.resetForm({
					values: {
						username: values.username.trim(),
						password: "",
					},
				});
				navigate(destination, { replace: true });
			} catch (error: unknown) {
				helpers.setStatus(getLoginErrorMessage(error, locale));
			}
		},
	});

	const usernameError = formik.touched.username
		? formik.errors.username
		: undefined;

	const passwordError = formik.touched.password
		? formik.errors.password
		: undefined;

	return (
		<>
			<Heading id="login-title">{messages.loginTitle}</Heading>
			<Description>{messages.loginDescription}</Description>
			<Form onSubmit={formik.handleSubmit} noValidate>
				<FormField
					id="username"
					label={messages.username}
					error={usernameError}
				>
					<Input
						id="username"
						name="username"
						autoComplete="username"
						autoCapitalize="none"
						value={formik.values.username}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						aria-invalid={Boolean(usernameError)}
						aria-describedby={
							usernameError ? "username-error" : undefined
						}
					/>
				</FormField>
				<FormField
					id="password"
					label={messages.password}
					error={passwordError}
				>
					<Input
						id="password"
						name="password"
						type="password"
						autoComplete="current-password"
						value={formik.values.password}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						aria-invalid={Boolean(passwordError)}
						aria-describedby={
							passwordError ? "password-error" : undefined
						}
					/>
				</FormField>
				{typeof formik.status === "string" && (
					<ErrorNotice role="alert">{formik.status}</ErrorNotice>
				)}
				<Button type="submit" disabled={formik.isSubmitting}>
					<LogIn size={16} aria-hidden="true" />
					{formik.isSubmitting
						? messages.loggingIn
						: messages.login}
				</Button>
			</Form>
		</>
	);
}
