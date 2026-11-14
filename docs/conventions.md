# Development conventions

These conventions describe the current Admin codebase. The technical challenge defines required behavior and technology; conventions below guide implementation choices and do not add product requirements.

## Code organization and TypeScript

- Keep feature code in its owning `src/features/<feature>` folder. Put only cross-feature code in `src/shared`; see [architecture](architecture.md).
- Use functional React components and explicit TypeScript contracts. Import types with `import type` when applicable.
- Preserve exact import casing. Use lowercase kebab-case for file and folder names; use the existing `pages`, `components`, `hooks`, `schemas`, `services`, `types`, `utils`, and `queries` subfolder names where appropriate.
- The project enables `erasableSyntaxOnly`; prefer string unions or `as const` objects over emitted TypeScript enums.
- Avoid `any`, unchecked API assumptions, and broad type assertions. Treat external values as `unknown` until narrowed or validated.

## React and state

- Keep one owner for each piece of state. TanStack Query owns remote data, Redux Toolkit owns auth/preferences, Formik owns form state, and local state owns short-lived UI state.
- Derive filtered rows, totals, and display values from their source rather than storing duplicate copies.
- Use effects to synchronize with external systems, such as document language/direction. Avoid effects for values that can be derived during render or for handling direct user actions.
- Keep feature hooks responsible for meaningful React/query lifecycles; keep transport in services and framework-independent rules in pure functions.
- Render loading, empty, expected error, retry, and success feedback for the operation that owns each state. Reserve route-level error boundaries for unexpected rendering failures.
- Optimize after identifying a concrete performance issue. Prefer straightforward state placement and component composition before memoization.

## Forms and API

- Use Formik and Yup for forms. Provide visible labels, localized validation feedback, and a pending state. Retain non-sensitive values after failure when useful; clear credentials according to the owning feature's security behavior.
- Keep payload mapping and response projection out of JSX and in the feature service or a focused feature utility.
- Use the shared Axios client. Map transport failures to safe UI messages; do not display raw transport messages or log credential-bearing request/response bodies.
- TypeScript types alone do not validate API responses. Validate/project untrusted API data at the service boundary where required by the feature contract.
- Keep passwords and other sensitive fields out of Redux, Query data, local storage, and logs unless a specific approved design requires otherwise.

## Styling, localization, and accessibility

- Use Styled Components and the typed theme tokens. Keep global resets in global styles and component-specific styles with their component owner.
- Prefer logical CSS properties for RTL/LTR layouts. Keep keyboard focus visible and use native semantic elements where possible.
- Source fixed visible text, validation/status messages, and accessibility labels from both Persian and English dictionary resources. API-provided content is data, not dictionary copy.
- Redux preferences own the selected locale and theme. Locale controls document `lang`/`dir`; keep direction-sensitive inputs and icons usable in both directions.
- Associate each form control with a visible label, connect field errors with `aria-describedby`, and mark invalid fields. Give icon-only controls accessible names and announce important submission feedback.
- Use stable entity keys for changing lists; do not use array indexes as keys for mutable data.

## Package and verification workflow

- Bun is the package manager. Dependency changes belong in `package.json` and `bun.lock` together; do not hand-edit lockfile resolutions.
- Available project checks are `bun run typecheck`, `bun run lint`, and `bun run build`. Report which commands and user flows were actually checked; source inspection is not runtime acceptance.
- No automated test runner is currently configured. Record the manual acceptance scenarios that remain unverified; do not describe them as passed.
- Keep documentation aligned with the implementation and distinguish challenge requirements, project choices, implementation status, and verified behavior.
