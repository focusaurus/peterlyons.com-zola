#!/usr/bin/env bash

# Please Use Google Shell Style: https://google.github.io/styleguide/shell.xml

# ---- Start unofficial bash strict mode boilerplate
# http://redsymbol.net/articles/unofficial-bash-strict-mode/
set -o errexit  # always exit on error
set -o errtrace # trap errors in functions as well
set -o pipefail # don't ignore exit codes when piping output
set -o posix    # more strict failures in subshells
# set -x          # enable debugging

IFS=$'\n\t'
# ---- End unofficial bash strict mode boilerplate

cd "$(dirname "${BASH_SOURCE[0]}")/.."
export PATH="${PWD}/local/bin:${PATH}"
./bin/build.sh
if [[ -z "${PORT}" ]] && [[ -e .env ]]; then
  source ./.env
fi
zola serve --port "${PORT}" --interface "${IP:-127.0.0.1}"
