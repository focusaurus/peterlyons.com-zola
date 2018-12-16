+++
title = "eslint: toward javascript lint nirvana"
slug = "2015/10/eslint:-toward-javascript-lint-nirvana"
date = 2015-10-22T15:42:56.241Z
+++
The world of javascript code linters is a fertile breeding ground for vociferous debate over unimportant details. It's easy to stray into the bad patterns of arguing with colleagues, playing "curly brace police", and other variants. However, used well with the right mindset and team communication, good code linters and autoformatters can be truly valuable additions to your development workflow and tool chain.

If you haven't yet discovered eslint, it's my pleasure to refer you to [the eslint about page](http://eslint.org/docs/about/). Go read the eslint philosophy. It's the strictly correct thing. eslint is "agenda free" and 100% configurable. Earlier tools starting from the grandparent of Douglas Crockford's jslint, then jshint veered off the rails there and eslint is here to take over.

So getting started with eslint can be as easy as:

```
npm install --save-dev eslint
echo node_modules >> .eslintignore
PATH=$(pwd)/node_modules/.bin:$PATH
eslint .
```

The eslint rules have pretty good, clear names. The docs are solid. I wrote my own custom formatter called [eslint-formatter-comment](https://www.npmjs.com/package/eslint-formatter-comment) which I use for text editor friendliness and rule-disabling convenience.

If you want to role with some of the more prolific npm authors, you can decide to start with the [@feross/standard](https://github.com/feross/standard) configuration by doing `npm install --save-dev eslint-config-standard` then adding this to your `.eslintrc` JSON file:

```
{
  "extends": [
    "./node_modules/eslint-config-standard/eslintrc.json"
  ]
}
```

## Formatting With esformatter

OK great so eslint has found hundreds of issues with your code. What do you do? Manually fixing them can be very time consuming, tedious, and error prone. eslint now has the `--fix` command and can automatically fix up your source code for some (but not all) rules. I haven't tried it out yet as when I first started working with eslint that feature didn't exist. But you should give it a try and hopefully its capabilities will continue to expand with time. However, there's another project [esformatter](https://github.com/millermedeiros/esformatter) that can do most code style fixes (indentation, braces, spacing, semicolons, etc) automatically.

When I found esformatter, tried it, and found it to be by-and-large correct and reliable, it was a godsend. I work on so many different client projects as well as some nonprofit codebases where most developers only contribute on a handful of days. This leads to highly inconsistent codebases in terms of format/style. To be able to just define a `.esformatter` config and fix up the entire codebase in one fell swoop is really awesome and can be a big morale boost as well. esformatter does have some bugs, but so far they are minor and easy to work around in my experience.

## How I Roll With eslint

- install the stack
  - `npm install --save-dev eslint eslint-config-standard eslint-plugin-standard eslint-formatter-comment`
- set up my `.eslintrc` with the `extends` as above
- set up my `.eslintignore` with at least `node_modules` and whatever other project-specific paths I need to ignore
- start running it via just `eslint .` or a small wrapper script that uses my custom output format

## Atom Text Editor Integration

I have the `linter` and `linter-eslint` atom plugins installed for good integration with Atom. I can directly spot errors in my code without being visually distracting or overwhelming.

For esformatter I have the Atom `esformatter` plugin and a ctrl-f keystroke defined:

```
'.editor':
  'ctrl-. e r c': 'eslint:reload-config'
  'ctrl-. l i': 'eslint:lint'
  'ctrl-f': 'esformatter'
```

## Thoughts on feross/standard

@feross/standard is a bit controversial, but the specific choices it puts forward seem good enough to me, and given there are good tools to just automatically format code to that style, I'm OK with just embracing it. I've got 3 medium-sized projects all using it as the baseline and it's OK. I make it even stricter by adding a few more rules, most notably I'm still strongly in the camp of 80-char max line length, so I enable that rule as well. I certainly would have made some different choices, in particular I think double quotes are much better because JSON, but now that I can just hit `ctrl-f` and have the correct quotes, it's OK.

## Why Do You Even Care?

I have had colleagues chastise me for being picky about code format, saying it's a matter of personal choice and not worthwhile to point out or fix. For me, I find consistent style to be a marker of being detail-oriented and paying close attention. If a developer is sloppy or inconsistent with their code formatting, I'm immediately concerned that maybe they aren't paying careful attention to the actual behavior and semantics of their code either. It's so easy to let unused variables, shadowing, and other common errors slip into your code over time, and automated linting provides an easy fix.

## Toward Nirvana

Ideally, I'd want to see a single tool like eslint be able to handle all these tasks:

- show errors on the command line
- show errors in the editor
- automatically fix files in place on the command line
- automatically fix files in place in the editor

eslint seems headed clearly in this direction, but it's not there yet. I would love to see eslint completely subsume esformatter and make it obsolete.
