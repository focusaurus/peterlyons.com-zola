+++
title = "rust dependency hell with features"
slug = "2017/12/rust-dependency-hell-with-features/"
date = 2017-12-20T00:00:37.304Z
+++
I've encountered my first bit of rust dependency hell. I'm trying to use a combination of nom v3.2.1 (a parsing combinator framework) plus nom_pem v1.0.3 (which uses nom to parse the PEM file format) plus der-parser v0.4.4 (which uses nom to parse DER data). This would almost work EXCEPT der-parser has the following line in it's `Cargo.toml`:

`nom = {version = "^3.1", features = ["verbose-errors"]}`

I haven't used feature toggling at all yet, and my initial reaction is *OMG whose ideas was this and how did they think this would ever work?*. In this case, the feature `verbose-errors` enables a totally different and incompatible Error API in nom, so it's very likely this only works if all of your nom-based deps agree on whether to use or not use this feature. One out of line and it's a hung jury: your code doesn't compile.

So at the moment my thought is: only top-level application projects should use cargo feature toggles and library crates should never use them. But as I read more maybe it'll get refined to something like "feature toggles are OK only within the bounds defined by the semver version, but if a feature toggle changes the semver API conventions, it's verboten."

Off to read a bit more on this topic.
