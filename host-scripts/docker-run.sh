#!/usr/bin/env bash

# Please Use Google Shell Style: https://google.github.io/styleguide/shell.xml

# ---- Start unofficial bash strict mode boilerplate
# http://redsymbol.net/articles/unofficial-bash-strict-mode/
set -o errexit  # always exit on error
set -o errtrace # trap errors in functions as well
set -o pipefail # don't ignore exit codes when piping output
set -o posix    # more strict failures in subshells
# set -x          # enable debugging

IFS="$(printf "\n\t")"
# ---- End unofficial bash strict mode boilerplate
cd "$(dirname "${BASH_SOURCE[0]}")/.."
source ./.env

# debian: packages
# dpkg-query --show curl gettext-base git jq less vim | sort | tr "\t" "=" | xargs
# RUN apt-get -qq -y update >/dev/null; apt-get -qq -y install "curl=7.52.*" "git=1:2.11.*" "less=481-*" "wget=1.18-*" "vim=2:8.0.*" >/dev/null

# alpine: packages
# apk list bash curl less vim | cut -d " " -f 1 | sed 's/-/=/' | xargs
# RUN apk --no-cach add bash=~4.4 git=~2.20 less=~530 wget=~1.20 vim=~8.1;
image=node:11.11.0
exec docker run --rm --interactive --tty \
  --attach stdin --attach stdout --attach stderr \
  --volume "${PWD}:/host" \
  --volume $SSH_AUTH_SOCK:/ssh-agent \
  --env-file ./.env \
  --env PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/host/bin:/host/node_modules/.bin \
  --user "$(id -u)" \
  --publish "${PORT}:${PORT}" \
  "${image}" "${2-bash}"
