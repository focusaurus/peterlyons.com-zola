+++
title = "From CoffeeScript Back to JavaScript"
date = 2014-01-22T17:50:43.717Z
+++
So after about two years of preferring CoffeeScript for my application code, I'm switching back to JavaScript. Here are some thoughts on my experience.

## Why I Am Switching Back

So in winter 2011, given my personal situation and skillset, the cost/benefit equation for CoffeeScript was an overall positive. What I have found is that in the intervening two years, the equation has reversed to be an overall negative for CoffeeScript. So that's why I'm switching, Here are some of the specifics.

When I first started writing CoffeeScript, it made things easy for me. Some of this had to do with my background in python and my disfluency at the time with idiomatic JavaScript. Since then my JavaScript has gotten much better and I've learned how to write it idiomatically. Also the general availability of ECMAScript 5 as well as underscore/lodash helped a lot there.

These days I make heavy use of node-inspector and the v8/chrome debugger. Before, I was mostly a stack trace and `console.log` debugger. But now I find tremendous power and clarity stepping through my code in node-inspector, and this works much better when the code I see in node-inspector is exactly the same as the code I see in my text editor.

I've grown weary of the compiler overhead, extra build step, extra dependencies, extra tooling, and helping n00bs when they mix tabs and spaces and get compile errors.

Also, the community overall has had more time to settle. Many hip things that had potential to catch on have been pretty soundly spurned, at least by the node.js thought leadership. For example, fibers, coffeescript, iced coffeescript. I think the Ruby on Rails use of CoffeeScript by default is probably the single biggest vote of support and will probably keep CoffeeScript alive and prominent for at least a few years, but within the node.js community it is past peak and on the decline I think.

## CoffeeScript Features I Valued Most

**No explicit punctuation to close a block**. I do indeed strongly prefer significant white space and required indentation. CoffeeScript gives me one less thing to obsess over and OCD about, and when I write JavaScript, especially when I refactor heavily-nested node.js code with callbacks, managing all those `});` marks is a real nuisance. I hope to get reliable auto-formatting working in my sublime text setup soon. At the moment I have good linters, but no 1-click "just fix all the formatting" button yet.

**multiline string literals**. Oh my God, as a web developer everything I do all day is manipulating strings. I can't believe we don't have first-class string support in our language. This is such a no-downside complete touchdown feature.

**string interpolation**. Again, this is like what we do, y'know, all the time.

**for loops and list comprehensions**. Python got these right in the 90s. Why can't we have nice things?

**existential operator (user?.name)**. This really does come in handy and really does generate JavaScript that is more correct than what you would code by hand.

## CoffeeScript Features That Are Nice But Not Ultimately Compelling

**skinny arrow functions**. Good use of punctuation but I have editor macros anyway so I don't actually type the word "function" ever.

**default function arguments**. Also very handy. However, my code tends to use fewer and fewer function arguments and making them optional is rarer and rarer. What I really want is language support for an `options` object with a set of default values.

**array slicing and splicing**. I think if you are doing this a lot, you are probably misusing arrays and might be better served with other data structures.

**nested object literals without so much punctuation and syntax**. Yes, this is nice, especially for options objects and configuration objects. But I can live without it.

**splat arguments**. Also quite nice and saves error-prone boilerplate, but I also don't code varargs functions often enough to feel this pain sharply.

## CoffeeScript Features I Just Plain Dislike Now

**optional parentheses**. These just don't ultimately help consistently or by a large enough amount. Another thing python got correct.

**classes and all Object Oriented features**. I think these features are ultimately out of harmony with JavaScript at a deep level. Embrace prototypes, mixins, and the truth about JavaScript. This is an uphill battle that you just can't win. Also if you are using inheritence very often there are more idiomatic ways to get comparable code reuse.

**fat arrow functions**. I actually now find `var self = this;` to be clearer and easier to explain and understand. I've also grokked `function.bind` and make pretty frequent use of that without missing fat arrows that much.

**@ symbol for this**. I generally don't like punctuation, thus my complete resentment of perl and all its progeny. I'd rather type four lowercase letters `this` which convey some meaning than rely on assigning meaning to punctuation symbols arbitrarily.

**using words instead of punctuation for logical operators**. This is basically inconsistent with my point above about the @ symbol, but I read something by TJ Holowaychuk that convinced me that reading logical expressions with the punctuation standing out is actually very easy, but when they are words instead it's actually harder to scan them at a glance.

**aliases for true and false**. Complete useless bloat. true and false. Done.

## Practical Considerations

When I started with CoffeeScript, I wasn't that concerned with the wider node.js and JavaScript community. I enjoy eschewing social norms and being independent. However, now I am more interested in writing open source npm packages and contributing to others' modules. Thus I think it makes sense for me to focus on JavaScript.

One point I want to be clear on is that I think it has always been a poor choice to code a reusable open source node.js module in CoffeeScript. Those should always be in JavaScript, unless of course what they do is directly about CoffeeScript (like connect-coffee-script). However, for applications themselves are are generally not reusable, it's fine to use CoffeeScript if the cost/benefit equation is positive for you and your team.

But for me I'm more and more extracting reusable modules from my applications and once that happens it's a pain to switch between CoffeeScript for the application code and JavaScript for the reusable modules the application uses, which are often worked on in parallel. So that's another practical consideration pushing me to all JavaScript.

## Was Coding CoffeeScript A Mistake?

Absolutely not. I'm a better programmer overall, a better CoffeeScript programmer, and a better JavaScript programmer because I made a significant investment and effort to learn and use CoffeeScript on several small applications. Especially if you don't know python or ruby, learning CoffeeScript and using it in a few small applications will teach you valuable things.

So if you have never coded CoffeeScript and are thinking about it, here's my take:

  * reusable open source modules: JavaScript
  * Small application(s) with few developers: CoffeeScript, sure. Try it out. If, like me, you change your mind a year or two later, the cost to switch back to JavaScript is quite low.
  * A huge application you are building a company around or have a large team working on: JavaScript. In this case the chances of ever successfully switching back to JavaScript are pretty slim.
