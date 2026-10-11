# Validation — 2026-10-11

## Hirkan workspace

- Clean production build passed. Strict TypeScript has the same 26 baseline diagnostics; none added by this update.
- Subscription regression tests: 9 passed. Python compilation and Hirkan CLI help passed.
- Chromium with synthetic API data: dashboard, user table/create dialog, nodes, hosts, groups, admins, roles, API keys, user/client templates, bulk operations and theme/subscription settings. Desktop and mobile viewport overflow checks passed, including the settings navigation.
- Original default palette matches upstream. Backend schema, subscription formats, volume paths and permission rules unchanged.
- Full backend suite and live server deployment were not repeated for this visual/branding update.

## Hybrid dashboard and Classic subscription

- Frontend production build passed; strict TypeScript diagnostics remain at the 26-error baseline, with no new diagnostics.
- Nine tests passed for Classic account-status rendering, default/custom template selection and the existing subscription hot path.
- Classic preserves the upstream CSS, body and scripts; UTF-8 and viewport metadata are added for reliable character rendering and mobile layout.
- Chromium with fixture data: Persian dark and English light dashboard, mobile layout, existing create-user dialog and permission-restricted actions. No page errors or horizontal overflow in those checks. The populated user table was also checked with fixture data.
- Classic page browser checks: copy confirmation, QR popup, light/dark toggle and mobile viewport all passed.
- Backend protocols, credentials, user links and database schema were not modified. A live production deployment and the full backend suite were not run for this update.

## Rasa composition accents

- Clean frontend build passed; strict TypeScript remains at the 26 recorded baseline diagnostics.
- Local Chromium checks with mocked API data: Persian dark desktop/mobile and English light desktop dashboard, plus read-only access.
- No runtime page errors or horizontal viewport overflow in the checked dashboard layouts.
- API sources, backend, database and permission checks unchanged; no production deployment performed.

## Rasa theme refinement

- Restored dashboard and navigation components from the upstream layout; retained Rasa branding and API configuration.
- Removed the welcome banner and split-login layout, and restored table spacing.
- Changed the Default palette in theme configuration to charcoal/teal; persisted non-default theme choices remain available.
- Local Chromium checks with mock API fixtures: Persian dark desktop/mobile dashboard and login, English light desktop dashboard, and read-only operator dashboard.
- No dashboard runtime errors or horizontal viewport overflow in the checked layouts.
- Clean Vite production build passed. Strict app TypeScript diagnostics remain at the recorded 26-error baseline.
- Browser fixtures are not a production deployment or a backend integration test.

## Rasa workspace redesign

- Clean Vite production build and service-worker generation passed.
- App TypeScript diagnostics remain at 26, matching the recorded pre-redesign baseline; no new diagnostics.
- Local Chromium inspection with mock API fixtures: Persian dark login and dashboard at desktop and 390px mobile, and English light desktop dashboard.
- No page runtime errors or horizontal viewport overflow in those dashboard checks.
- The dashboard create-user action opens the existing user dialog; the action is absent for a read-only operator.
- These browser fixtures validate presentation and client interactions, not a live backend or deployment on the user's server. Full backend regression tests were not repeated for this presentation change.

## Rasa interface/documentation update

The update changes presentation, guide links and Docker build packaging; no
database schema, API route or authorization logic is changed. Production build
and documentation link checks are run for this update. Docker now builds the
frontend in a separate Bun stage; Docker Engine is unavailable locally, so the
new image build and live deployment are not certified here. Login, mobile and
authenticated dashboard appearance have not been browser-validated locally.

## Initial branded distribution

Reference: PasarGuard/panel b56ffe369f542152c52c69733205baeaf3f6e4cd, version 5.4.1.

- Frozen Bun frontend dependencies installed successfully.
- Frozen uv dependencies installed successfully on Python 3.14.8.
- Clean Vite production build and PWA service-worker generation succeeded.
- Python compile checks, shell syntax checks and Rasa CLI version command passed.
- SQLite migration to head succeeded.
- FastAPI lifespan smoke: /health, /dashboard/, /statics/favicon/logo.png returned 200;
  served HTML contains Rasa Panel.
- Full backend suite: 618 passed, 19 skipped, 3 failed.
- Unmodified upstream full suite: exactly the same 618/19/3 result and failing tests.

Existing upstream failures:
1. tests/api/test_node.py::test_node_create_and_modify_schedule_background_reconnect
2. tests/api/test_usage_functions_timezone.py::TestGetUserCountMetricStats::test_single_metric_responses_share_count_logic
3. tests/api/test_usage_functions_timezone.py::TestGetUserCountMetricStats::test_partial_first_bucket_is_excluded

The API client was regenerated from the offline OpenAPI schema with
includeHttpResponseReturnType=false to match the existing ofetch mutator.
Request cancellation options were aligned with the generated RequestInit signature.
Remaining strict TypeScript diagnostics: 26, involving existing subscription form,
notification schema, host transport and filter typings plus Bun test declarations.
The production build succeeds; a completely clean strict typecheck is not claimed.

GitHub publication to RasaPanel/panel was verified by reading the published
brand configuration and NOTICE and inspecting the repository page.
GitHub Actions API CodeQL, Frontend CodeQL and Code Format Checker passed.
All five database jobs passed migration and migration checks, but their test
steps failed. Full CI success is not claimed. The inherited upstream Telegram
workflow failed at startup and was replaced with an inactive, manual Rasa
configuration placeholder; no repository notifications are sent.

No real remote node, real proxy traffic, Docker Engine build, production server
or TLS deployment was available for testing.
Visual browser validation was unavailable because the Chromium download failed.
Repository and organization URLs are configured for RasaPanel. Support is
https://t.me/dev_vexel. Documentation and optional brand endpoints remain
unconfigured. Core/node dependency names and mandatory
license/attribution are preserved. No source concealment claim is made.
