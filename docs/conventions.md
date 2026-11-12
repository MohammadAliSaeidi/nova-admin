# Development conventions

## Code and placement

- Functional components, explicit TypeScript contracts, `import type`. Narrow unknown errors; no `any`, broad assertions or relaxed compiler settings to hide failures.
- Domain types live with their feature. User types belong to users. Locale/theme/error contracts belong in shared.
- Exact import casing; `pages` consistently; lowercase kebab-case paths. Read surrounding code and preserve unrelated work.
- `erasableSyntaxOnly` is enabled: use unions/`as const` instead of emitted enums, and explicit class fields instead of constructor parameter properties. Keep named contracts in dedicated files.

## React and state

- One state owner; no mirrored query collections, stored filtered arrays or duplicated totals.
- Derive values directly or in selectors. Effects synchronize external systems; no ad hoc endpoint fetching effects.
- One stable browser QueryClient. Feature-owned query/mutation hooks with stable entity keys. Local search does not change the all-rows query key.
- Separate rendering, orchestration, transport and pure rules. Extract repeated behavior with shared meaning; avoid one-line abstractions and speculative frameworks.
- Keep state at the lowest common owner; lift it only when multiple consumers need it. Use effects to synchronize external systems, not to derive values or respond to user actions.
- Optimize after identifying a measured or concrete render cost. Prefer simpler state placement and component composition before memoization.
- Present loading, empty, expected failure and retry states explicitly at the layer that owns the operation. Reserve route-level error boundaries for unexpected rendering failures; never expose stack traces or raw transport errors.

## Forms and API

- Formik + locale-aware Yup, real labels, touched errors, pending lock, retained values on failure.
- Login: username/password. Product: title/description/positive price/category/image URL. User: first/last name/username/email/password/phone.
- Map nested payloads/numbers outside JSX. Translate category labels, preserve API values.
- UI maps API error kinds to dictionary keys; never display raw transport messages or log request/response bodies containing credentials.
- Project sensitive results before query/mutation consumers. TypeScript response generics do not validate runtime values.

## Styling/localization

- Styled Components and typed theme tokens. Colors belong in theme; global resets belong in global styles; styles stay with their component owner.
- Logical CSS, visible focus, semantic tables/buttons and label associations.
- All fixed visible text, validation/status messages and accessibility labels use bilingual dictionaries. API prose is separate.
- Locale drives dictionary and lang/dir. Verify both languages/themes at >=1280px. Format USD with Intl, without conversion.
- Give every form control an associated visible label. Connect field errors with `aria-describedby`, mark invalid fields, and announce submission feedback. Give icon-only controls an accessible name and keep keyboard focus visible.
- Use stable entity keys for changing lists. Do not add ARIA roles where native HTML semantics already provide them.

## Components and TypeScript

- Keep presentation components driven by props; keep routing, data operations and error mapping in the page/controller or feature hook that owns them.
- Extract a hook when it encapsulates reusable behavior or a meaningful lifecycle. Prefer a pure function when the logic does not need React.
- Avoid `any`, unchecked API payload assumptions and broad type assertions. Narrow `unknown` errors and validate untrusted runtime data at the transport/service boundary where required.
- Keep component and handler names explicit. Avoid defining component types inside render and avoid unstable array-index keys for changing lists.

## Working agreement and checks

Bun is the package manager. Keep dependency changes in package.json and bun.lock together, review the resolved versions, and use frozen-lockfile installation for reproducible checkouts.

For behavioral changes, write a failing behavior test first when a runner exists, implement minimally, then refactor with passing tests. Test observable behavior, business invariants, important failure states and accessible user-facing outcomes; avoid assertions tied to private implementation details. Until the test runner is configured, document manual checks and the automation gap. Documentation and structural changes need checks appropriate to their scope.

After code changes run `bun run typecheck`, `bun run lint`, `bun run build` and affected acceptance scenarios. Record passed, failed and unverified checks separately. Keep commits focused and describe the behavior changed.
