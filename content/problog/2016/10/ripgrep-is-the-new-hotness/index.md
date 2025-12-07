+++
title = "ripgrep is the new hotness"
date = 2016-10-21T21:11:04.775Z
+++
For any of you command line code searching nerds out there, just wanted to point out the newest addition to a long line of command line filesystem search utilities.

A brief, probably wildly inaccurate history goes something like this:

In the before time, the long long ago, there was `grep`. It did recursive regex searches and was pretty powerful and effective. Sometimes you would need to pair it with `find` and `xargs` to get more precision.

Sometime around 2006 Andy "petdance" Lester got sick of grep searching irrelevant metadata like SCM directories and wrote an updated tool called `ack` which was smart enough to ignore those by default. It was written in perl and faster than grep. This was touted as "25% fewer characters to type than grep". Read more at [beyondgrep.com](http://beyondgrep.com).

Not satisfied with a 3-character search command, Geoff Greer created `the_silver_searcher` in 2011. It is written in C and the command is `ag` (periodic table for silver), thus yet another 33% shorter to type than `ack`. read more at [The Silver Searcher](http://geoff.greer.fm/ag/)

Recently we've been blessed with the newest candidate for king: ripgrep. ripgrep is written in rust and the command is `rg`. Read more at [BurntSushi/ripgrep](https://github.com/BurntSushi/ripgrep).

Give it a whirl: `brew install ripgrep`.

Interesting that ripgrep was not bold enough to go for the 1-character command. I wonder when someone will release a program called `s` and attempt to take the throne.

All these tools are useful, but most I think the usernames petdance and burntsushi and project name the silver searcher and ripgrep are fantastic. Great job on naming things!
