<p align="center">
  <img src="interface/public/statics/favicon/logo-dark.png" width="112" alt="Hirkan logo">
</p>
<h1 align="center">Hirkan</h1>
<p align="center"><strong>A unified dashboard for users, proxy nodes and subscriptions</strong></p>
<p align="center">
  <a href="README-fa.md">فارسی</a> · <a href="#installation">Installation</a> · <a href="#features">Features</a> · <a href="https://t.me/dev_vexel">Support</a>
</p>
<p align="center">
  <a href="LICENSE"><img alt="License: AGPL v3" src="https://img.shields.io/badge/license-AGPL_v3-315fa8?style=flat-square"></a>
  <img alt="Python 3.14+" src="https://img.shields.io/badge/Python-3.14+-315fa8?style=flat-square">
  <img alt="React interface" src="https://img.shields.io/badge/interface-React-315fa8?style=flat-square">
  <a href="https://github.com/RasaPanel/panel"><img alt="Source code" src="https://img.shields.io/badge/source-Hirkan-315fa8?style=flat-square"></a>
</p>

Hirkan brings user administration, distributed nodes, subscriptions and usage monitoring into one multilingual interface. The Python backend exposes a REST API; the React interface supports desktop and mobile, right-to-left languages, and customizable light and dark themes.

This is a modified distribution of PasarGuard 5.4.1. The original license and contributor attribution are preserved in [LICENSE](LICENSE) and [NOTICE](NOTICE).

