+++
title = "Recurse Center 4: Reservoir Sampling"
date = 2017-11-10T23:08:36.767Z
+++
This morning I battled the borrow checker for a while trying to properly pass a variable through a closure to a child thread. I eventually figured out calling `.to_owned()` in the right place was needed, but it took a long time to get to that point. My normal urge is to try to understand what's happening by studying closely the compiler error message and the standard library docs, but for pragmatic reasons I need to let go of that and not wait to just google "how to X in rust" sooner rather than later.

In the afternoon I paired with Casey on refining my rust basics for my little toy CLI apps and learned some good idioms there with the question operator. Then we refactored my tirefox program to use the reservoir sampling algorithm from The Art of Computer Programming so we could sample our words file in a single pass instead of needing a separate pass to count the words.

I managed to get in 2 sets of physical exercise which some of the RCers do periodically and two halfway decent naps which made a huge difference (it's after 6PM and I'm still functioning). Another takeaway is that I learn a lot while pairing so I intend to request to pair very frequently and accept all offers of pairing.
