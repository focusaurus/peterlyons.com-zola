+++
title = "Recurse Center 10: filesystem palindrome"
slug = "2017/11/recurse-center-10-filesystem-palindrome/"
date = 2017-11-21T00:05:33.521Z
+++
This morning I worked on my "tealeaves" crypto diagnostic library. Just the basics of statting files but some interesting type system modeling and grokking what `#[derive(PartialOrd)]` does for enums and structs. I basically got rust to handle printing errors then warnings then OK messages via the sorting mechanisms.

I found a could-be-awesome crate called `filesystem` which gives a consistent interface for both an in-memory filesystem for fast unit tests as well as the real filesystem for production code. It's something I've always wanted. However, at the moment the API is not quite rich enough for what I want to do so I'm not sure it will work unless I enhance it.

Late in the day a group of us did a polyglot pairing exercise where we paired up to do some basic exercises in a programming language neither of us knew. I paired with JB in clojure and we implemented a program to find the longest palindrome in a sentence. I learned a bunch of stuff about clojure and it was a fun exercise.
