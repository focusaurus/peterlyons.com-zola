+++
title = "Recurse Center 7: blockchain mining in rust"
date = 2017-11-16T00:01:27.192Z
+++
This morning I tweaked my hexagonal lambda tooling and tests. No big deal. I also started watching the "Into Rust" screencasts. The first one is great for answering the "Why Rust?" question which I got asked twice today already.

After lunch I paired on the inner guts of a blockchain miner in rust. Just enough to combine a nonce with an array of block payload bytes and hunt for a sha256 "golden nonce" with a given number of leading zero bits.

We initially arbitrarily picked a suboptimal crate for the sha256 algorithm that needed a mutable reference to the block+nonce data so we had to clone it every time we had to hash a different nonce. I eventually did a second shopping trip to crates.io and found shaman which just needed an immutable reference to our data, which was perfect. There's a little bit of bitwise logic and bit shifting required which is normally "scary low level" land from which I run away but with a pair to check me on things like "If I want the second bit of a u8 to be a 1, that's 64, right?" it was OK.

We increased the difficulty factor up to 24 leading zero bits and were able to mine blocks quickly on my 2014 mackbook, but at 25 bits it started to take a minute or so. I haven't tried 26 but maybe I'll try tonight and leave it running with a timer.

Some of the RCers played "Coding Bee" this evening which was a very amusing spectacle. It's done in 2-coder teams. You are read a small programming exercise of self-selected difficulty (easy/medium/hard). You then code a solution by each taking turns speaking a single character to a dedicated typist who types it up onto the projector, but the players are not allowed to look at the screen. There's also no backspace, just "clear line" and you have to speak all indentation and punctuation. Amazingly, some teams actually wrote correct programs.
