#!/usr/bin/env bash

set -E
set -o pipefail
set -u

rootPath="$(dirname "$0")/.."
distPath="$rootPath/dist"

# Runs the "build" script only if the distributable hasn't been cached in GitHub Actions.
if [ ! -d "$distPath" ]; then
  cd "$rootPath"
  yarn install
  yarn run build
fi
