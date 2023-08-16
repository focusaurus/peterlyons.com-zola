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

install_zola() {
  ZOLA_VERSION=0.16.1
  zola_url="https://github.com/getzola/zola/releases/download/v${ZOLA_VERSION}/zola-v${ZOLA_VERSION}-x86_64-unknown-linux-gnu.tar.gz"
  # install zola
  mkdir -p ./local/bin
  wget -q -O - "${zola_url}" |
    tar --extract --gzip --file - --directory local/bin
  chmod 755 local/bin/zola
}

main() {
  cd "$(dirname "${BASH_SOURCE[0]}")/.."
  export PATH="${PWD}/local/bin:${PATH}"
  if ! command -v zola &>/dev/null; then
    install_zola
  fi
  version=$(zola --version | cut -d " " -f 2 2>/dev/null || /bin/true)
  if [[ "${version}" != "${ZOLA_VERSION}" ]]; then
    install_zola
  fi
  if [[ ! -d node_modules ]]; then
    npm install
  fi
  # Sigh. Disable this for now as it requires
  # tooling for Elm 0.18.0 and older node and 
  # it's a massive pain
  ./scripts-container/build-plus-party.sh
  cp -r node_modules/reveal.js static
  # The "test" directory in reveal has some insecure mixed content
  # so remove it to avoid netlify warnings
  rm -rf static/reveal.js/test
  zola build
}

main "$@"
