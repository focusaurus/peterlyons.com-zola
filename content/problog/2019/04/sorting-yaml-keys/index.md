+++
title = "Sorting YAML keys"
slug = "2019/04/sorting-yaml-keys/"
date = 2019-04-10T15:17:20Z
+++

So I had a bunch of YAML files with an array of key/value maps representing environment variables. I wanted to sort these to make comparing them across similar files easier. A web search pulled up this nice pipeline to handle the actual sorting:


```sh
xclip -selection clipboard -o |
  awk '{printf("%s%s",$0,(NR%2)?"\t":"\n")}' |
  sort -k2,2n |
  tr '\t' '\n' |
  xclip -selection clipboard # sort pairs of yaml lines
```

So what I did was copy just the lines of YAML I wanted to sort (not the whole file) and then run that command, which uses the clipboard for it's input/output.

## Convincing everyone the changes are safe

Great. Now my keys are sorted, but my git diff looks nasty. It looks like a made huge sweeping changes to the files. I wanted to convince myself and my code reviewers that I didn't change any keys or values, just sorted the lines.

I futzed around a bit and eventually came up with this bit of bash, which I was really pleased with:

```sh
git diff-tree --no-commit-id --name-only -r HEAD | {
  while IFS= read -r file_path; do
    git show "HEAD:${file_path}" | sort >new.txt
    git show "HEAD^1:${file_path}" | sort >old.txt
    echo "Diff for ${file_path}:"
    diff old.txt new.txt
    shasum old.txt new.txt
  done
}
```

What this does is go through each file in the current git commit and compare it to the same file in the previous commit with sorted lines. This shows both versions have the same lines just in different order. It's confirmed with an empty `diff` output and with both files having the same hash via `shasum`.

Here's sample output:

```
Diff for some/path/foo/file.yaml:
9b45d3510db8e2b85a434f359599a0228848f52e  old.txt
9b45d3510db8e2b85a434f359599a0228848f52e  new.txt
Diff for some/path/bar/file.yaml:
cb340559978a2dc9476c365da9560deb6af43808  old.txt
cb340559978a2dc9476c365da9560deb6af43808  new.txt
Diff for some/path/baz/file.yaml:
47c328231e83b7927b9ba01e5a6a9be9c1b52f24  old.txt
47c328231e83b7927b9ba01e5a6a9be9c1b52f24  new.txt
Diff for some/path/bux/file.yaml:
257ae73f12bf96727402077da2c618174fe16410  old.txt
257ae73f12bf96727402077da2c618174fe16410  new.txt
```
