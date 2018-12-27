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
export PATH="${PWD}/local/bin:${PATH}"
ZOLA_VERSION=0.5.1
zola_url="https://github.com/getzola/zola/releases/download/v${ZOLA_VERSION}/zola-v${ZOLA_VERSION}-x86_64-unknown-linux-gnu.tar.gz"
version=$(zola --version 2>/dev/null || /bin/true)
if [[ ! "${version}" =~ ^zola ]]; then
  # install zola
  mkdir -p ./local/bin
  wget -q -O - "${zola_url}" |
    tar --extract --gzip --file - --directory local/bin
  chmod 755 local/bin/zola
fi
./local/bin/zola build
./container-scripts/build-plus-party.sh
cp -r node_modules/reveal.js public
