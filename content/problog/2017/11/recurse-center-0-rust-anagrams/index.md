+++
title = "Recurse Center 0: Rust Anagrams"
slug = "2017/11/recurse-center-0-rust-anagrams/"
date = 2017-11-07T03:05:19.626Z
+++
Today was my first day at Recurse Center! I was excited. Like Christmas excited. And in fact, I woke up at 5AM due to said excitement. We weren't supposed to show up earlier than 10AM so I had a while to wait around in the morning.

All day was orientation type stuff about the logistics of the space, time to meet people and chat over food, panels about how best to use our time here, and some lightning talks.

We did a pair programming exercise which I did in rust. We managed to get a no-op version compiling and then spent the remaining 45 minutes with various flavors of non-compiling code and battling lifetimes. After dinner I took another crack at it and had something passing all the tests after another 2 hours most of which was reading online trying to find examples that did the type conversions I needed to appease the compiler.

https://github.com/focusaurus/rust-basics/blob/master/anagram/src/lib.rs

I was pleased that RC encourages naps and plan to nap at least once a day. There are also 2 people from the F2 batch doing some rust and a bunch of folks knowledgeable about rust on the RC chat server which I think will be great because getting in-person help can save tons of time with hard-to-google rust type conversion errors such as I had tonight which amounts to "I have `Vec<&&str>` but I need `Vec<&str>`" which as you might predict is tough as a web search term.

I found these two good blog posts in my search:

- [](http://hermanradtke.com/2015/06/22/effectively-using-iterators-in-rust.html)
- [](http://hermanradtke.com/2015/05/06/creating-a-rust-function-that-accepts-string-or-str.html)

I also learned what a Functor is in one of the lightning talks and no it's not as hard as it sounds but oh man it is nothing like I what I thought it might be. In fact, after the talk I asked a question that amounts to "Wait so which of your examples is actually the functor itself: A or B" and the answer was "neither, it's C" and that was very surprising.

Today was I believe the one and only structured day at RC. Starting tomorrow it's entirely self-directed.
