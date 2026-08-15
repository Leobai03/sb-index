#!/usr/bin/env bash
set -euo pipefail

TARGET="${1:-tiance-agent-sg}"
REMOTE_DIR="${REMOTE_DIR:-/var/www/sb-index-path}"
BASE_PATH="${BASE_PATH:-/sbti/}"
ARCHIVE="$(mktemp /tmp/sb-index-dist.XXXXXX.tar.gz)"
trap 'rm -f "$ARCHIVE"' EXIT

npx tsc -b
npx vite build --base="$BASE_PATH"
COPYFILE_DISABLE=1 tar -C dist -czf "$ARCHIVE" .

ssh "$TARGET" "install -d -m 755 '$REMOTE_DIR'"
scp -O "$ARCHIVE" "$TARGET:/tmp/sb-index-dist.tar.gz"
scp -O server/report-server.mjs "$TARGET:/tmp/sb-index-report-server.mjs"
scp -O deploy/sb-index-report.service "$TARGET:/tmp/sb-index-report.service"
ssh "$TARGET" "
  set -euo pipefail
  if ! id sbindex >/dev/null 2>&1; then
    useradd --system --home /var/lib/sb-index-report --shell /usr/sbin/nologin sbindex
  fi
  find '$REMOTE_DIR' -mindepth 1 -maxdepth 1 -exec rm -rf {} +
  tar -xzf /tmp/sb-index-dist.tar.gz -C '$REMOTE_DIR'
  chown -R root:root '$REMOTE_DIR'
  install -d -m 755 /opt/sb-index-report
  install -d -o sbindex -g sbindex -m 750 /var/lib/sb-index-report
  install -m 644 /tmp/sb-index-report-server.mjs /opt/sb-index-report/report-server.mjs
  install -m 644 /tmp/sb-index-report.service /etc/systemd/system/sb-index-report.service
  rm -f /tmp/sb-index-dist.tar.gz /tmp/sb-index-report-server.mjs /tmp/sb-index-report.service
  systemctl daemon-reload
  systemctl restart sb-index-report
  systemctl is-active --quiet sb-index-report
  systemctl reload caddy
"

echo "SB Index deployed to $TARGET:$REMOTE_DIR ($BASE_PATH)"
