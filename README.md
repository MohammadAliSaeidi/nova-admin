# NOVA Admin

NOVA Admin is a React dashboard for managing sample products and users through [FakeStoreAPI](https://fakestoreapi.com/). It is one part of the NOVA project; the customer-facing Store is a separate application.

## Requirements

- Node.js 22.12 or newer (Node 20.19 or newer is also supported by [Vite 8](https://vite.dev/guide/))
- Bun 1.2.15

The project was set up with Node.js 22.14.0 and Bun 1.2.15. Bun installs packages and runs the project scripts.

## Get started

From this directory, install the dependencies already listed in `package.json`:

```sh
bun install
```

Create the local environment file. On macOS or Linux:

```sh
cp .env.example .env.local
```

In PowerShell:

```powershell
Copy-Item .env.example .env.local
```

Then start the development server:

```sh
bun run dev
```

The app uses `VITE_API_BASE_URL` to connect to FakeStoreAPI. Vite exposes `VITE_` variables to the browser, so keep credentials and other secrets out of them.

## Main tools

Versions below are the ones resolved in `bun.lock`.

| Tool | Version | Used for |
| --- | --- | --- |
| React / React DOM | 19.3.1 | User interface |
| Vite | 8.3.8 | Development and build |
| TypeScript | 7.0.2 | Type checking |
| Redux Toolkit / React Redux | 2.14.0 / 9.3.1 | Authentication and preferences state |
| i18next / react-i18next | 27.1.1 / 18.0.1 | Typed Persian/English translation resources and React UI integration |
| TanStack Query | 5.107.1 | Server data, mutations, and temporary product-create cache updates |
| React Router | 6.30.6 | Application routes |
| Axios | 1.21.1 | API requests |
| Formik / Yup | 2.4.9 / 1.7.1 | Forms and validation |
| Styled Components | 6.6.0 | Component styling and themes |
| Oxlint | 1.93.0 | Linting |

## Useful commands

| Command | What it does |
| --- | --- |
| `bun run dev` | Starts the development server |
| `bun run typecheck` | Checks TypeScript types |
| `bun run lint` | Runs Oxlint |
| `bun run build` | Checks types and creates a production build |
| `bun run preview` | Serves the last production build locally |

There is no automated test runner configured yet.

## Authentication storage

The challenge's section 3.2 requires managing a token if login returns one. Section 6 prefers a server-issued `HttpOnly`, `Secure`, `SameSite` cookie when the backend supports it. This frontend calls FakeStoreAPI directly and has no owned backend/BFF to issue that cookie, so the current implementation keeps the token in Redux memory. Reloading starts signed out. The challenge does not state that a session must survive refresh.

## Project structure

The source uses a feature-based structure. Login, products, and users each keep their pages, components, hooks, schemas, types, and API services together; domain-neutral UI and infrastructure live in `shared`, while route registration and guards live in `routes`:

```text
src/
├── features/{login,products,users}/
├── routes/
├── shared/
└── main.tsx
```

This is a justified change from the challenge's illustrative section 3.3 layout: keeping each domain's UI, validation, requests, and types together makes the current feature boundaries easier to follow and change. Shared cross-feature components and infrastructure remain centralized. Redux owns authentication and preferences; TanStack Query owns remote product/user/category data and mutation cache updates; Formik owns form state.

See [architecture](docs/architecture.md) and [development conventions](docs/conventions.md) for placement and import boundaries.

The interface supports Persian and English through `src/shared/data/dictionary/fa.json` and `en.json`, loaded with react-i18next; Redux preferences remains the locale owner and controls document language/direction. The interface also supports right-to-left and left-to-right layouts, and light and dark themes. API data is for demonstration; this app does not provide a production backend or real authentication.

Successful Admin product creates appear in the searchable list through its TanStack Query cache. The mutation cancels an in-flight list request before adding the sanitized response. If the list is not cached, it loads the remote list first and combines both results. If that GET fails after the POST succeeds, the created row remains visible with an incomplete-list warning and retry action. A later API refetch, reload, or logout can remove the temporary row; it is not synchronized to the separate Store project.

Users can be listed and searched, and a create-user form is available. FakeStoreAPI is a demo service: successful POST responses are not durable, so created records are shown temporarily in the current app cache and may disappear after a reload or refetch. Authentication is also a frontend demo and does not secure a production backend.

## Build and verification

Run `bun run build` for the production build. The last recorded Admin build, typecheck, and lint passed on Windows; browser/API acceptance, a clean install, and case-sensitive-host behavior have not been verified. The challenge asks for the actual time spent; that time was not recorded, so it is intentionally not estimated here. No screenshots are included yet.
