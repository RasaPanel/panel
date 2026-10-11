# Hirkan changes

## 2026-10-11 — Reference layout and subscription refresh

- Restore reference navigation, statistics, settings tabs, UI primitives and localized descriptions.
- Use Hirkan labels and PNG identity throughout the visible interface.
- Coordinate subscription settings, configuration dialogs and both public templates with responsive cards.
- Preserve form payloads, configuration formats, account status restrictions and persistent data paths.
- Name the Compose service `hirkan-panel`; retain existing CLI compatibility aliases.


## 2026-10-11 — Hirkan identity and shared workspace

- Replaced display branding and all packaged logo/favicon assets with Hirkan and the supplied H monogram.
- Restored the exact original default color palette; custom theme choices remain available.
- Grouped existing navigation into operations, infrastructure and administration with unchanged permission gates.
- Unified page action bars, tables, tabs and dialogs, and added a desktop settings navigation column with horizontal mobile navigation.
- Removed the redundant documentation footer from the guides.
- Added Hirkan CLI aliases; existing Compose service names, volume paths and old CLI entrypoints remain compatible with installed deployments.

## 2026-10-11 — Hybrid dashboard and Classic subscription page

- Added circular CPU/RAM/disk gauges with used/total values and loading states, inspired by the 3X-UI overview while retaining the existing administration workflows.
- Added permission-aware quick links to users and nodes and the existing create-user dialog.
- Kept original traffic, user status, worker health and per-admin charts.
- Added the Classic subscription template, preserving the upstream subscription appearance with UTF-8 and mobile viewport metadata, and made it the default in configuration and Compose. Explicit custom template choices remain supported.

## 2026-10-11 — Rasa composition accents

- Kept the original statistics content and controls while arranging CPU/RAM/disk in one row on wide screens, traffic alongside uptime, and users below.
- Added compact section icons to page headings on desktop without extra banner or marketing copy.
- Refined the sidebar brand surface and table header, alternating-row and selection colors.
- Kept mobile/tablet density, theme settings, API data and authorization behavior.

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
