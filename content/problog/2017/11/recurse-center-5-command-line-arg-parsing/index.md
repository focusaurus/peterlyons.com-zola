+++
title = "Recurse Center 5: command line arg parsing"
date = 2017-11-13T22:52:32.374Z
+++
This morning I integrated the rust clap crate into some of my little CLI exercise utilities and learned a bit about dealing with a mix of `Option` and `Result` types, which is annoying. clap is really nice. I found a problem with the docs and filed a github issue and sent them a PR. It's actually ultimately an issue with the crates.io website code so I'm hoping one of those maintainers makes a fix that will handle the situation for all crates.

I've been basically trying to make a customized `aws-vault` and hitting some frustrations. Not sure if this approach makes sense but we'll see.
