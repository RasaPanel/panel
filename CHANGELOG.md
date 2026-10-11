# Rasa Panel changes

## 2026-10-11 — Interface and documentation update

- Restyled login surface, sidebar brand header, active navigation, cards and page headings using the existing theme tokens.
- Kept light/dark customization, mobile layout, RTL and administration routes.
- Expanded English and Persian guides with features, Docker installation, configuration, user/node setup, subscriptions, updates, backup/restore and troubleshooting.
- Page help links now use the corresponding Rasa repository guide when no documentation site is configured.
- Added an isolated Docker interface build stage; host-side Bun is no longer required for Docker installation.
- Excluded local data, compiled interface output and SQLite sidecar files from the Docker context.

Based on upstream 5.4.1; this date identifies the Rasa changes and is not an upstream release number. Existing test and typecheck limitations are recorded in VALIDATION.md.
