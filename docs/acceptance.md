# Acceptance checklist

Unchecked means unverified. Run after installing dependencies and implementing the relevant behavior.

## Auth and shell

- [ ] Direct signed-out access to each protected route redirects to login.
- [ ] Invalid API credentials show translated feedback; valid login enters the panel.
- [ ] Submission locks while pending; password stays out of stores/caches/logs.
- [ ] Logout clears token and private query/mutation caches; pending old-session work cannot restore data. Cache clearing and the product mutation session guard are implemented; verify in browser.
- [ ] Language/theme controls work on login and protected pages.

The challenge does not specify refresh persistence. The current Redux-memory choice starts signed out after reload; section 6 prefers a server-issued secure HttpOnly cookie only when the backend supports it. Persistent sessions would require a backend-supported design and separate CSRF review.

## Products

- [ ] Real image/title/price/category table, local search and stable keys. (Implemented; verify in browser.)
- [ ] Loading, error+retry, empty dataset and no search results are handled. (Implemented; verify in browser.)
- [ ] Five-field create validation; invalid submit sends no POST. (Implemented; verify in browser/API.)
- [ ] Categories have load/error/retry; price >0 and image URL validated. (Implemented; verify in browser/API.)
- [ ] Success cancels an in-flight product-list request and adds a sanitized temporary row to the owning Query cache. With a cold cache, the remote list is loaded and combined; if that GET fails after POST success, the row remains visible in an explicitly incomplete list with a retry action. Failed POST adds none; success feedback survives navigation. (Implemented; verify in browser/API.)
- [ ] A later API refetch may replace the temporary mock row; repeated mock IDs cannot collide with row identity. (Implemented; verify in browser/API.)

## Users

- [ ] Real searchable name/username/email/phone table with required data states. (Implemented; verify in browser.)
- [ ] Six-field create validation, pending lock and translated feedback. (Implemented; verify in browser/API.)
- [ ] Name payload mapped outside JSX; sanitized created row is searchable in the users Query cache. (Implemented; verify in browser/API.)
- [ ] No passwords in list data, Redux, cached mutation results, logs or storage. (Implemented by projection and mutation without credential variables; verify in browser/API.)
- [ ] Ten-row local pagination follows filtered users and stores the selected page in the `page` search param. (Implemented; verify in browser.)

## Delivery

- [ ] Both languages/themes work on every route at 1280px with visible keyboard focus.
- [ ] Labels/directions work, including email/URL fields in RTL.
- [ ] Typecheck/lint/build pass after lockfile-based installation.
- [ ] Direct route refresh works on intended host.
- [ ] README/env example/API limitations/time/known defects accurate.
- [ ] Real API evidence distinguished from fixtures; screenshots recorded if available.

Do not check items based on file existence. Record observed outcomes in the relevant review notes.
