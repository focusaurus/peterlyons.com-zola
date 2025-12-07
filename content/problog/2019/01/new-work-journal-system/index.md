+++
title = "New Work Journal System"
date = 2019-01-15T02:55:47Z
+++
I've updated my journaling tooling for my work journal. Here's how I do it.

## Writing Journal Entries

First, a script computes the path to the specific journal (one per job/company) I'm using.

```bash
#!/usr/bin/env bash
# Strict mode boilerplate omitted for the blog, but is really there
# http://redsymbol.net/articles/unofficial-bash-strict-mode/
year=$(date +%Y)
month=$(date +%m)
day=$(date +%d)
journal_path="${HOME}/work/journal/${year}-${month}/${year}-${month}-${day}.md"
exec ~/bin/append-journal-entry.sh "${journal_path}"
```

- The directory structure makes it easy to open a text editor in the directory for the current month and browse recent days
- easy to restrict searches with `rg` to certain time periods

There's a script `append-journal-entry.sh` that looks like this:

```sh
#!/usr/bin/env bash
# Strict mode boilerplate omitted for the blog, but is really there
# http://redsymbol.net/articles/unofficial-bash-strict-mode/

cd "$(dirname "${BASH_SOURCE[0]}")/.."

main() {
  local journal_path=$1
  shift
  local entry
  entry="$*"
  if [[ -z "${entry}" ]]; then
    entry=$(~/bin/prompt-or-clipboard.sh "Entry")
  fi
  mkdir -p "$(dirname "${journal_path}")"
  local ts
  ts=$(date +%Y-%m-%dT%H:%M:%S%z)
  cat <<EOF >>"${journal_path}"

# ${ts}
- ${entry}
EOF
}

main "$@"
```

- That takes the path to the journal file as an argument
- It will prompt for the entry content, or if left empty, take the content from the system clipboard
  - I use this to copy code snippets, log entries, etc into my journal
- Then it just appends them with a markdown header for the timestamp and the content
  - 1-liner content is a markdown list, but there's so much random syntax pasted into my journals that hoping to have them render properly as markdown is a bit silly

Here's `prompt-or-clipboard.sh`

```bash
read -r -p "$1 (ENTER for clipboard): " query
if [[ -z "${query}" ]]; then
  query=$(xclip -clipboard -o)
fi
echo "${query}"
```

## Searching the Journal

I use this shell alias

```sh
search-work-journal() {
  rg "$*" ~/work/journal | less
}
```

## Reading the full journal

```sh
read-work-journal() {
  fd --type f . ~/work/journal | xargs cat | less
}
```
