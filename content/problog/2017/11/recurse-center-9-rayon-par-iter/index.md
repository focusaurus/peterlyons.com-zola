+++
title = "Recurse Center 9: rayon par iter"
slug = "2017/11/recurse-center-9-rayon-par-iter/"
date = 2017-11-17T22:05:44.747Z
+++
Today I refactored my little rust blockchain miner to divide the mining work across multiple CPUs. The rayon crate's `par_iter()` provides the magic for this. Before coding that, I was imagining how I'd handle that given I'm searching a 32-bit integer space where each number is equally likely to be a "golden nonce" (meaning a successful block mine). The most straightforward approach I could think of would be to break the single range into equal-sized partial ranges and ask the OS to distribute the load across cores. So instead of trying 0 then 1 then 2 in serial, you'd have 4 workers starting at (using 100 for obviousness) 0, 25, 50, 75 for the first round then each would advance so you'd have 1, 26, 51, 76 and so on.

I coded a simpler scratch version and printed debug output and was delighted to see at least part of that holding true with rayon. I could definitely see several sequences of incrementing nonces being tested in ascending order, they just weren't obviously mapped to the range in a way I could grok.

I also found out the testing I did yesterday with the `shaman` crate had a bug and you can indeed both give it read-only access to an existing vector of the payload data plus you can call `.insert()` more than once, so I refactored to just call `.insert()` with a reference to the payload then again with a reference to the 4-byte nonce slice and that avoids any memory copies and mutation, which I believe is nearly as good as you can do in rust.

So now my macbook can mine 8-16x faster than yesterday. However, the concurrent version no longer has deterministic behavior, so finding the same nonce on the same payload doesn't always take the same number of hashes, and the lower difficulty setting the larger the number of possible golden nonces so on separate runs you can mine different nonces. But however with multiple runs you do see it is just a small set of nonces that repeat.

How to print progress in a unit-test-friendly way is still unclear, at least in terms of what would be the idiom in rust. Maybe since output is captured by default you just don't worry about it? Not sure but I tried to use a channel such that each worker could send a message to the parent thread whenever it wanted to report a batch of a million non-golden nonces tested, allowing the parent thread to handling printing that as a dot to stdout, but I couldn't get that to compile.

One helpful development pattern I'm using a lot is focusing on the core function signatures and building a mock-up in a separate "scratch" project I have where the guts of most functions are stubbed out to just return a hard coded value or some dummy data but all the type signatures are exactly what I need for the real project. Then I iterate on that and do my compiler battling, and when that's over only then do I start adding implementation logic to the function bodies. That has been helpful this week for sure.

In other news I made Firefox Quantum my default browser today, partially due to rust fanboyism. So far so good. The "Vertical Tabs Reloaded" add-on is nice.

Oh random shell tip when debugging checksums. I wasn't sure if I was using the rust `shaman` crate correctly so I wrote a scratch rust program to feed it data from the first command line argument, then simulate a nonce as `"aaaa"` and print the hex of that hash. Then I verified with an independent implementation via the command line: `echo -n abcdefghijkaaaa| shasum -a 256` and when both hashes were identical I knew I had the right code. (Don't forget the `-n` or you'll accidentally include the newline as your hash payload).
