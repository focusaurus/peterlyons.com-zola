+++
title = "Tools for Cleaning Up Messy JavaScript"
slug = "2015/10/tools-for-cleaning-up-messy-javascript"
date = 2015-10-22T16:38:52.770Z
+++
In my consulting work, I encounter a pretty high quantity and diversity of codebases as client projects flow in and out. For many reasons, it is very common for a project to get increasingly messy with time, and often by the time it drops in my lap, it's a certifiable mess.

Dealing with a mess can be a huge drag and productivity drain as even the simplest debugging investigation is rife with confusion, duplication, misdirection, etc. Here's a few quick tools tips to help get things organized and clean again.

## esformatter

If the overall code style is highly inconsistent or hard to read, it might make sense to hit it with a giant [esformatter](https://github.com/millermedeiros/esformatter) hammer and just force everything into a single style. The go programming language does this language-wide via [gofmt](https://golang.org/cmd/gofmt/). Keep these tips in mind:

- javascript is interpreted not compiled so if auto-formatting goes wrong and you don't have enough code coverage in unit tests, you might not discover problems until production
  - minimize this risk by autoformatting in small batches and making sure any tests you have continue to pass
- esformatter and similar tools are still pretty young and could have bugs that change your code in bad ways
  - always carefully inspect the diffs before committing automatic changes
- Do the formatting in small batches and group changes into a large number of small git commits
  - after every change, confirm via unit tests if you have them and eslint that the code is still not obviously broken
  - keeping the git commits granular will enable you to more effectively bisect the code to track down a specific problem introduced by one of these changes
- Do all the work on a branch, and do no manual code changes of any type on this branch
  - For example, don't mix some manual variable renames with automated esformatter changes
  - You want to be able to discard the branch entirely without losing and human-authored changes
- Get the project done quickly
  - This is a complete recipe for merge conflicts and you'll never get it done doing small bits at a time while active development is happening concurrently. If you need to, just declare a small moratorium on development for a weekend or whatever and get everything formatted and merged before new feature development continues

## eslint

I [covered eslint in some detail in my previous post](/problog/2015/10/eslint:-toward-javascript-lint-nirvana). Once you've got the code reasonably formatted and consistent, throw eslint at it to get a sense of where bugs and issues may lie. Often times you may be getting hundreds or thousands of errors and warnings. I think focusing on either the most frequent errors (codebase improves the most by fixing these) or least frequent (fixing these can get you to OK on a specific eslint rule quickly) are reasonable approaches. The key thing here psychologically for me is to not get overwhelmed and frustrated and hopeless.

One nice plugin that can help with initial analysis, triaging, and scheduling is [eslint-stats](https://www.npmjs.com/package/eslint-stats) which can make it easy to see which problems are most common.

## beautify-with-words

True story. A client's codebase was uglified then autoformatted by a previous developer before delivery to the client as "source code". Thus at a glance it looked like source code as it had newlines and indenting, but all the variable names had been minified to single letters. This made it extremely difficult to read. One tool that helped us gradually get back to sanity was [beautify with words](https://www.npmjs.com/package/beautify-with-words) which finds all those 1-letter variable names and generates a longer, unique, pronounceable (but otherwise gibberish) variable name for them. After that you can easily find and replace all once you understand what an appropriate semantic name for the variable is.

## grasp

There's a really cool utility called [grasp](http://www.graspjs.com/) that parses javascript into an abstract syntax tree and allows you to programmatically alter that tree, then generate new source code. Lots of potential for interesting uses here, but so far I've only really used it for the use case of syntax-aware search and replace. The problem with generic text editor search and replace for variables is it will also change that name within a string or a comment or embedded within another word, etc. The bottom line is careless find/replace in a generic text editor can break your code. With grasp, you can tell it to replace just an identifier and it really knows what that means. For example, to rename a variable from `user` to `account`, we could do:

```
grasp '#user' --replace account
```

My workflow with grasp is as follows.

- highlight a small but coherent and valid javascript snippet in my text editor
  - has to be valid JS to work with grasp. I usually grab an entire function declaration or conditional block
- copy it into the clipboard
- run grasp in the terminal:
  - `pbpaste | grasp '#user' --replace account | pbcopy`
  - this pastes the text into grasp's stdin, and copies grasp's stdout back into the clipboard
- back in my editor just paste the results in, replacing the still-selected original snippet

## Keep It Clean

Hopefully these tools will help you out in the wild cleaning up messy codebases!
