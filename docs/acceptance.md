# Acceptance checklist

Unchecked means unverified. Run after installing dependencies and implementing the relevant behavior.

## Auth and shell

- [ ] Direct signed-out access to each protected route redirects to login.
- [ ] Invalid API credentials show translated feedback; valid login enters the panel.
- [ ] Submission locks while pending; password stays out of stores/caches/logs.
- [ ] Logout clears token/overlays/private queries; pending old-session work cannot restore them.
- [ ] Refresh signs out as documented.
- [ ] Language/theme controls work on login and protected pages.

## Products

- [ ] Real image/title/price/category table, local search and stable keys.
- [ ] Loading, error+retry, empty dataset and no search results are handled.
- [ ] Five-field create validation; invalid submit sends no POST.
- [ ] Categories have load/error/retry; price >0 and image URL validated.
- [ ] Success adds a sanitized temporary row; failure adds none; success feedback survives navigation.
- [ ] Refetch preserves overlay; repeated mock IDs cannot collide with row identity.

## Users

- [ ] Real searchable name/username/email/phone table with required data states.
- [ ] Six-field create validation, pending lock and translated feedback.
- [ ] Name payload mapped outside JSX; created row immediately searchable.
- [ ] No passwords in list data, Redux, cached mutation results, logs or storage.

## Delivery

- [ ] Both languages/themes work on every route at 1280px with visible keyboard focus.
- [ ] Labels/directions work, including email/URL fields in RTL.
- [ ] Typecheck/lint/build pass after lockfile-based installation.
- [ ] Direct route refresh works on intended host.
- [ ] README/env example/API limitations/time/known defects accurate.
- [ ] Real API evidence distinguished from fixtures; screenshots recorded if available.

Do not check items based on file existence. Record observed outcomes in delivery status.
