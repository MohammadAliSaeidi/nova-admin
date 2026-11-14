import { useFormik } from "formik";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../../../shared/components/ui/button";
import { FormField } from "../../../shared/components/ui/form-field";
import { Input } from "../../../shared/components/ui/input";
import { useMessages } from "../../../shared/data/dictionary/use-messages";
import { routePaths } from "../../../shared/data/route-paths";
import { useAppSelector } from "../../../shared/lib/redux/hooks";
import { useCreateUser } from "../hooks/use-create-user";
import { createUserSchema } from "../schemas/create-user-schema";
import type { CreateUserValues } from "../types/create-user-values";
import { getCreateUserErrorMessage } from "../utils/get-create-user-error-message";

const initialValues: CreateUserValues = {
	firstName: "",
	lastName: "",
	username: "",
	email: "",
	password: "",
	phone: "",
};

const Heading = styled.h1`
	margin-block: 22px 8px;
`;

const Description = styled.p`
	color: ${({ theme }) => theme.colors.muted};
`;

const Form = styled.form`
	max-width: 760px;
`;

const Fields = styled.fieldset`
	display: grid;
	grid-template-columns: repeat(2, minmax(0, 1fr));
	gap: 18px;
	border: 0;
	padding: 0;
	margin: 0;

	@media (max-width: 900px) {
		grid-template-columns: 1fr;
	}
`;

const Notice = styled.p`
	color: ${({ theme }) => theme.colors.danger};
`;

const Actions = styled.div`
	display: flex;
	gap: 10px;
	margin-block-start: 22px;
`;

export default function CreateUserPage() {
	const locale = useAppSelector((state) => state.preferences.locale);
	const messages = useMessages();
	const navigate = useNavigate();
	const createUser = useCreateUser();
	const validationSchema = useMemo(() => createUserSchema(locale), [locale]);
	const formik = useFormik<CreateUserValues>({
		initialValues,
		validationSchema,
		onSubmit: async (values, helpers) => {
			helpers.setStatus(undefined);
			try {
				const created = await createUser.submitUser(values);
				if (!created) {
					await helpers.setFieldValue("password", "", false);
					return;
				}
				helpers.resetForm({ values: initialValues });
				navigate(routePaths.users, {
					replace: true,
					state: { userCreated: true },
				});
			} catch (error: unknown) {
				await helpers.setFieldValue("password", "", false);
				helpers.setStatus(getCreateUserErrorMessage(error, locale));
			}
		},
	});
	const pending = formik.isSubmitting || createUser.isPending;

	function fieldError(name: keyof CreateUserValues) {
		return formik.touched[name] ? formik.errors[name] : undefined;
	}
	function renderField(
		name: keyof CreateUserValues,
		label: string,
		type: string,
		autoComplete: string,
	) {
		const error = fieldError(name);
		const id = `user-${name}`;
		return (
			<FormField id={id} label={label} error={error}>
				<Input
					id={id}
					name={name}
					type={type}
					required
					autoComplete={autoComplete}
					dir={
						name === "email" ||
						name === "username" ||
						name === "phone"
							? "ltr"
							: undefined
					}
					value={formik.values[name]}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					aria-invalid={Boolean(error)}
					aria-describedby={error ? `${id}-error` : undefined}
				/>
			</FormField>
		);
	}

	return (
		<section>
			<Heading>{messages.createUserHeading}</Heading>
			<Description>{messages.createUserDescription}</Description>
			<Form onSubmit={formik.handleSubmit} noValidate>
				<Fields disabled={pending} aria-label={messages.createUserHeading}>
					{renderField(
						"firstName",
						messages.firstName,
						"text",
						"given-name",
					)}
					{renderField(
						"lastName",
						messages.lastName,
						"text",
						"family-name",
					)}
					{renderField("username", messages.username, "text", "username")}
					{renderField("email", messages.email, "email", "email")}
					{renderField(
						"password",
						messages.password,
						"password",
						"new-password",
					)}
					{renderField("phone", messages.phone, "tel", "tel")}
				</Fields>
				{typeof formik.status === "string" && (
					<Notice role="alert">{formik.status}</Notice>
				)}
				<Actions>
					<Button type="submit" disabled={pending}>
						{pending ? messages.creatingUser : messages.createUser}
					</Button>
					<Button
						type="button"
						variant="outline"
						disabled={pending}
						onClick={() => navigate(routePaths.users)}
					>
						{messages.cancel}
					</Button>
				</Actions>
			</Form>
		</section>
	);
}
