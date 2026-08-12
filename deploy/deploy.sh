#!/usr/bin/env bash
set -euo pipefail

TARGET="${1:-tiance-agent-sg}"
REMOTE_DIR="${REMOTE_DIR:-/var/www/sb-index}"
ARCHIVE="$(mktemp /tmp/sb-index-dist.XXXXXX.tar.gz)"
trap 'rm -f "$ARCHIVE"' EXIT

npm run build
COPYFILE_DISABLE=1 tar -C dist -czf "$ARCHIVE" .

ssh "$TARGET" "install -d -m 755 '$REMOTE_DIR'"
scp "$ARCHIVE" "$TARGET:/tmp/sb-index-dist.tar.gz"
ssh "$TARGET" "
  set -euo pipefail
  find '$REMOTE_DIR' -mindepth 1 -maxdepth 1 -exec rm -rf {} +
  tar -xzf /tmp/sb-index-dist.tar.gz -C '$REMOTE_DIR'
  rm -f /tmp/sb-index-dist.tar.gz
  systemctl reload caddy
"

echo "SB Index deployed to $TARGET:$REMOTE_DIR"
