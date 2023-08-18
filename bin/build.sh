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

build_js() {
  # compile typescript using config in tsconfig.json
  tsc

  # bundle javascript for the browser
  esbuild code/plus-party/web.ts --minify --bundle --outfile=static/plus-party-ts/bundle.js
  esbuild code/reveal-init.js --minify --bundle --outfile=static/reveal-bundle.js
  cp -r node_modules/reveal.js static
}

main() {
  cd "$(dirname "${BASH_SOURCE[0]}")/.."

  # prereq: zola static site generator
  export PATH="${PWD}/local/bin:${PATH}"
  if ! command -v zola &>/dev/null; then
    install_zola
  fi
  version=$(zola --version | cut -d " " -f 2 2>/dev/null || /bin/true)
  if [[ "${version}" != "${ZOLA_VERSION}" ]]; then
    install_zola
  fi

  # prereq: node/npm dependencies
  if [[ ! -d node_modules ]]; then
    npm install
  fi

  build_js

  # generate the static site
  zola build
}

main "$@"
