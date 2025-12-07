+++
title = "Cuddle Up to KDL"
date = 2023-11-16T15:13:25Z
+++

I've been trying out a relatively new config file format called [KDL](https://kdl.dev). It's pronounced "cuddle" and here's a very quick run-down of what it's for and why I find it worth experimenting with. It's a general purpose data language that feels mostly like a blend of JSON, command line, and XML. So it would be useable for use cases including configuration files, data interchange, and data storage, but so far I've only been considering it for the use case of a configuration file intended for manual editing by me primarily.

Read [the main kdl.dev](https://kdl.dev) site for a very nice intro and full docs, but to just give you the gist of it:

* It has nice syntax
  * Nesting with curly braces works fine even for deep trees
  * No need to quote every property like JSON
  * More terse than JSON without getting into YAML ambiguity and gotchas
* It supports comments properly
* It has a nice spec, a test suite, and docs around consistent interchange between JSON and KDL

# Don't link to xkcd. Don't do it.

Yes, I've seen the comic. You've seen the comic. Everyone has seen the comic. There are real and painful issues with JSON, YAML, TOML, XML, and bespoke formats that make exploring new formats interesting and compelling **to me**. If you are hoping for a world where someone created the one true syntax and everyone just used that and lived happily ever after, I'm sorry to disappoint you. You might be best served by closing this browser tab and moving on at this point.

The [KDL FAQ](https://kdl.dev/#faq) addresses the common "Why don't you just use language X?" questions.

# Using KDL in my day to day

## rofi and launch lag

I am a huge fan of a utility program called [rofi](https://github.com/davatorium/rofi) which I use to build many pop-up windows in my desktop environment that are absolutely the core of my workflow: switching programs, running scripts, opening bookmarks, grabbing emoji, etc. I ended up building my own variant because I wanted slightly different behavior (stay running permanently instead of do-then-exit) and I couldn't find a way to do it with the popular rofi project. So I set out to write a basic version very tailored to my needs, which ended up being an interesting journey.

## false start in go

I started in go because I love the static binaries and not mucking with cloning source repos, installing interpreters, installing dependencies, etc.

My config file started as JSON and has a nested tree structure. I quickly realized how annoying this is to handle in go and struggled to model the types nicely as go structs that could be unmarshaled. 

Because I was keen to just get something working to confirm or deny my hypothesis that a custom rofi variant would actually solve my problem, I knew I could do this way faster in node.js. This type of thing is cake in node, so I switched to node using commonjs modules and vanilla javascript.

## node.js: nofi and the elm architecture

I got that version working well enough pretty quickly. I named the project "nofi". I haven't done much building of true terminal TUI style apps (and it's been mostly bash scripts), so I wasn't sure whether I'd need a terminal library to get some widgets, screen layout stuff, something to deal with the terminal and treat it essentially like a GUI toolkit. I decided pretty early to try a basic [elm architecture](https://guide.elm-lang.org/architecture/) which at this point has proven itself to be an amazing balance of utility and beauty/simplicity. I just hand coded a very basic `update()` & `view()` API and keystroke event handling. No library for this although I'm sure many exist, I just coded them up loosely, not worrying to much initially about doing things like `console.log` during the `update(model, message)` totally in dirty personal project mode.

I got the thing fully functioning way faster than I expected and it was working and clocking in under 200 lines of code. I added some unit tests since the elm architecture makes that so very easy.

## replacing JSON with KDL

I think it was at exactly this point that I discovered KDL on mastodon and immediately thought "Hmm. I bet this would be nice for nofi so I could add comments". It would also be way easier to quickly add to my config file without too much friction since my use case maps so nicely to the KDL syntax. So I grabbed the js parsing library and ported my config file from JSON to KDL and swapped out `JSON.parse()` for the `kdl.parse()`.

## A porting frenzy

Because of my current circumstances of keeping my tech skills up to date and job searching, things then got interesting. It went down roughly like this.

* I ported nofi to ES modules
* I ported nofi to typescript
* I ported nofi from node to bun
* I ported the unit tests to bun's built-in library

So now I had a nicer config file syntax that was very concise but not something bespoke and specific to nofi, just a generic syntax I could learn once and use a lot.

I also now had modeled the data structure in Typescript types, so maybe I could try porting it to go using that as a reference?

## Oops, no go support

At this time in Oct 2023, there were no go implementations of KDL parsing listed on the KDL website. Ah ha! I exclaimed, I will write the first go parser! So I set out to do just that.

## Parsing, PEG, and pidgeon

In my brief research about parsing, lexing, recursive descent, hand-tuned parsers, parser combinators, etc, I stumbled upon the Parsing Expression Grammar (PEG) technology and found a go implementation called [mna/pigeon](https://github.com/mna/pigeon/tree/master/examples). So I played around with that. The basic workflow is you model your language in the special PEG syntax, and then codegen builds you a library that can parse it. And the great thing was that KDL already publishes the PEG syntax in their spec (albeit with cosmetic syntax differences which seems to be a nuisance across the whole PEG ecosystem - they are all similar but not identical). So great - I could in theory take that grammar, tweak the syntax to match what pigeon needs, and get a go parser built? Maybe?

I got a lot of stuff working with this approach. The only other key thing is after the generated code has built an abstract syntax tree, it's basically a sea of `[]interface{}` in go and you need to write little snippets of go code manually to map that to nice proper types which you can design. So I modeled the basic elements of KDL - a `Document` which is basically a tree of `Node`s and nodes have `Properties` and `Args`.

I was able to get through the bulk of KDL by porting a bit of PEG, writing some go snippets, and working my way around the language incrementally. I got a lot of stuff working this way:

* node lists and node identifiers
* key/value properties
* positional arguments
* scalar data types
  * booleans
  * numbers
  * quoted strings
* nested nodes
* slashdash comments
* node type annotations

This was my night/weekend hobby project for a while, but as I got all the low hanging fruit working, I started to hit issues building the remaining bits of the PEG grammar that I was unable to debug in go. The generated code and sea of deeply nested untyped `[]interface{}` eventually stopped me in my tracks.

## Open Source Provides

At this point as I was circling back to the KDL docs to see if I missed anything, I just happened to notice that in just the past few weeks, suddenly instead of zero go implementations, there were now two (2!) separate implementations listed on the KDL site. [kdl-go](https://github.com/sblinch/kdl-go) and [gokdl](https://github.com/lunjon/gokdl). It seems I wasn't the only go developer interested, and these folks had more success. They had both written scanners and parsers by hand, which involves a lot of fiddly unicode/rune stuff. One of them claimed to pass the full suite of tests from the KDL spec. So while I still want to get my pigeon version finished, I could try to use one of these libraries to get unblocked on porting nofi to go. This timing has [happened to me before](https://peterlyons.com/problog/2017/12/recurse-center-21-nom-and-combinators/) (except an open source library for what I needed literally appeared during my subway commute into Recurse Center that time), and it's such an awesome feeling! It makes me want to high-five these people through the Internet.

## gofi and bubbletea

So I added kdl-go and felt some confirmation since the type model almost exactly matched what was in the javascript library as well as what I was working on in my kdlpigeon project. 

OK so I had my data loaded in from my config file, but how should I TUI in go? I was aware that there are great libraries for this in go, and aware of [bubbletea](https://github.com/charmbracelet/bubbletea) in particular, but oh boy was I pleased to read the docs on bubble tea and discover that it's actually the elm architecture for TUI programs in go. :chef-kiss:.

I felt immediately at home and blazed through porting my typescript implementation with my home grown elm architecture to go and bubbletea. There was basically no impedance mismatch and everything came over fast and easy. In pretty short order, I had all the basic nuts and bolts of dynamic key mapping across a nested menu structure working in go. I ported over the unit tests and then started using code coverage analysis to add unit tests to cover more paths through the big main `switch` statement within the `update()` method which is where the sausage is always made in the elm architecture.

## Daily driving gofi

Here's a screenshot of gofi at the moment.

![gofi screenshot](/problog/images/2023/gofi.png)

So gofi is now functionally complete and I have updated all my awesomewm keybindings and integrations to use it in my daily workflow. Keep in mind, I run this thing almost every time I switch applications so we're talking for sure hundreds if not thousands of times in a given day. It has to be blazing fast and functionally flawless.

One technical glitch in debugging TUI code in go is so far I don't know of a good way to launch the debugger from with VS Code and have a proper TTY available and way to send keystrokes. So there's some friction there which requires me to launch a `dlv` debugger process from a terminal with a TTY where the TUI can show and I can use it, then attach to that from VS Code and switch back and forth while debugging. It does work though. It's great to have a breakpoint at the beginning of `update()` and just examine all the calls there to understand your app state and how bubbletea represents the terminal as messages coming into your program's core logic.

# Aside on dynamic and static typing

 At the beginning of this project, I was not yet clear on how to structure my configuration file. I didn't know exactly what data shape to use to represent my application. I needed a few cycles of writing a flavor, trying to code against that, realizing some issue, revising the structure to address, and so on. Go being statically typed presents pretty much a hard wall here. Either you have some totally sound representation of all this and you can compile and run your program, or you cannot compile at all. Whereas in dynamic land, I can parse a document into whatever the library gives me and then interactively look at it in the debugger to learn its shape and how bits of syntax in the file get represented within the javascript program. A few sessions later, after I had a working Typescript program, porting it to go was easy and useful, but using dynamic types as a stepping stone was highly useful and effective for me.


# Fin

So go check out [KDL](https://kdl.dev) and play around with it. I would still like to get closure on my kdlpigeon project by squashing the current bug and then completing the remaining bits of the PEG grammar. I'm curious how it fares compared to the hand-coded state machine scanners and parsers in the other open source libraries.
