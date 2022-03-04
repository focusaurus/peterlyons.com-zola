# peterlyons.com static site generator

**Tech stack**

- zola static site generator
- tera templates
- node/npm for some client side javascript apps and bundling
- reveal.js for slides in markdown
- elm-lang for plus party app

## How to run locally: 1-time setup

- Install the prerequisites
  - git
  - bash
  - docker
- `git clone` the repo

## How to develop locally

- Do the 1-time setup as documented above
- (host) `./host-scripts/docker-run.sh` to get into the docker image
- (container) `./scripts-container/serve.sh`
- open [http://0.0.0.0:9002]() in a browser to preview

## How to run javascript tests

(container) `./scripts-container/build.sh && npm test`

## How to update dependencies: npm

(container) `npx npm-check-updates -u`

## How to update zola

Edit `ZOLA_VERSION` in `scripts-container/build.sh`
