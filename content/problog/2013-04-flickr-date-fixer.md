+++
title = "Flickr Date Fixer"
slug = "2013/04/flickr-date-fixer/"
date = 2013-04-28T04:36:41.827Z
+++
[Try my flickr date fixer app](http://flickrdatefixer.jit.su)!

So the startup/solopreneur community really likes little mantras and axioms. I wrote a little web application that follows mantras such as:

  * solve a problem
  * focus on a small problem in a niche market
  * scratch your own itch
  * build the minimum viable product and ship quickly

I have built and released a web app that focuses on an itch I have and may serve a small niche market consisting of only myself, but with that understood, my app is able to:

  * Locate your flickr photos with an incorrect "taken" date
  * Show you a list of photos with this problem and let you choose to fix them individually or en masse

In order to find this app useful, you probably have to:

  * Take photos on an Android smartphone
  * Be running Android 2.2 "Froyo" (I suspect other version have resolved this bug)
  * Upload them to flickr

Not sure if anyone other than me fits all these criteria, but this is fundamentally a bug in the camera app on these phones and for reasons I cannot fathom, Google seems unwilling or uninterested in releasing an update with a fix. The problem is incorrect EXIF metadata within the photo image files themselves. The bug causes every photo to be marked as December 8, 2002 at noon.

The app is pretty small and gave me a nice opportunity to try some new technologies (as well as use many that have been in my preferred stack for months or years).

  * node.js
  * coffee-script
  * express.js
  * passport.js for OAuth integration with flickr
  * backbone.js and jQuery in the browser
  * require.js
  * grunt.js
  * nodejitsu

The nice thing about this app is given that it is all OAuth based and is basically a custom UI using the flickr API for all the business logic, it doesn't need any database at all. This means it is easy to deploy. So for the novelty of it, I have chosen to deploy it onto nodejitsu, and in theory they will host it for free since it is open source.

### Resources

  * [Flickr Date Fixer](http://flickrdatefixer.jit.su) running live on nodejitsu's [http://flickrdatefixer.jit.su]()
  * [flickr-date-fixer source code on github](https://github.com/focusaurus/flickr-date-fixer)
  * [Nodejitsu](http://nodejitsu.com)
