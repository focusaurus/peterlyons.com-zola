+++
title = "Software Projects"
+++
# Projects

Some notes about some of my more interesting projects are below. This is not an all-inclusive list, so feel free to [look through my github account](https://github.com/focusaurus) for other things I have built or contributed to.

## mjournal

[mjournal](https://mjournal.peterlyons.com) is a minimalist journaling web application. It has a simple data model with entries stored chronologically and full-text search and tags for organization. There are 2 visual themes. The stack is postgresql, express, and angularjs and it is deployed via docker.

## White Glove

[white-glove](https://github.com/focusaurus/white-glove) is a data integrity checking utility for MongoDB, CouchDB, and any set of JSON objects.

## Linkzie

<a href="https://linkzie.com" target="_blank"><img src="./linkzie_screen_shot.png" alt="Linkzie Screen Shot"></a>

[Linkzie](https://linkzie.com) is a web-based bookmark management application. It differs from many others in that it gives you "one big wall of links" layed out in a grid that is optimized for spacially-oriented thinking/memory. It has a nice drag and drop UI and in-place editing. The stack is jQuery/JavaScript in the browser, Ruby on Rails and PostgreSQL on the server.

## Commander

[Commander](https://github.com/focusaurus/commander) is my python-based command interpreter for OS automation/utility. The README on github is extensive, so click through for details.

## Wallah

Help node or python projects bootstrap themselves. [github.com/focusaurus/wallah](https://github.com/focusaurus/wallah).

## Express Code Structure

[express_code_structure](https://github.com/focusaurus/express_code_structure) is a template project for a well-organized express.js application. Created in support of one of my most popular stackoverflow answers.

## Plus Party

[Plus Party](/plus-party) is a little app I wrote to help with quick and informal numeric subtotals when tax season comes around and because I couldn't find an existing calculator app that worked this way. It has been implemented thus far in AngularJS then ReactJS then Elm.

## Flick Date Fixer

[Flickr Date Fixer](http://flickrdatefixer.jit.su) is a web application I built to fix incorrect dates on photos taken with my smartphone and uploaded to [flickr](http://flickr.com). The app is built with

* node.js
* express.js
* passport.js for OAuth integration with Flickr
* coffee-script
* flickr's API (and the node-flickr wrapper module)
* backbone.js
* jQuery

More details on my [blog post about it](/problog/2013/04/flickr-date-fixer). I'm pretty sure I'm the only person who ever used it, and I only deployed it to nodejitsu so more likley that not, the app is probably down at the moment. It's open source and available on github at [focusaurus/flickr-date-fixer](https://github.com/focusaurus/flickr-date-fixer).

## Othenticate

[Othenticate](http://othenticate.com) was an prototype I built for a SaaS product to provide account management (login, change password, etc) for web applications. It's been idle for a while after I concluded it was a bit too ambitious for a one-person lifestyle business type app. It's built on node, express, and mongodb.

## SmartEars

Back in the summer of 2001 I wrote an ear training (musical pitch recognition) program in Java Swing.

This program
will help you quickly learn to recognize and identify common musical
structures including intervals, scales/modes, and chords.

![SmartEars Advanced Chords Screen Shot](./smartears_screen1.jpg)
![SmartEars Settings Screen](./smartears_settings.jpg)

<a href="/dist/smartears.jnlp">Start SmartEars!</a>

My java friends who don't want to mess around with Java Web Start can
download <a href="/dist/smartears.jar">smartears.jar</a> and launch the
application by typing:

<code>java -jar smartears.jar</code>

Using SmartEars should be (I hope!) largely self-explanatory and easy.

Two quick tips:

* To turn off certain answers you are not intrested in
    (eg. unisons and octaves) right-click on their button (Command-click on OS X)
* To hear sounds played simultaneously (as a chord) instead of arpeggiated,
    click into the Settings Tab and set the Note Delay to 0

## BigClock

BigClock is a simple desktop clock utility that fills up the entire window with a clock, so you can get a clock of any size. It allows you to choose your own colors and time format. You can launch it through Java Web Start with the link below, or [download the jar file directly](/dist/bigclock.jar) and run it with the command 'java -jar bigclock.jar'using JRE 1.3 or newer.

[Download bigclock.jar](/dist/bigclock.jar)

Run it with <code>java -jar bigclock.jar</code>
