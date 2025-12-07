+++
title = "The Art of the node.js Rescue"
date = 2018-07-11T04:53:53.422Z
+++
I've recently been helping a client get their node.js mobile back end API server ready to launch a new service. In this post I'll outline the guidelines I use when I'm brought in to true-up a problematic node.js codebase.

## First, triage and repair server basics

Before any real rescue efforts can happen, I need to work through the fundamental issues and get up to a bare minimum of a working project and service.

**Is the code even in a git repository?** I've only encountered the "here's the zip file the previous agency delivered" once, but step one is get the existing codebase without any new modifications into an initial git commit and get it pushed to a git host.

**Does it have documentation?** Can a new developer get from `git clone` to a running server using just the README (no slack allowed!)? If not, I have to reverse engineer that and document it in the README as I figure it out. As I come to understand the basic software stack, third party service integrations, deployment setup, etc, all that gets documented.

**Are the dependencies accurately tracked?**
Usually they are but if not I fix `package.json` and generate a new `packge-lock.json` as necessary.

**Does the server start and run?** If not, I need to get to that milestone. Even though this sounds like a basic thing any project would have starting at minute 4 of its lifetime, in my experience many node projects get carried away with bullshit fancy code to handle configuration, clustering, process supervision, fancy logging setups, etc, and often that code is misguided or just flat out broken.

OK if the server will start and listen for HTTP requests, I can switch into my normal course of treatment to get it functioning well.
 
## Automated unit tests are the foundation

The next phase is setting up a good automated unit test stack. These days I reach for `tap`, `supertest`, and `nock` as my first choice libraries. Here are the important points to achieve:

* Unit tests should run locally
* Tests should be fast and deterministic
* Running partial sets of tests at any granularity should be straightforward
* Tests should be runnable under the devtools debugger

The main bit of work is finding the right set of libraries, helper functions, and setup/teardown code that make sense for the service. I usually test the HTTP interface via `supertest` because the code to call an API endpoint via supertest is concise enough to be basically in the same category as just calling a function with arguments. Since the tests are coded against the same stable API interface that the web or mobile front ends use, this is a stable integration point and I can typically overhaul or rewrite an endpoint implementation without changing its HTTP interface. Usually API endpoints are not that much code, but if you do have a really complex endpoint, go ahead and write unit tests for the various internal implementation functions.

Once the tests are working locally, I'll set up continuous integration so they work on pull requests and are integrated into github.

### Why automated unit tests?

If I put on my cynical hat for a moment, I could sum up the bulk of my consultancy as "I come in after non-unit-testing developers and get their code working by writing tests". Yes, that's a cynical characterization but there's a kernel of painful truth there.

JavaScript as a language has near-zero support for writing correct programs. It allows and encourages us to write code that does not get even the most basic analysis for correctness. On a typical low-quality node.js server codebase, about the only guarantee likely to actually be upheld is that every file in the require dependency graph is syntactically valid javascript, and absolutely nothing beyond that is guaranteed. ReferenceErrors and TypeErrors are almost guaranteed to exist in large quantity. There's a plague of code out there crashing in production that was clearly never run: not on the developer's laptop, not in CI, no one tested it in QA. First execution is on the production server crashing when triggered by an end user.

Putting on my less-cynical hat, I mostly still believe a well-tested node.js codebase is something you can reasonably deliver to a client, and you can point to some pragmatic realities it offers:

* Large set of developers able to work with it
* Enormous ecosystem of available libraries
* Good to great speed of developing features
* Good to great performance at runtime
* Excellent tooling throughout the software development lifecycle

However, these **only** hold true if you have solid test coverage. Untested javascript is such a massive liability and a terrible-odds gamble that I think we as a community working with this technology stack need to take a hard and clear stance and make the following statement:

**Untested javascript is not a viable deliverable for professional software development.** Viable professional javascript **must** be delivered with extensive tests.

Untested javascript is just incredibly likely to be rife with bugs and comes with enormous cost and risk to any refactoring. As agencies, consultants, and employees we need to stop delivering it. Clients need to be educated to insist on a working automated test suite running in a continuous integration system as a baseline deliverable. I would say this is analogous to a plumber leaving a job without ever having put running water through the system.

## Establishing Patterns and Antipatterns

A node server codebase lends itself to boilerplatey patterns repeated across a lot of endpoints. I generally set up a dedicated set of example routes to establish the new, correct code patterns with good examples. These of course have full unit test coverage and the idea is to have clean patterns for input validation, control flow, error handling, logging, etc.

There are also usually repeated antipatterns. Of course, a well-applied middleware could potentially eliminate a whole class of boilerplate, so that's the ideal target, but often times I find little micro-antipatterns in how the DB is queried or promises are used, etc. I code up examples that illustrate how these are broken and point to the corrected patterns that should be applied when making changes to particular endpoints.

## Tracking and fixing bugs

