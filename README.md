# NOVA Admin

NOVA Admin is a React dashboard for managing sample products and users through [FakeStoreAPI](https://fakestoreapi.com/). It is one part of the NOVA project; the customer-facing Store is a separate application.

## Requirements

- Node.js 22.12 or newer (Node 20.19 or newer is also supported by Vite 8)
- Bun 1.2.15 or newer

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
| Vite | 8.3.8 | Development server and build |
| TypeScript | 7.0.2 | Type checking |
| Redux Toolkit / React Redux | 2.14.0 / 9.3.1 | Authentication and preferences state |
| TanStack Query | 5.107.1 | Server data queries and mutations |
| React Router | 6.30.6 | Application routes |
| Axios | 1.21.1 | API requests |
| Formik / Yup | 2.4.9 / 1.7.1 | Forms and validation |
| Styled Components | 6.6.0 | Component styling and themes |
| Oxlint | 1.93.0 | Linting |

## Useful commands

| Command | What it does |
| --- | --- |
| `bun run dev` | Starts the local development server |
| `bun run typecheck` | Checks TypeScript types |
| `bun run lint` | Runs Oxlint |
| `bun run build` | Checks types and creates a production build |
| `bun run preview` | Serves the last production build locally |

There is no automated test runner configured yet.

## Project structure

Code is grouped by feature under `src/features` (login, products, and users). `src/app` connects routes and providers, while `src/shared` contains common UI, API, state, localization, and styling code. See [architecture](docs/architecture.md) and [development conventions](docs/conventions.md) for more detail.

The interface is planned for Persian and English, right-to-left and left-to-right layouts, and light and dark themes. API data is for demonstration; this app does not provide a production backend or real authentication.
