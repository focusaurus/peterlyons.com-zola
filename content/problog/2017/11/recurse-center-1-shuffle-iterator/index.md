+++
title = "Recurse Center 1: Shuffle Iterator"
date = 2017-11-07T23:38:20.701Z
+++
This post is pretty stream of consciousness.

Thoughts on rust language and syntax so far (about ~45 hours spent studying, trickled in over the last 6 months or so).

## The Hard

rust stuff that are hard for me, unfamiliar, or I haven't studied yet

- ref/stack/heap
- move/borrow
- lifetimes
- traits
- generics
- ampersand ref syntax, tick lifetime syntax
- keeping track of intermediate type conversions when chaining methods like `.iter().map().collect()`
- super/self unclear when/how these are OK to use, especially self

## The Easy

rust stuff that is easy for me or familiar

- pub, access
- most syntax
  - function
  - let assignment
  - match
  - loop
  - if
  - most keywords
- Cargo.toml
- most cargo subcommands are clear enough for the basics
- mod keyword (mostly I think)
- Option/Some/None, Result/OK/Err (similar to elm)

## The Bad

rust stuff I dislike

- double colon namespacing, one should suffice
- C-style abbreviations
- turbofish type hinter seems weird both syntax and position
  - unclear when I need an annotation before the assignment, a turbofish, or both/neither
- println macro is so verbose
- something feels weird about the `use` statement when bringing a trait into scope but not getting a name for that. Why is this necessary?
- I mostly don't like aliasing you can do with `use`. I acknowledge it's necessary but linters should check it's only used when necessary. If you alias something from the std lib just because you don't like the name, you discard a bunch of easy understanding and readability by Un-Ronsealing (https://en.wikipedia.org/wiki/Does_exactly_what_it_says_on_the_tin) stuff
- attribute syntax is overly verbose
- Needing doc comments on every line. I'd so much rather just have a start and end delimiter so hard wrapping via editor tooling was easy
  - maybe make an atom plugin for this?
- attribute config language. Why is there a `not(fool = "bar")` syntax instead of `foo != bar` like actual rust

## The Good

rust stuff I like

- lower_snake_case for most things
- both separating external API tests but keeping internal unit tests in the same file as the code feel good to me
- benchmarking support baked in, not that I've ever benchmarked anything, but it's cool

## Notes and Questions from Today

- don't skim the rust by example snippets, read them line by line or you'll miss key stuff
- are super and self always referring to module scopes?
- I'm losing/lost interest in the web because I feel like it's actively and rapidly and irrecoverably getting worse (mostly due to advertising and corporate interests) vs unix/command line which is at least a stable level of brokenness and not getting worse.
- Need a totally new-to-me coding process to deal with rust
  - First just get the type signatures right and return a hard coded basic value
  - one line at a time try to get something working, anything
  - separate `src/scratch.rs` file I can periodically wipe clean to have a low-context area to attempt things in isolation
- social screw ups: I referred to people as "guys" once. I'm sorry.
