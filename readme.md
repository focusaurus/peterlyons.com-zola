# peterlyons.com static site generator

**Tech stack**

- zola static site generator
  - tera templates
- node/npm for some client side javascript apps and bundling
- reveal.js for slides in markdown
- typescript for plus party app

## How to run locally: initial setup

- Install the prerequisites
  - bash
  - git
  - node
    - (see .nvmrc for correct version)
- `git clone` the repo
- `cp .env.example .env`. Edit `.env` if necessary but usually it's fine as is.
- Run `bin/build.sh`
  - This will install zola and run npm if needed
- Run `bin/serve.sh` for normal development
  - Site opens to http://localhost:3333 by default

## How to run unit tests

- `bin/test.sh`

## How to stub out a new blog post

- `bin/new-post.sh "Post Title Goes Here"`

## How to develop using docker

- Install the prerequisites
  - bash
  - git
  - docker
- run `./bin/docker-run.sh bin/serve.sh`
- Site is at [http://localhost:3333]() by default
- For all the other development tasks, the docker version starts with `bin/docker-run.sh` then the script you would run locally.
  - `bin/docker-run.sh bin/test.sh` for example
  - 
## How to run javascript tests

(container) `./scripts-container/build.sh && npm test`

## How to update dependencies: npm

`npx npm-check-updates -u`

## How to update zola

Edit `ZOLA_VERSION` in `scripts-container/build.sh`
