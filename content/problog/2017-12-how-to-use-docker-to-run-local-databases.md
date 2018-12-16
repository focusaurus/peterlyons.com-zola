+++
title = "How to use docker to run local databases"
slug = "2017/12/how-to-use-docker-to-run-local-databases"
date = 2017-12-05T23:25:41.630Z
+++
Here's how I run use docker to run databases for local development. I think my approach is the simplest I've seen and if something is unnecessary I skip it. You don't need data containers or port mappings, so I don't use them. The goal here is to make it very easy to run databases while developing applications or doing DB development work. It's basically the same for macOS and linux but I'm currently on macOS so that's where my instructions come from.

## Goals

1. Same process works mostly the same for many databases (postgresql, mysql, mongodb, redis, etc)
1. Data persists as expected
  - Can start/stop containers, reboot host without losing data
1. When we want to wipe data and start fresh, that's easy too
1. Easy to transfer files into the container and out of the container
1. Easy to get a shell inside  the container to run tools there (psql etc)
1. Easy to purge when done

## My Approach

- Use a single docker-compose yaml file because 1 file is the easiest number of files to have
- Each database gets 2 volume mounts
  - 1 for ad hoc file transfer
    - This is always `'~/docker-volumes/host:/host'`
  - 1 for the database data itself
    - The left/host path follows the pattern `~/docker-volumes/container-name`
    - the right/container path needs to match the path the container stores data by default. You'll need to look at the container's docs to find the correct path to use. I've provided correct values for some popular databases below.
    - Look at [hub.docker.com](https://hub.docker.com), search for your DB container by name, then search in the page for `-v` and you'll usually find it
- Databases run on their default port bound to loopback
  - Simplest thing. Least surprise.
  - Also allows DB management GUIs to work easily.
- If DB users are required, set their password to "password"
  - This is local stuff that does not need much security

## The compose file

```yaml
# Run with:
# docker-compose -f ~/projects/dotfiles/docker-compose-local-dev.yml up -d
version: '2'
services:
  # https://hub.docker.com/_/postgres/
  postgres:
    container_name: 'postgres'
    ports: ['127.0.0.1:5432:5432']
    volumes: [
      # for ad-hoc transfers in/out of container
      '~/docker-volumes/host:/host',
      # for DB data itself
      '~/docker-volumes/postgres:/var/lib/postgresql/data'
      ]
    image: 'postgres'
    environment:
      POSTGRES_PASSWORD: 'password'
      PGDATA: '/var/lib/postgresql/data/pgdata'
  mysql:
    container_name: 'mysql'
    ports: ['127.0.0.1:3306:3306']
    volumes: [
      # for ad-hoc transfers in/out of container
      '~/docker-volumes/host:/host',
      # for DB data itself
      '~/docker-volumes/mysql:/var/lib/mysql'
      ]
    image: 'mysql'
    environment:
      MYSQL_ROOT_PASSWORD: 'password'
  mongo:
    container_name: 'mongo'
    ports: ['127.0.0.1:27017:27017']
    volumes: [
      # for ad-hoc transfers in/out of container
      '~/docker-volumes/host:/host',
      # for DB data itself
      '~/docker-volumes/mongo:/data/db'
      ]
    image: 'mongo'
  dynamodb:
   container_name: 'dynamodb'
   ports: ['127.0.0.1:8000:8000']
   volumes: [
        # for ad-hoc transfers in/out of container
        '~/docker-volumes/host:/host',
        # for DB data itself
        '~/docker-volumes/dynamodb:/var/dynamodb_local'
        ]
   image: 'peopleperhour/dynamodb'
  redis:
    container_name: 'redis'
    ports: ['127.0.0.1:6379:6379']
    volumes: [
      # for ad-hoc transfers in/out of container
      '~/docker-volumes/host:/host',
      # for DB data itself
      '~/docker-volumes/redis:/data'
      ]
    image: 'redis'
```

Check the [docker compose file in my github dotfiles repo](https://github.com/focusaurus/dotfiles/blob/master/docker-compose-local-dev.yml) for latest version.

## How to do basic operations

Commands are run from the host (macOS) terminal unless explicitly marked as run from within a container.

- Start everything: `docker-compose -f local-dev.yml up -d`
- Stop everything: `docker-compose -f local-dev.yml down`
- Start some DBs but not all: `docker-compose -f local-dev.yml up -d postgres mongo`
- Get a shell in the DB container: `docker exec -i -t postgres bash`
  - From here you can run the DB repl in the container like `psql`, `mongo`, etc
- Copy a file into the container: `cp some-file.sql ~/docker-volumes/host`
- Read a file from within the DB container:
  - Get a shell: `docker exec -i -t postgres bash`
  - Read the file (container shell): `more /host/some-file.sql`
- Copy a file from the container out to the host
  - Get a shell: `docker exec -i -t postgres bash`
  - Copy (container shell): `cp /path/to/some/file /host`
- Fully wipe the data and start over for one database
  - `docker-compose -f local-dev.yml stop`
  - `rm -rf ~/docker-volumes/postgres && mkdir ~/docker-volumes/postgres`
  - `docker-compose -f local-dev.yml up -d postgres`

## Bonus docker shell aliases

These may come in handy:

```sh
alias dcf="docker-compose -f ~/projects/dotfiles/docker-compose-local-dev.yml"
alias dcup="docker-compose -f ~/projects/dotfiles/docker-compose-local-dev.yml up -d"
alias deit="docker exec --interactive --tty"
alias doco="docker-compose"
alias dpa="docker ps -a"
alias drit='docker run --rm --interactive --tty'
```
