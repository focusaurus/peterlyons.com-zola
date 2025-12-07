+++
title = "Handling optional arguments in bash"
date = 2018-12-19T22:31:37.558Z
+++
I learned a nice way of using bash arrays to hold command line arguments that are conditional or will be computed before passing as arguments to a separate program. 

There's 2 basic parts.

1. Use a bash array to hold them 

`declare -a opts=(one two three)`

2. Expand them properly using this syntax 

`"${opts[@]}"`

Here's an annotated example:

```bash
#!/usr/bin/env bash

# Here's our default arguments we intend
# to pass to curl
declare -a opts=(--silent --fail --output /dev/null)

# Use this for debugging
# opts=(--fail)

if [[ -n "${REMOTE_USER}" ]]; then
# Here we need to change the args, so
# we can prepend some to the variable itself.
  opts=(--user "${REMOTE_USER}:${REMOTE_PASSWORD}" "${opts[@]}")
fi
url="${REMOTE_URL}"

# Now pass the on with proper quoting
# using the [@] syntax

curl "${opts[@]}" "${url}"
```

Note I omitted the [unofficial bash strict mode](http://redsymbol.net/articles/unofficial-bash-strict-mode) boilerplate for clarity, but in my production scripts, you'd see that at the beginning.
