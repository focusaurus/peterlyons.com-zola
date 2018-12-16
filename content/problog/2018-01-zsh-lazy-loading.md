+++
title = "zsh lazy loading"
slug = "2018/01/zsh-lazy-loading"
date = 2018-01-04T14:54:23.923Z
+++
I was getting frustrated with how long it took for a new terminal tab to start with zsh and display my prompt. I chatted with zsh wizard [Alok Singh](https://alok.github.io/) and finally bothered to dig into it and removed the glaringly-slow subprocess spawns (things like `brew --prefix openssl`) and some nvm related stuff was slow. What I came upon in my web research was [this post](https://kev.inburke.com/kevin/profiling-zsh-startup-time/) which had pretty slick lazy loading pattern for integration with third party utilities like nvm, virtualenv, rbenv, and similar.

The trick is you define a shell function yourself matching the name of the third party utility shell function. Your function's job is to load the real utility when it is run, which will replace your placeholder function with the real one.

It looks like this for `nvm`, for example:

```sh
##### nvm (node version manager) #####
# placeholder nvm shell function
# On first use, it will set nvm up properly which will replace the `nvm`
# shell function with the real one
nvm() {
  if [[ -d '/usr/local/opt/nvm' ]]; then
    NVM_DIR="/usr/local/opt/nvm"
    export NVM_DIR
    # shellcheck disable=SC1090
    source "${NVM_DIR}/nvm.sh"
    if [[ -e ~/.nvm/alias/default ]]; then
      PATH="${PATH}:${HOME}.nvm/versions/node/$(cat ~/.nvm/alias/default)/bin"
    fi
    # invoke the real nvm function now
    nvm "$@"
  else
    echo "nvm is not installed" >&2
    return 1
  fi
}
```

This should keep shell init time short but still not require any explicit initialization of these shell integrations.
