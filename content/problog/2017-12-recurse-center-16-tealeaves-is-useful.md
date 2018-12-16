+++
title = "Recurse Center 16: tealeaves is useful"
slug = "2017/12/recurse-center-16-tealeaves-is-useful"
date = 2017-12-01T22:53:15.983Z
+++
Today I refactored all my various scratch iterations of code to dig into the details of an ed25519 openssh private key file and integrated that into the main `tealeaves` executable file. I added some unit tests for edge cases and I've so far been pleased with how unit testing is in rust. The cargo command line is weird for testing: I often have to do something like `RUST_BACKTRACE=1 cargo test --jobs=1 long_field -- --nocapture` to try to debug which seems silly.

But basically I can run tealeaves now on my `~/.ssh` and it prints and accurate and useful description of what each file is.

There's also now a SQL study group happening so I'll be spending some time on that which was my minor project for RC which I have yet to actually spend any time on.
