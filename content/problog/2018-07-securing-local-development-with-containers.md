+++
title = "Securing local development with containers"
slug = "2018/07/securing-local-development-with-containers"
date = 2018-07-13T08:36:01.017Z
+++
Starting this Spring when I changed OSes from mac to linux, I decided to experiment with using docker containers to isolate dangerous development tools from my local system. Given the npm malware attack yesterday, this seems like a good time to write up my results so far.

## Motivation

OK I'll try not to get overly long-winded here, but let me just state broadly that I think the core fundamental idea in linux that you log in to your system with an effective userid, that userid has read/write access to your entire home directory (typically), and when you execute a program, it runs as your userid and therefore generally has read/write access to all of your files is utterly and fundamentally misguided and inappropriate. I have some designs that are basically the opposite of this, but I don't want to digress into that. Pragmatically, I wanted to find some way to mitigate this geologically-huge security vulnerability using existing tools and not going full-on Stallman.

To just clarify the specific vulnerability here, I'm talking about running commands like `npm install` and having that download code from the Internet, some of which is malicious, then executing that malicious code and having it do any one of the following nasty things:

* Delete a bunch of your files, either maliciously or due to a bug
* Read a bunch of your private files such a ssh private keys and upload them to an attacker-controlled server
* Make some subtle and hard-to-detect alteration to some key file

## Container Isolation Basic Approach

So when I had a clean slate I decided to try to mitigate this risk with the following basic tactic:

* Each project gets a docker container with a basic shell, node/npm, and maybe a few other development tools as needed
* npm and node never get executed directly on the host OS, only within the container
* The container only gets a filesystem volume mounted with a specific project working directory. It has no access to my home directory, any dotfiles, or any sibling project directories

## Setup script

The pattern is similar for most projects, but varies a little bit depending on the tech stack I'm working with (these days mostly node.js or rust), and the specific needs of the project in terms of tools, environment variables, network ports, etc.

Here's a representative sample for a node project. I typically check a file in as `bin/docker-run.sh` to fire up that project's docker container.

```bash
#!/usr/bin/env bash

# Please Use Google Shell Style: https://google.github.io/styleguide/shell.xml

# ---- Start unofficial bash strict mode boilerplate
# http://redsymbol.net/articles/unofficial-bash-strict-mode/
set -o errexit    # always exit on error
set -o errtrace   # trap errors in functions as well
set -o pipefail   # don't ignore exit codes when piping output
set -o posix      # more strict failures in subshells
# set -x          # enable debugging

IFS="$(printf "\n\t")"
# ---- End unofficial bash strict mode boilerplate

cd "$(dirname "$0")/.."
exec docker run --rm --interactive --tty \
  --volume "${PWD}:/opt" \
  --workdir /opt \
  --env USER=root \
  --env PATH=/usr/sbin:/usr/bin:/sbin:/bin:/opt/node_modules/.bin \
  "node:$(cat .nvmrc)" "${1-/bin/bash}"
```

Here's some detail on what this does.

* `exec docker run` runs the docker container. The `exec` just replaces the shell with the docker process instead of having the shell process stay around waiting.
* `--rm` delete the container right away instead of leaving useless cruft around gradually filling your filesystem
* `--interactive --tty` set this up for an interactive terminal session
* `--volume` exposes the project's files to the container
* `--workdir` puts your shell in the project root right away
* `--env` sets environment variables. You may need to set things like `HOME` or `USER`, maybe not. For node, adding `/opt/node_modules/.bin` to your `PATH` can be handy so you can avoid the silly `npm install -g`.
* For node, I get the desired node version from my `.nvmrc` file in the project root
* `--publish 9229:9229` is handy to enable devtools debugging to work
* `--publish 3000:3000` is what you need for a node server project that listens on port 3000
* The `${1-/bin/bash}` means when no arguments are passed, run bash, but if an argument is passed, run that instead. Generally I don't need that but I can do `./bin/docker-run.sh node server.js` for example if I know I want to run the server.

## How well does it work?

So far all the basic stuff is working OK. Running npm works, running node works, debugging works OK, running an http server works. Terminal colors work. Arrow keys work. Bash history searching works (at least for a given shell session).

One gripe I have, which I could remedy I just haven't gotten around to it yet is in the container I have a vanilla bash configuration without my normal toolbox of zsh and dozens of aliases, functions, settings, etc. Usually I'm only running 3 or 4 commands in the container in a tight loop, and arrow keys and history searching work fine, so it's OK. However, bash history of commands in the container does not persist, so if I come up with a useful long command line, I need to take special action to capture it in a script or my notes.

## Further isolation

This is where I am at the moment, but of course as with all security efforts, there's an endless list of additional measures that could be taken. Here's the next few things I plan to look at.

* Use a non-root user in the container
* Get stricter with docker capability limitations
* Maybe run git in the container

Right now I'm only running npm and `node my-project.js` within the container (or cargo for a rust project). I trust git a lot more than I do npm, but I think with git hooks ultimately the same vulnerability exists with git, so I'd like to run that in the container. However, there's a few kinks to work out in terms of filesystem userids, ssh agent access for pull/push, etc.

I hope you found this interesting and useful. Stay safe out there!
