# Validation — 2026-10-11

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

No real remote node, real proxy traffic, Docker Engine build, production server,
GitHub publication or TLS deployment was available for testing.
Visual browser validation was unavailable because the Chromium download failed.
Brand endpoints are intentionally empty until the user supplies their GitHub,
documentation and support URLs. Core/node dependency names and mandatory
license/attribution are preserved. No source concealment claim is made.
