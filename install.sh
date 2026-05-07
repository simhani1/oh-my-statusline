#!/usr/bin/env sh
set -eu

if ! command -v node >/dev/null 2>&1; then
  echo "oh-my-statusline requires Node.js 18 or newer." >&2
  exit 1
fi

if ! command -v npx >/dev/null 2>&1; then
  echo "oh-my-statusline requires npx. Install Node.js from https://nodejs.org/." >&2
  exit 1
fi

if [ -r /dev/tty ] && [ -w /dev/tty ]; then
  npx --yes oh-my-statusline-install "$@" < /dev/tty
else
  npx --yes oh-my-statusline-install --yes "$@"
fi
