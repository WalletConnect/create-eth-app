#!/usr/bin/env bash

set -E
set -o pipefail
set -u

appPath="/private/var/folders/l9/26z2wy2x0_l5sm7v2y7cgp940000gq/T/tmp.vI3dvvJ6/my-eth-app"
cd "$appPath"
yarn run react-app:start

echo "Hello World"