**Contents:** [Features](#features) · [Installation](#installation) · [Configuration](#configuration) · [Users](#users) · [Nodes](#nodes) · [Subscriptions](#subscriptions) · [Updating](#updating) · [Backups](#backups) · [Troubleshooting](#troubleshooting) · [Development](#development)

<a id="features"></a>
## Features

| Area | Capabilities |
| --- | --- |
| Users | Traffic quotas, expiry dates, periodic resets, device limits, templates and bulk operations |
| Infrastructure | Multiple nodes, core configuration, node logs and usage statistics |
| Protocols | VLESS, VMess, Trojan, Shadowsocks, WireGuard and Hysteria2, subject to node/core support |
| Transport | TLS, REALITY and customizable host/inbound settings |
| Subscriptions | Client templates, share links, QR codes and V2ray/Clash-compatible output |
| Administration | Multiple admins, scoped RBAC permissions, API keys and CLI tools |
| Integrations | Panel Telegram integration, webhooks and notification settings |
| Interface | Persian/RTL, English and additional bundled translations; light/dark themes, density and color settings |

Hirkan uses grouped navigation, circular resource gauges, a unified page toolbar, structured tables and consistent dialog surfaces. The original default palette and existing management capabilities are preserved.

<a id="installation"></a>
## Installation

Use a Linux server with Git, Docker Engine and the Docker Compose plugin. The included Compose file uses host networking. Keep the chosen listening port available. A direct HTTPS deployment also needs a valid certificate and its private key for your domain.

```bash
git clone https://github.com/RasaPanel/panel.git
cd panel
cp .env.example .env
mkdir -p data/certs
```

Place your certificate chain in `data/certs/fullchain.pem` and private key in `data/certs/key.pem`. Set the following in `.env`:

```dotenv
UVICORN_HOST=0.0.0.0
UVICORN_PORT=8443
UVICORN_SSL_CERTFILE=/var/lib/rasa-panel/certs/fullchain.pem
UVICORN_SSL_KEYFILE=/var/lib/rasa-panel/certs/key.pem
```

```bash
docker compose up -d --build
docker compose exec rasa-panel python hirkan-cli.py generate-temp-key
```

Open `https://YOUR_DOMAIN:8443/dashboard/`. Choose owner setup and use the temporary key to create the first owner. The key is a setup credential; keep it private.

Docker compiles the frontend in an isolated Bun stage and builds Python dependencies using the frozen uv lockfile. Node.js and Bun are not required on the host. The first build downloads dependencies; existing running deployments are not updated until you explicitly rebuild them.

<a id="configuration"></a>
## Configuration

| Setting | Purpose |
| --- | --- |
| `.env` | Server, database, core and integration settings; start from `.env.example` |
| `UVICORN_HOST` / `UVICORN_PORT` | Listening address and port |
| `UVICORN_SSL_CERTFILE` / `UVICORN_SSL_KEYFILE` | Certificate paths inside the container |
| `SQLALCHEMY_DATABASE_URL` | Optional external database connection URL |
| `data/` | Persistent database, certificates and deployment files |
| `interface/src/constants/Project.ts` | Brand repository, support and optional documentation endpoints |

SQLite is the default and persists at `data/db.sqlite3`. PostgreSQL/TimescaleDB, MySQL and MariaDB require an existing reachable database and a matching async connection URL. Compose does not provision these external databases. See `.env.example` for supported settings. Rebuild after changing interface branding; restart/recreate after changing environment settings.

A reverse proxy can terminate HTTPS instead; configure its upstream and the panel's listening address accordingly. The bundled Compose setup does not install Nginx or obtain certificates.

<a id="users"></a>
## Users and permissions

1. Connect and verify the required core or node.
2. Configure its inbounds and the public hosts clients should use.
3. Create a user or apply a user template, setting traffic and expiry limits.
4. Review the generated subscription in a compatible client.

Admins can be given scoped access to resources through roles. Grant each operator the permissions needed for their work. Bulk operations use the same authorization model as individual operations.

<a id="nodes"></a>
## Nodes and cores

Remote nodes are installed separately. Register their connection details in the panel and verify status and logs before assigning traffic. Original node/core package identifiers remain for compatibility; this repository does not contain a separate Hirkan node distribution. Protocol availability depends on the selected core, node version and inbound configuration.

<a id="subscriptions"></a>
## Hosts and subscriptions

Configure the public domain, port, transport and TLS/REALITY details in host and inbound settings. Panel HTTPS and client transport are separate configurations. Changing the panel domain alone does not rewrite existing client hosts. After a host change, refresh subscriptions and verify DNS and connectivity from a client.

Client templates control subscription output. Device limits and subscription settings are managed from the existing settings pages. A domain still resolves to an address; using a domain does not hide the origin IP by itself.

The default subscription web page, **Classic**, preserves the original upstream appearance independently of the Hirkan administration theme. For an existing installation set `SUBSCRIPTION_PAGE_TEMPLATE="subscription/classic.html"` in `.env`. If `CUSTOM_TEMPLATES_DIRECTORY` is configured, a same-named custom file takes precedence; preserve your custom template before replacing it. This setting controls the subscription web page, not client configuration formats or user links.

<a id="updating"></a>
## Updating

Back up first and read [CHANGELOG.md](CHANGELOG.md). Preserve local changes before pulling.

```bash
git pull --ff-only
docker compose up -d --build
docker compose logs --tail=100 rasa-panel
```

Use this repository for updates. Upstream installation scripts deploy upstream packages and do not update this branded distribution. Database migrations may prevent a simple image rollback; restore the matching database backup when rolling back a migration.

<a id="backups"></a>
## Backups and restore

For the default SQLite deployment, use a short maintenance window and stop the panel so the database and WAL files form a consistent copy:

```bash
docker compose stop rasa-panel
umask 077
mkdir -p backups
tar -czf "backups/rasa-$(date -u +%Y%m%d-%H%M%S).tar.gz" data .env
docker compose start rasa-panel
```

If archiving fails, restart the panel and resolve the error before updating. Store backups off the server as well. Archives include private keys and settings. To restore, stop the panel, restore the matching archive into this project directory, then start the matching code version. External databases need their own database-native backup and restore procedure.

<a id="troubleshooting"></a>
## Troubleshooting

| Symptom | Check |
| --- | --- |
| Container exits | `docker compose logs --tail=100 rasa-panel`; certificate paths, environment and port availability |
| Port already occupied | `sudo ss -lntp`; choose an available port and update the URL |
| Certificate error | Domain matches the certificate, chain is complete, files are mounted at the configured paths |
| Domain fails | DNS points to the intended endpoint and the configured port is reachable |
| Node is offline | Node version, credentials, network access and both panel/node logs |
| Clients cannot connect | Inbound listener, public host settings, protocol/transport and subscription refresh |
| Old interface persists | Rebuild the image, reload the browser and refresh an installed PWA |

Build and validation results, including known failures, are documented in [VALIDATION.md](VALIDATION.md). The interface production build succeeds. Full backend/strict TypeScript checks are not completely clean. A Docker Engine build and live proxy traffic have not been validated in this workspace.

<a id="development"></a>
## Development

Python 3.14+, uv and Bun are required for local development.

```bash
uv sync --frozen
cd interface
bun install --frozen-lockfile
VITE_BASE_API=/ bun run build
cp build/index.html build/404.html
cd ..
uv run python -m alembic upgrade head
uv run python main.py
```

Set your development environment/database before running migrations. The backend is in `app/`, interface and static integration in `interface/`, CLI in `cli/`, and tests in `tests/`. API schema export is in `scripts/export_openapi.py`. The GHCR workflow is `.github/workflows/rasa-release.yml`; registry publishing requires an authorized GitHub workflow run. Repository Telegram notifications remain inactive until a dedicated bot and destination are configured.

## Support and license

- Support: [@dev_vexel](https://t.me/dev_vexel)
- Source and issues: [Hirkan source](https://github.com/RasaPanel/panel)
- Organization: [GitHub organization](https://github.com/RasaPanel)

Distributed under AGPL-3.0. Network users must be offered the corresponding source of a modified deployment as required by the license. Original reference documents remain in `docs/upstream/`; their installation commands and service links refer to the upstream project.
