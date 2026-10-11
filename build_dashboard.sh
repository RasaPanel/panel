#! /bin/bash
set -e
cd "$(dirname "$0")/interface"
VITE_BASE_API=/ bun run build
cp ./build/index.html ./build/404.html
