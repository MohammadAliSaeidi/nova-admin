import { useFormik } from "formik";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../../shared/components/ui/button";
import { FormField } from "../../../../shared/components/ui/form-field";
import { Input } from "../../../../shared/components/ui/input";
import { PriceInput } from "../../../../shared/components/ui/price-input";
import { Select } from "../../../../shared/components/ui/select";
import { Textarea } from "../../../../shared/components/ui/textarea";
import { useMessages } from "../../../../shared/data/dictionary/use-messages";
import { routePaths } from "../../../../shared/data/route-paths";
import { useAppSelector } from "../../../../shared/lib/redux/hooks";
import { useCreateProduct } from "../../hooks/use-create-product";
import { useProductCategories } from "../../hooks/use-product-categories";
import { createProductSchema } from "../../schemas/create-product-schema";
import type { CreateProductValues } from "../../types/create-product-values";
import { getCreateProductErrorMessage } from "../../utils/get-create-product-error-message";
import {
	Actions,
	Description,
	Fields,
	Form,
	Heading,
	Notice,
	Status,
} from "./styled-components";

const initialValues: CreateProductValues = {
	title: "",
	description: "",
	price: "",
	category: "",
	imageUrl: "",
};

export default function CreateProductPage() {
	const locale = useAppSelector((state) => state.preferences.locale);
	const messages = useMessages();
	const navigate = useNavigate();
	const categoriesQuery = useProductCategories();
	const createProduct = useCreateProduct();
	const validationSchema = useMemo(
		() => createProductSchema(locale),
		[locale],
	);

	const formik = useFormik<CreateProductValues>({
		initialValues,
		validationSchema,
		onSubmit: async (values, helpers) => {
			helpers.setStatus(undefined);
			try {
				const created = await createProduct.submitProduct(values);
				if (!created) return;

				navigate(routePaths.products, {
					replace: true,
					state: { productCreated: true },
				});
			} catch (error: unknown) {
				helpers.setStatus(
					getCreateProductErrorMessage(error, locale),
				);
			}
		},
	});

	const titleError = formik.touched.title ? formik.errors.title : undefined;
	const descriptionError = formik.touched.description
		? formik.errors.description
		: undefined;
	const priceError = formik.touched.price ? formik.errors.price : undefined;
	const categoryError = formik.touched.category
		? formik.errors.category
		: undefined;
	const imageUrlError = formik.touched.imageUrl
		? formik.errors.imageUrl
		: undefined;
	const optionsAvailable = Boolean(categoriesQuery.data?.length);
	const isPending = formik.isSubmitting || createProduct.isPending;

	return (
		<section>
			<Heading>{messages.createProductHeading}</Heading>
			<Description>{messages.createProductDescription}</Description>
			<Form onSubmit={formik.handleSubmit} noValidate>
				<Fields
					aria-label={messages.createProductHeading}
					disabled={isPending || !optionsAvailable}
				>
					<FormField
						id="product-title"
						label={messages.title}
						error={titleError}
					>
						<Input
							id="product-title"
							name="title"
							autoComplete="off"
							value={formik.values.title}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							aria-invalid={Boolean(titleError)}
							aria-describedby={
								titleError
									? "product-title-error"
									: undefined
							}
						/>
					</FormField>
					<FormField
						id="product-description"
						label={messages.description}
						error={descriptionError}
					>
						<Textarea
							id="product-description"
							name="description"
							value={formik.values.description}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							aria-invalid={Boolean(descriptionError)}
							aria-describedby={
								descriptionError
									? "product-description-error"
									: undefined
							}
						/>
					</FormField>
					<FormField
						id="product-price"
						label={messages.price}
						error={priceError}
					>
						<PriceInput
							id="product-price"
							name="price"
							value={formik.values.price}
							locale={locale}
							onValueChange={(value) => {
								void formik.setFieldValue(
									"price",
									value,
								);
							}}
							onBlur={formik.handleBlur}
							aria-invalid={Boolean(priceError)}
							aria-describedby={
								priceError
									? "product-price-error"
									: undefined
							}
						/>
					</FormField>
					<FormField
						id="product-category"
						label={messages.category}
						error={categoryError}
					>
						<Select
							id="product-category"
							name="category"
							value={formik.values.category}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							aria-invalid={Boolean(categoryError)}
							aria-describedby={
								categoryError
									? "product-category-error"
									: undefined
							}
						>
							<option value="">{messages.category}</option>
							{categoriesQuery.data?.map((category) => (
								<option key={category} value={category}>
									{category}
								</option>
							))}
						</Select>
					</FormField>
					<FormField
						id="product-image-url"
						label={messages.imageUrl}
						error={imageUrlError}
					>
						<Input
							id="product-image-url"
							name="imageUrl"
							type="url"
							dir="ltr"
							autoComplete="url"
							value={formik.values.imageUrl}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							aria-invalid={Boolean(imageUrlError)}
							aria-describedby={
								imageUrlError
									? "product-image-url-error"
									: undefined
							}
						/>
					</FormField>
				</Fields>

				{categoriesQuery.isPending && (
					<Status role="status">
						{messages.loadingCategories}
					</Status>
				)}
				{categoriesQuery.isError && (
					<Notice role="alert">
						{messages.categoriesLoadError}{" "}
						<Button
							type="button"
							disabled={categoriesQuery.isFetching}
							onClick={() =>
								void categoriesQuery.refetch()
							}
						>
							{messages.retry}
						</Button>
					</Notice>
				)}
				{categoriesQuery.data?.length === 0 && (
					<Status role="status">
						{messages.noProductCategories}
					</Status>
				)}
				{typeof formik.status === "string" && (
					<Notice role="alert">{formik.status}</Notice>
				)}
				<Actions>
					<Button
						type="submit"
						disabled={isPending || !optionsAvailable}
					>
						{isPending
							? messages.creatingProduct
							: messages.createProduct}
					</Button>
					<Button
						type="button"
						variant="outline"
						disabled={isPending}
						onClick={() => navigate(routePaths.products)}
					>
						{messages.cancel}
					</Button>
				</Actions>
			</Form>
		</section>
	);
}
