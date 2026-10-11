# Rasa Panel changes

## 2026-10-11 — Rasa theme refinement

- Restored the original dashboard statistics arrangement, navigation density, table spacing, page header and centered login layout.
- Removed the added welcome banner and desktop split-login composition.
- Set the default Rasa palette to charcoal with teal accents, coordinated chart colors and readable contrast in light and dark mode.
- Kept existing theme selections and customization controls; the revised palette applies to the Default theme.
- Kept Rasa logos, labels, documentation links and the existing API and permission behavior.

## 2026-10-11 — Rasa workspace redesign

- Rebuilt the dashboard layout: branded welcome banner and permission-aware create-user action, three user KPIs, separate CPU/RAM/disk meters, traffic breakdown and uptime.
- Replaced the centered desktop login card with a two-column brand and authentication layout; retained owner setup, Telegram login, language and theme controls.
- Redesigned navigation with prominent active items, spaced icon buttons and quieter section labels.
- Restyled shared tables with clearer headers, alternating rows, selection and hover states, and RTL-aligned headings.
- Preserved the existing theme palette, API data sources, administration permissions and user workflows.
- Added translated welcome headings in all four supported languages.

## 2026-10-11 — Interface and documentation update

- Restyled login surface, sidebar brand header, active navigation, cards and page headings using the existing theme tokens.
- Kept light/dark customization, mobile layout, RTL and administration routes.
- Expanded English and Persian guides with features, Docker installation, configuration, user/node setup, subscriptions, updates, backup/restore and troubleshooting.
- Page help links now use the corresponding Rasa repository guide when no documentation site is configured.
- Added an isolated Docker interface build stage; host-side Bun is no longer required for Docker installation.
- Excluded local data, compiled interface output and SQLite sidecar files from the Docker context.

Based on upstream 5.4.1; this date identifies the Rasa changes and is not an upstream release number. Existing test and typecheck limitations are recorded in VALIDATION.md.
