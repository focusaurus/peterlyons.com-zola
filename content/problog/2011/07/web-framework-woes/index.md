+++
title = "Web Framework Woes"
slug = "2011/07/web-framework-woes/"
date = 2011-07-05T23:10:46.000Z
+++
So my attitude for most of this year has been one of reserving judgement in favor of direct experience. As part of this, I have been trying all the latest "Kool-Aid" web development technologies even if at first glance they didn't sit right with me. So I started building the [Othenticate](http://othenticate.com) infrastructure on a shiny stack of mongodb, node.js, express, mongoose, jade, and stylus. For the most part, I love this stack. However, after I while I have come to the conclusion that for a micropreneur project such as mine, traditional RDBMS (PostgreSQL) is going to be more appropriate than dealing with the trade-offs that NoSQL is making. I won't need to scale to millions of objects, and I want ACID, a schema, and mature tools at the data layer. So I've decided I want to use PostgreSQL instead of MongoDB. However, along with this came the realization that it seems that there is no mature Object-Relational Mapper (ORM) on the node stack for PostgreSQL. There also does not seem to be a mature schema migration framework. Basically all of the other elements of the node stack are fantastic to work with, but these two might just be deal breakers for me.

So I started thinking along the lines of another stack I might use if I wanted a good PostgreSQL ORM and schema migrator. There seem to be two obvious candidates: Django and Rails, and maybe some smaller ones and probably the option of cobbling together a hybrid stack of python components. In contemplating learning another web development framework (Django) or doing another Rails project, I started doing some analysis. Below are some of my thoughts on these stacks.

First, Node.js and friends. I've been coding in node.js/express for a while and for the most part finding it fantastic. The frameworks are cleanly designed and easy to understand and work with. The environment is in general pretty straightforward (compared to rails). Node starts up instantly and has fantastic debugging support that work seamlessly with chrome's debugger via the node-inspector module. I can graphically debug the client side code in the browser, the server side code, my jasmine tests, even my server side node.js command line unit tests can be debugged in chrome. I LOVE the fact that I can re-use my model classes across the browser and server. The only real pain points are the lack of ORM, schema migrator, and the hassle of async callbacks (which is mild but it's still a hassle). Jade for templating with stylus for CSS is almost perfect.

I've also been working in rails for a while now. Overall the node/express environment feels like a better match for me. Ruby has been influenced by Perl and Perl is utter anathema to me. The fact that Rails is written in Ruby is pretty much a kiss of death for me. However, I do love ActiveRecord and the rails schema migration subsystem. But that's about it. Rails templating has decent choices although Jade is the clear king in my mind. I don't care much for the Rails controller model and routing mechanism either. But perhaps the paramount rails stopping point for me is just the way the community operates. It's a mess of gems and fads and hipsterism and uncontrolled software erosion. The documentation can't keep up with it so you end up in a sea of partially-clueful blog posts. My overall reaction to this just ends up being "this doesn't feel right".

So I've started to give serious consideration to Django. I do like python quite a lot. I was hoping Ruby would be the next major language I work in extensively, but I don't think I'm going to go down that path much farther. Working with CoffeeScript has made python feel much less elegant to me, but I can deal with it. I hear good things about the South subsystem in Django and the docs look good. I really don't want to recode my whole current effort though. So these days I'm torn. Here's a summary of my reactions in bullets.

### Node.js/Express/Etc - the good

*   Love CoffeeScript
*   Express/Connect are elegant. They are libraries you use, not a framework you must inject your code into
*   Jade and Stylus are rapidly approaching Nirvana status
*   Debugging support is top-notch
*   The functional programming sits pretty well with me
*   High concurrency through solid design is pretty sweet

### Node.js/Express/Etc - the bad

*   No good ORM for PostgreSQL
*   No good schema migrator for PostgreSQL
*   Event model means stack traces are often useless
*   No intelligent reloading of changed code on the fly
*   The async stuff, while manageable, is clearly a hinderance compared to synchronous code. It does force you to be a little more considered than you might otherwise be, though

### Rails - the good

*   ActiveRecord is awesome
*   Good schema migrator
*   Lots of handy gems
*   Culture of thorough testing

### Rails - the bad

*   Ruby is a kitchen sink language
*   Not quite optimized for modern web apps
*   Docs and blog culture don't suite me
*   A big freaking mess with ruby versions, RVM, gems, bundles
*   Not javascript means code duplication

### Django - the predicted good

*   South/ORM/Schema are supposedly very good
*   Python
*   Docs look good

### Django - the predicted bad

*   The python community has a long history of web frameworks that don't catch on. Django seems to be the winner, but I am still skeptical
*   Not JavaScript means code duplication
*   Seems like there might not be any intelligent autoreloading of code during development