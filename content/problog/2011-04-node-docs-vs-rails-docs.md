+++
title = "Node docs vs. Rails docs"
slug = "2011/04/node-docs-vs-rails-docs/"
date = 2011-04-05T21:15:51.000Z
+++
I've been working with [Node.js](http://nodejs.org) a lot recently and enjoying it. However, I'm not sure entirely WHY I am enjoying it. I'm writing it in [CoffeeScript](http://jashkenas.github.com/coffee-script/), which is pleasant enough, but it doesn't change the fact that javascript is lacking is basic language/library features like a Set object or hashes with non-string keys and so forth. The other day I realized part of my good feelings about node are from my experience with the docs, which normally goes as follows.

*   Each project has a single authoritative home page
    *   often the main github repo or a unique domain that just links to github
*   The docs are usually a 1-pager that explains all you need to get started
*   The examples are clear enough
*   That's all it takes. You can get up and running with that.

I really enjoy that aspect of this. Case studies include [underscore](http://documentcloud.github.com/underscore/), [backbone](http://documentcloud.github.com/backbone/), [jade](https://github.com/visionmedia/jade), [coffeescript](http://jashkenas.github.com/coffee-script/), and [express](http://expressjs.com/guide.html). Also, the docs are the right length (compared to rails). They aren't one-off blog posts on how to do X, nor are they a book-length comprehensive tutorial that builds an app from scratch. They are both full API references and guides coupled with enough tiny snippets to get you going.

Now rails on the other hand, and this might be my own fault, seems to be problematic here. For one, the gems you need often don't have enough documentation to get up and running on their github project. You are forced out into the harsh unpleasant jungle of umpteen out of date, contradictory or incorrect blog posts. One nice thing about having the main docs on github (in node land) is that all the info there is guaranteed to be current and the outdated stuff is not there (but it is still in the git history if you need it). The problem with information rot on rails related blog posts and screencasts is really annoying. Rails DOES have nice docs on the other end of the spectrum, the comprehensive gigantic tutorial, but for whatever reason these days I never read those end to end and I usually just get myself into trouble with impatient skimming. If I'm going to spend hours and hours reading something, I probably still prefer to get a physical book than read a gigantic web based tutorial.

This is just one taste of the different experience working with these two technologies. I still think I'll continue to view rails as basically the top web development framework out there (unless I try Django, maybe, but I learned rails first to force me to learn ruby), but there are definitely aspects of the rails ecosystem that rub me the wrong way.