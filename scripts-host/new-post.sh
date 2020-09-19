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

slug() {

  # lowercase
  # spaces to dashes
  # collapse double dashes
  # Delete everything other than letters, numbers, dash
  # remove trailing dash
  echo "$@" |
    tr "A-Z" "a-z" |
    sed -e 's/\s/-/g' -e 's/--/-/g' |
    tr -c -d "a-z0-9-" |
    sed -e 's/-$//'
}

cd "$(dirname "${BASH_SOURCE[0]}")/.."
title="$@"
# read -r -p "Title: " title
name=$(slug "${title}")
dest_dir="content/problog"
mkdir -p "${dest_dir}"

publish_date=$(date -u +%Y-%m-%dT%H:%M:%SZ)
# 2018-01-03T17:32:11Z
year=$(echo "${publish_date}" | cut -d - -f 1)
month=$(echo "${publish_date}" | cut -d - -f 2)
dest_path="${dest_dir}/${year}-${month}-${name}.md"
cat <<EOF >"${dest_path}"
+++
title = "${title}"
slug = "${year}/${month}/${name}/"
date = ${publish_date}
+++
EOF
