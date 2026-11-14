# Architecture

NOVA Admin is a single React/Vite application organized by feature. The challenge's section 3.3 shows a layer-oriented folder proposal; this project groups domain code by feature so that each feature's screens, validation, API operations, and types stay together. Shared UI and cross-feature infrastructure remain under `shared`. This is a documented project choice, not a requirement imposed by the challenge.

```text
src/
├── features/
│   ├── login/       pages, components, schema, services, types, utils
│   ├── products/   pages, components, hooks, schemas, services, types, utils, queries
│   └── users/      pages, components, hooks, schemas, services, types, utils, queries
├── routes/         route composition, providers, protected-route guard
├── shared/
│   ├── components/ reusable UI and application shell
│   ├── data/       dictionaries, route paths
│   ├── hooks/      cross-feature hooks
│   ├── lib/        Axios client, Redux setup, generic utilities
│   ├── styles/     themes, global styles, typography
│   └── types/      cross-feature contracts
└── main.tsx        Vite entry point
```

## Placement and dependencies

- A feature owns its page-level composition and domain-specific components, hooks, schemas, services, types, query helpers, and pure utilities. Keep these beside the feature that uses them.
- `shared` is for domain-neutral code used across features. Do not move feature-specific logic there just to make it globally importable.
- `routes` composes the application, router, providers, route paths, and authentication guard. It may connect features; one feature should not import another feature's internals.
- Feature hooks coordinate React and asynchronous state. Services perform HTTP calls and map/validate API data. Pure utilities do not depend on React or transport.
- Keep imports direct and boundaries explicit. Add abstractions or shared exports only when there is a concrete repeated use.

## State ownership

| Data | Owner |
| --- | --- |
| Authentication token and user preferences | Redux Toolkit |
| Remote products, categories, and users | TanStack Query |
| Temporary rows returned by create mutations | The corresponding feature's TanStack Query cache |
| Form values, touched fields, validation and submission | Formik with Yup schemas |
| Search input and other short-lived UI state | Local React state or the shared URL-backed pagination/search hooks, according to the feature |
| Display values derived from fetched data | Pure functions or render-time derivation |

Do not mirror remote collections in Redux or store values that can be derived from their source.

## API and session behavior

All requests use the shared Axios instance at `shared/lib/api/axios-instance.ts`; its base URL comes from `VITE_API_BASE_URL`. Feature services own endpoint calls and feature-specific response projection. UI code consumes typed service/query results rather than shaping raw transport data. TypeScript response generics do not validate data at runtime.

FakeStoreAPI is a demonstration API and does not durably persist create operations. Product and user create results may be shown temporarily in their Query caches and may disappear after a later refetch or reload. The product create flow has explicit in-flight request and session-generation handling; do not assume other mutations have the same behavior without checking their implementation.

The demo login keeps the token in Redux memory. There is no owned backend/BFF to issue an HttpOnly cookie, so reload starts signed out. Logout clears authentication and private Query cache data. This is a frontend demo, not a production authorization boundary.

## Localization and theme

Persian and English messages are JSON resources under `shared/data/dictionary`, loaded through i18next/react-i18next. Redux preferences own the selected locale and color mode; the application provider synchronizes locale to i18next and the document's `lang` and `dir`. Styled Components receives a theme created from the selected color mode. Keep fixed visible UI text, validation feedback, status text, and accessible labels in both dictionaries.

See the [README](../README.md) for setup and known limitations, and [conventions](conventions.md) for implementation practices.
