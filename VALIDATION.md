# Hirkan validation — 2026-10-11

The administration layout and localized descriptions follow the reference at commit `b56ffe369f542152c52c69733205baeaf3f6e4cd`, with Hirkan branding and responsive subscription surfaces. Backend APIs, database migrations, account permissions, configuration generation and node dependencies are retained.

## Completed checks

- Frozen frontend and backend dependency installation succeeded.
- Vite production build and PWA generation succeeded.
- Subscription schema tests: 2 passed.
- Subscription template tests: 13 passed, covering both bundled templates, every account status, explicit custom-template selection and escaped account/link/announcement values.
- Headless Chromium checks with local fixtures: copy feedback, QR generation, Escape close, theme switching and mobile overflow checks passed.
- Subscription settings with a mocked owner/settings API: editing and saving issued the expected PUT; desktop and mobile rendering passed with no browser page errors.
- Persian mobile rendering displayed Hirkan branding and the RTL interface.
- Python source compilation and whitespace checks passed.
- TypeScript diagnostics were compared against the original checkout. Existing errors remain; this change adds no new diagnostics. The production build does not run the TypeScript checker.

## Scope and deployment

Live node connectivity, client traffic, Docker runtime and external database services were not tested here. UI API checks used fixtures, not a production server.

The Compose service is now `hirkan-panel`. Stop the previous Compose installation before replacing the source, and preserve `.env` and `data/`. Existing container data paths and CLI aliases remain compatible. Configured custom templates take precedence over bundled templates.

Required upstream attribution and dependency names remain in source/license materials; visible panel branding is Hirkan. Supplied PNG logo and favicon assets are retained.
