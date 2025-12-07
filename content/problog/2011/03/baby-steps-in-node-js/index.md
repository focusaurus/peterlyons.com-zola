+++
title = "Baby steps in node.js"
date = 2011-03-24T00:51:22.000Z
+++
So I've been working on some toy projects in [node.js](http://nodejs.org/) for a few weeks. Node is pretty hot in the tech media these days (see [this article](http://www.theregister.co.uk/2011/03/01/the_rise_and_rise_of_node_dot_js/), among many others), and I've been having fun learning it and opening my brain to the world of async and callbacks. This post will just note a handful of the interesting things I've found thus far.

OK, so one of the first things I got enticed by was [CoffeeScript](http://jashkenas.github.com/coffee-script/) by Jeremy Ashkenas. It's a pretty little javascript dialect and does a good job of taking the [JavaScript: The Good Parts](http://oreilly.com/catalog/9780596517748) book, smashing it together with python indentation aesthetics, and making a language out of it. It all just compiles to javascript though, so there's no deep magic here. Most node.js libraries and utilities can directly work with .coffee source files without needing a manual intermediate step of running `coffee --compile` to get from .coffee to .js source code, which is key for me. There is also `coffee --compile --watch mydir` which will use FSevents to watch all .coffee files under the mydir directory and regenerate the corresponding javascript instantly every time you save them. Currently, the only thing in my stack that actually needs the .js versions are my jasmine in-browser tests.

Next I stumbled upon the CSS compiler [stylus](http://learnboost.github.com/stylus/), which is fantastic. I also looked at [SASS/SCSS](http://sass-lang.com/), but there's no good and complete node.js implementation at this time as well as [less CSS](http://lesscss.org/). All of these are great and beyond adequate. I ended up choosing stylus because it had a utility to convert .css files to .styl files automatically, makes all of the extra CSS syntax optional, meaning it's easy to start with .css and gradually refactor to .styl, the command line utility is nice, and it works great with node.js and express.js. Again, any one of these will do just fine and improve greatly upon CSS. It seems at this point the CSS problem is pretty much solved and I don't have to spend much energy on it, which is great.

Next of course we need some templates. This is where most of the variation and choice seems to exist. I looked at several. I started with [CoffeeKup](https://github.com/mauricemach/coffeekup#readme) because I was enamored with CoffeeScript and wanted to have my entire codebase in CoffeeScript. I eventually started to find all those "->" characters cumbersome though, as well as one bug that slowed my development. So I switched to [Jade](https://github.com/visionmedia/jade), which improves upon [HAML](http://haml-lang.com/). Jade is so far pretty good and very minimal. It's not perfect, but it's really pretty and I'm liking it. I also thought about [Weld](https://github.com/caolan/weld), which looks very cool but I haven't tried it yet. I [watched this video on using server side YUI](http://www.yuiblog.com/blog/2010/09/29/video-glass-node/) and honestly this looks like the shizzle. I've done some experimenting with jsdom and jquery but haven't gotten huge traction yet. I really like the idea of rendering the basic document and then after the fact doing some jquery-style changes before sending to the client.

On the middleware side I'm using [Express](http://expressjs.com/guide.html) which seems to be widely adopted. It works great with no fuss and no muss (so far, but my apps are still microscopic). For testing, it's [jasmine-node](https://github.com/mhevery/jasmine-node) on the server and [jasmine](http://pivotal.github.com/jasmine/) in the browser. The [jasbin](https://github.com/noblesamurai/jasbin) command line utility is handy for this. I've been using [zombie.js](http://zombie.labnotes.org/) for application level testing with good success.

Today I did my first real async work on the server side. I used [async](https://github.com/caolan/async) to help with this successfully. The results are great, but not stellar. The code is still a bit foreign in its layout but overall I'm grokking the async world sufficiently to make forward progress. [underscore.js](http://documentcloud.github.com/underscore/) has some handy utilities, but this is where coffeescript/javascript falls short. Consider taking a list of photo objects and extracting a list of captions from that in these languages:

<div class="code">

<pre>#Javascript + underscore.js
captions = _.pluck(photos, "caption")
</pre>

</div>

<div class="code">

<pre>#CoffeeScript
captions = photo.caption for photo in photos
</pre>

</div>

<div class="code">

<pre>#python
captions = [photo.caption for photo in photos]
</pre>

</div>

<div class="code">

<pre>#Ruby, better than javascript but not as clean as python
#The block mechanism is more generically powerful though
captions = photos.collect {|photo| photo.caption}
</pre>

</div>

I've written my business logic in [backbone.js](http://backbonejs.org) and so far so good. After some head scratching and namespace tweaking, I am able to run the exact same model code on the browser and in node on the server, which is sort of the holy grail that this whole effort was seeking. Hurray for only coding data validation and error messages once. So far so good, but again I'm still at the baby steps stage of this.

Overall my attitude about the node.js ecosystem is highly optimistic. I hope in the next year or two it gets the kind of mainstream support that rails has. Expect some more posts with more tech details sometime soon as my experiments move into the more complex guts of the applications.