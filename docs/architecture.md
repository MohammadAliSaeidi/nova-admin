# Architecture

## Placement

```text
src/
  main.tsx                       entry and outer providers
  app/                           provider composition, route elements, guards
  features/
    login/                       login UI, schema, endpoint
    products/                    product domain
    users/                       user domain
  shared/
    components/                  reusable UI and admin shell
    data/internationalization/   fixed UI dictionary
    lib/redux/                   store, typed hooks, auth/preferences
    lib/utils/api/               Axios transport
    routes/                      route path constants only
    styles/                      global styles, theme, theme typing
    types/                       domain-neutral contracts
  assets/                        assets
```

Inside features use `pages`, `components`, `services`, `schemas`, `types`, `hooks`, `model`, `utils` as needed. No empty speculative folders. A feature is a domain, not a second app with duplicate infrastructure.

Allowed imports: `app -> features/shared`, `features -> own feature/shared`, `shared -> shared`. No sibling-feature imports, feature-to-app imports or shared-to-feature imports. `main.tsx` is the entry composition exception. The existing `shared/lib/redux/store.ts` is the sole additional composition exception: it may register feature reducers when added, importing reducers only. Do not move domain slices into shared to evade feature ownership.

Use explicit direct imports. No barrels, generic repository framework, dependency injection container or cross-project imports. New paths use lowercase kebab-case. React exports use PascalCase and named exports; the existing default LoginPage export is retained. No alias is configured; use relative imports.

## Responsibility flow and state

Page -> feature hook -> service -> shared Axios. Services map payloads/project responses. Hooks manage query/mutation lifecycle. Components render and invoke intent handlers. Pure search/merge/calculation functions have no React dependencies.

| State | Owner |
| --- | --- |
| Fetched products/users/categories | TanStack Query |
| Token/preferences | Redux Toolkit |
| Successful mock creates | Feature Redux memory overlays, planned |
| Values/touched/errors/submission | Formik + Yup |
| Search/transient UI | Local state |
| Merged/filtered rows | Derived functions/selectors |

Overlay rows use unique local IDs independent of repeated mock API IDs. Append after success, preserve during refetch, clear on logout/refresh. Prevent pending old-session mutations from repopulating cleared data. Store only display fields, never passwords.

## Routes and shared infrastructure

Path strings: `shared/routes/route-paths.ts`. Registration: `app/app-routes.tsx`. Public `/login`; guarded `/products`, `/products/new`, `/users`, `/users/new`. Create routes currently reuse placeholders and need dedicated pages.

Auth is memory-only. Redux locale/color mode feed document lang/dir and Styled ThemeProvider. Defaults: Persian/light. Preference persistence is unimplemented and not required by the challenge.

Transport owns base URL, timeout and normalized error kinds. Services own endpoint details. UI/schema boundaries translate messages. No silent mock fallback. Current transport still contains Persian messages and needs localization at presentation boundaries.

## Suggested-layout deviation

Challenge `Pages`, domain `Components`, `Validations`, `Utils/services` and domain types map into features. `Shared` maps to `shared/components`; `Dictionary` to `shared/data/internationalization`; `Redux` to `shared/lib/redux`; route composition to `app`; path constants to `shared/routes`; `Utils/api` to `shared/lib/utils/api`. `Storage` is unnecessary until approved persistence exists. This preserves separation while keeping domain changes together.

Legacy Vite App.tsx/App.css/index.css and template assets remain outside the active entry path. Their removal is a separate cleanup; they do not define active styling.
