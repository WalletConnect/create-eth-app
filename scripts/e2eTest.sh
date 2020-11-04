#!/usr/bin/env bash

set -E
set -o pipefail
set -u

scriptPath="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
rootPath="$scriptPath/.."

# The create-eth-app distributable must already be available before running this script.
ceaPath="$rootPath/dist"
if [[ ! -d "$ceaPath" ]]; then
  echo "Create Eth App distributable not available."
  exit 1
fi

# Create a temporary directory in the default OS location (/tmp on Ubuntu).
appPath=$(mktemp -d)

# Check if temporary directory was created.
if [[ ! -d "$appPath" ]]; then
  echo "Could not create temporary directory."
  exit 1
fi

echo "$appPath"

# Run Create Eth App.
cd "$appPath"
node "$ceaPath" my-eth-app --framework react
cd my-eth-app

# Check that the "react-app:start" script works.
server=$(yarn run react-app:start)

echo "$server"

# Delete the temporary directory.
# rm -rf "$appPath"
