# Rasa Panel | رسا پنل

Full-source branded derivative. See NOTICE and LICENSE.
Upstream reference: b56ffe369f542152c52c69733205baeaf3f6e4cd (5.4.1).

## Brand configuration
Edit `interface/src/constants/Project.ts`: repository, organization,
nodeRepository, documentation, support, donation, adsRepository.
Use real GitHub URLs. Unconfigured release/marketing feeds are inactive.
Configure the corresponding source URL before serving network users.
Technical dependencies and NATS compatibility identifiers are preserved.

## Docker installation
Requires Linux Docker Engine + Compose and a valid HTTPS certificate.
The downloadable archive includes a frontend production build.
For a fresh Git clone, install Bun and run `cd interface && bun install --frozen-lockfile && VITE_BASE_API=/ bun run build` before building Docker.
GitHub: https://github.com/RasaPanel/panel
Support: https://t.me/dev_vexel

```sh
cp .env.example .env
mkdir -p data/certs
# Configure UVICORN_HOST, UVICORN_PORT, SSL certificate/key paths in .env.
# Certificates: ./data/certs => /var/lib/rasa-panel/certs inside container.
docker compose up -d --build
docker compose exec rasa-panel python rasa-cli.py generate-temp-key
```
Open /dashboard/ over HTTPS and use the generated one-time key for owner setup.
Never run upstream installation/update commands: they install upstream images.
SQLite persists under ./data/db.sqlite3. Set SQLALCHEMY_DATABASE_URL in .env
for PostgreSQL/TimescaleDB/MySQL/MariaDB. Remote nodes are installed separately.

## Development
Python >=3.14, uv, Node >=22 and Bun required.

```sh
uv sync --frozen
cd interface
bun install --frozen-lockfile
VITE_BASE_API=/ bun run build
cd ..
cp interface/build/index.html interface/build/404.html
uv run python -m alembic upgrade head
uv run python main.py
```

interface/: React UI and Python static integration.
app/: backend. cli/: commands. tests/: upstream test suite.
API routes, database migrations and user/node functionality remain intact.
Use the Rasa GHCR-only workflow for GitHub Container Registry publishing.
Original multi-registry workflows require Docker Hub secrets and are manual.
Original documentation remains in docs/upstream for reference only.
