+++
title = "Web Site Overhaul"
slug = "2014/02/web-site-overhaul"
date = 2014-02-20T15:24:48.429Z
+++
I'm back in consulting mode these days, so I went and spruced up the web site a bit. You'll find mostly the same content, but there's a new design featuring improved typography and a slicker adaptive design for those small screens we tote around everywhere.

I went and did a technology refresh across the whole stack as well, so the code has all been coverted [from CoffeeScript back to JavaScript](/problog/2014/01/from-coffeescript-back-to-javascript). All jQuery has been abandoned in favor of plain modern JavaScript (sometimes jokingly called vanilla.js), and the more app-like pages have been rewritten as [AngularJS](http://angularjs.org) apps.

The test suite was already pretty comprehensive, but I've made it even slicker with [supertest](https://github.com/visionmedia/supertest). I've also written a handful of tests in [karma](http://karma-runner.github.io/0.10/index.html) for the angular stuff. Pretty slick, but I still have more I could build there.

I've also been quite delighted with using [browserify](http://browserify.org/) as my browser-side module system. The contrast of the insanity of requirejs vs. my up-and-running-in-twenty-seconds experience with browserify cannot be overstated. @substack FTW. Losers, go home.

A few years ago I abandoned maintaining my own photo management software in favor of just using flickr, but I used my old photo gallery application as a nice easy sandbox to learn AngularJS, so that has been updated and has better keyboard shortcuts and performance as it's a single page application now.

My folder structure has also evolved significantly, moving away from a Ruby on Rails type layout to a group-by-coupling approach which I find immensely superior. Of course this whole site is [open source on github](https://github.com/focusaurus/peterlyons.com), so check out the overhaul everything got in the v5.0.0 tag.

Oh yes and the deployment system has been totally revamped in light of my new and deep love for [ansible](http://ansibleworks.org) and [Vagrant](http://vagrantup.com), so I can bootstrap a staging system from base OS image to fully deployed with a single command now and the whole issue of OSX local development not matching Ubuntu deployment is completely solved now.
