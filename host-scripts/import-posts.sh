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

# {
#   "format": "html",
#   "name": "leveling-up",
#   "publish_date": "2011-05-06T00:56:18.000Z",
#   "title": "Leveling Up: Career Advancement for Software Developers"
# }
cd "$(dirname "${BASH_SOURCE[0]}")/.."
dest_root="${PWD}/content/problog"
cd "$(dirname "${BASH_SOURCE[0]}")/../../plws/data/posts/problog"
find . -type f -name '*.json' | {
  while IFS= read -r json_path; do
    echo $json_path
    name=$(jq -r .name <"${json_path}")
    title=$(jq -r .title <"${json_path}")
    if [[ "${name}" == "agile-bugs" ]]; then
      # special case data fixup for TOML
      title="A response to \"Handling Bugs in an Agile Context\""
    fi

    publish_date=$(jq -r .publish_date <"${json_path}")
    year=$(echo "${publish_date}" | cut -d - -f 1)
    month=$(echo "${publish_date}" | cut -d - -f 2)
    dest_dir="${dest_root}"
    dest_path="${dest_dir}/${year}-${month}-${name}.md"
    src_path="$(dirname "${json_path}")/$(basename "${json_path}" .json).md"

    mkdir -p "${dest_dir}"
    cat <<EOF >"${dest_path}"
+++
title = "${title}"
slug = "${year}/${month}/${name}"
date = ${publish_date}
+++
EOF
    cat "${src_path}" >>"${dest_path}"
  done
}