Once the unit testing stack is solid, I begin the main phase of the real work here which is going through the API endpoints and identifying where the bugs and issues are. The unit tests are the guide here and the work should be prioritized using whatever information is available. Focus on the high-importance or high-frequency API calls first and leave the ancillary and supporting calls until later.

The key tools for this include basic logging, a bug tracking tool, and optionally an error tracking service such as Sentry. The process loop I will repeat many times in this phase will look more or less as follows:

* Identify a potential bug via an error in the log file, a server crash with stack trace, or a specific API response that is known to be incorrect
* File a bug for the issue in the bug tracker with the relevant details so it can be understood and reproduced
* Reproduce the failure in a unit test. Be sure to do this before making any changes to the relevant application code.
* Once reproduced in a failing test, code a fix for the issue
* Guide the fix through delivery and mark as resolved

## Resist the temptation to rewrite and overhaul

When faced with a nasty codebase, one may feel discomfort, frustration, and anxiety about the state of the code. These feelings can make the following things really tempting:

* Start a new codebase entirely
* Bulk update all the dependencies to latest
* Update to the latest node.js and npm
* Do some drastic modification across the entire codebase

My advice here is to resist this temptation. All of these activities I think serve the developer's emotions at the expense of value to the client.

A rewrite discards any latent value in the codebase and forces the client to pay again from scratch for development of the functionality of the server. In extreme cases, this can be the only reasonable way forward, but 98% of the time the codebase can be salvaged. If you make a recommendation to your client to rewrite, make sure you have a compelling cost/benefit analysis. And on the other side, be aware of how the sunk cost fallacy can factor in your decision to continue with an existing codebase. Of course, if you do need to make a recommendation to the client to embark on a rewrite, prepare a thorough case study of how specifically the first attempt failed and how each of those failures will be specifically avoided in the rewrite.

The goal of this type of rescue is to make the software stable and reliable. Just bulk updating all the dependencies is almost certainly going introduce novel bugs and work counter to that goal. It's fine to update specific and particular dependencies when you have a concrete reason to do so, but just updating things in bulk for general "hygiene" is not appropriate in this situation, and without solid unit tests, you have no indication what has continued to work, continued to be broken, been fixed, or been broken in a novel way.

The same logic applies to updating the node.js version. Until you have a substantial set of unit tests, it's totally in conflict with the project goals to do this.

As you add unit tests and increase code coverage, at some point it becomes safer to make broad updates and changes. Exactly where that point is at is a judgement call, but I recommend being conservative here, erring on the side of more tests.

## Code autoformatting tools

I'm a huge fan of autoformatting tools (`prettier`, `eslint --fix`, etc) and they've become pretty core to how I work. I don't worry about formatting issues when I'm actually typing code, I just hit `cmd+f` and trust it to make the code pretty.

However, on an existing codebase that has not been using an autoformatter, I recommend caution. I would wait until automated unit test coverage is fairly high before considering running autoformatting across an entire codebase. And when doing so, be aware that this will essentially discard the existing git history and lose track of who wrote which code when (git blame, etc). This is a pretty steep trade-off. I personally don't value git history that much so I have my own point where I'm OK running an autoformatter on a whole codebase, just be sure to understand the trade-offs when making this decision.

If you do have valuable history in git that you don't want to mess up, another strategy to consider is file-by-file extraction of code into a set that is autoformatted and a set that is left untouched.

## Linting

`eslint` and particularly [eslint-stats](https://www.npmjs.com/package/eslint-stats) can be helpful guides. However, due to concerns about adding bugs in untested code, I don't recommend changing the code based on eslint warnings/errors until after you have unit tests coverage. These can help identify troublesome areas in the code, but don't go into the codebase and fix eslint issues throughout without unit test coverage.

## A side note about promises

Async control flow in node.js is hard. It's hard enough that many developers never really learn to write it correctly. This is true both in the callback paradigm and with promises as well. However, promises in particular seem to be an area of pervasive misuse and misunderstanding. Every node.js codebase I've found that uses promises has incorrect promise usage baked into core patterns and then repeatedly copied throughout the codebase. As a community, we really missed the mark with promises when it comes to education and tooling. Even with the eslint promise plugin, there's a huge number of issues that are plain as day to me and no eslint plugin I've found even detects them as warnings. I'm optimistic that as `async/await` takes over as the basic mechanism for async control flow, things will improve for the easy case of a series of sequential operations. However, I think we'll still have a mess to deal with for any case with looping or complex control flow patterns.

## node.js rescue checklist

* Get the code into a git repository
* Document key processes in the README
  * Initial developer setup
  * Standard development task flow
  * Overview of tech stack, deployment, integrations
* Ensure dependencies are properly tracked and documented
* Ensure the server starts and runs
* Establish a core unit testing stack
* Get tests running in CI
* Set up logging and maybe an error tracking service
* Set up code coverage reports
* Set up linting
* Track bugs in a bug tracker
* Reproduce bugs in unit tests
* Add unit tests to get substantial code coverage
* Set up autoformatting
