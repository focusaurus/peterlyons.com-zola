#!/usr/bin/env bash

# Please Use Google Shell Style: https://google.github.io/styleguide/shell.xml

# ---- Start unofficial bash strict mode boilerplate
# http://redsymbol.net/articles/unofficial-bash-strict-mode/
set -o errexit  # always exit on error
set -o errtrace # trap errors in functions as well
set -o pipefail # don't ignore exit codes when piping output
# set -x          # enable debugging

IFS=$'\n\t'
# ---- End unofficial bash strict mode boilerplate

cd "$(dirname "${BASH_SOURCE[0]}")/.."

# shellcheck source=./.env
source ./.env
image=node:$(cat .nvmrc)
command=("$@")
if [[ "${#command}" -eq 0 ]]; then
  command=(bash)
fi
exec docker run --rm --interactive --tty \
  --attach stdin --attach stdout --attach stderr \
  --volume "${PWD}:/host" \
  --env SSH_AUTH_SOCK \
  --env-file ./.env \
  --env PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/host/bin:/host/local/bin:/host/scripts-container:/host/node_modules/.bin \
  --workdir /host \
  --user "$(id -u)" \
  --publish "${PORT}:${PORT}" \
  "${image}" "${command[@]}"
