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

main() {
  cd "$(dirname "${BASH_SOURCE[0]}")/.."
  local plus_party_temp
  plus_party_temp="$(mktemp -t plus-party-build-XXXXXX).js"
  local out="./static/plus-party.js"
  cd code/plus-party
  elm-make --yes --output "${plus_party_temp}" PlusParty.elm
  cd - >/dev/null
  cat node_modules/clipboard/dist/clipboard.js "${plus_party_temp}" >"${out}"
  uglifyjs "${out}" | gzip >"${out}.gz"
}

main "$@"
