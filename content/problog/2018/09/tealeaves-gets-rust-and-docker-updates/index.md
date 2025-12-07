+++
title = "tealeaves gets rust and docker updates"
slug = "2018/09/tealeaves-gets-rust-and-docker-updates/"
date = 2018-09-17T01:00:51.005Z
+++
So I've been trying to do as much of my local development from within docker containers. Each project I tweak things to be a little bit nicer than the last one. Most recently I went to update my tealeaves ssh key parser utility (which is coded in rust). Initially I was getting all manner of frustrating errors trying to get a reproducible version of rust installed with 1.30, clippy, and rustfmt. I bailed one night in frustration only to later learn that I had left my `Cargo.toml` modified from an attempt to use a local clone of one of my dependencies, and I had never cloned that repo on my new laptop, so rustc couldn't find the files it needed. Once I fixed that silly mistake things mostly started to make more sense. I was able to get a configuration where:

- I can do all my local development in the docker container
- Filesystem user is the same in the container and the host, no annoying `permission denied` errors with root-owned files
- Cargo properly caches stuff so every time you stop and start the container you don't have to redownload and rebuild the universe.

So after I had my dockerized development setup working, I went to continue my long-postponed effort to upgrade to the nom v4 crate. I was delighted to discover that in the lengthy interim, all my direct dependencies had already upgraded to nom v4. So I spent a while chasing compilers errors and making the necessary code adjustments. I almost gave up a few times, but eventually the thing compiled! I almost didn't believe the terminal. But it compiles now and all the unit tests still pass and it seems to work, so I'm pleased with that.
