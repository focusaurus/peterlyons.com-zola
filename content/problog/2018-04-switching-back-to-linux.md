+++
title = "Switching Back to Linux"
slug = "2018/04/switching-back-to-linux"
date = 2018-04-16T03:31:48.841Z
+++
So I bought a laptop from System76 with linux and I'm slowly getting my tools and environment going. I've been using macos on macbook for a while, maybe 8 years or so, not sure. I'm pretty dang adjusted to it, and so far the shift back to linux has been pretty jarring. If I wait too long to write down thoughts, I'll skip them, so here's some stream-of-consciousness notes so far.

## The New Laptop Hardware

- nice
  - light weight
  - small and light power adapter
  - normal plug on the power adapter like a lamp not a giant heavy brick that falls out of the socket
  - Keyboard has dedicated delete key, home, end, page up/down all of which I like (macbooks don't have these)
  - For the price, I get a lot more ram, SSD, disk, CPU, and ports
  - no dongles
- not nice
  - space bar on the keyboard is glitchy
  - trackpad is really really terrible. I'm not sure I'll be able to use it effectively. Probably need a dedicated mouse that I always bring with my laptop.

## Software Stuff

I have a pretty long list of stuff I need to find linux equivalents for.

The password manager situation is bleak. I use 1Password on my mac, but there's no native linux app. They have a chrome extension that works on linux, but not with local files, only with a paid cloud hosted account. I searched a long time for any viable process to get from 1Password to KeyPass without developing a new import/export tool and it looks like there's nothing ready to go, so I ponied up for the cloud account in the name of expediency. I'll probably try to write an import/export tool later but I'm pretty much dead in the water without a working password manager so I wanted to get unblocked on that.

It took a while for me to find the right commands to adjust the keyboard repeat settings, which it turns out I need to be in a very precise configuration or I find the keyboard unusable (this is the same for me on any computer). If I'm working on a friend's laptop with slow key repeat for more than 5 minutes I get frustrated and have to configure their setting. I did eventually find what I need and also found a way to get them to run when I log in so that's square now. Oh and I found the equivalent of "sticky keys". It's not as nice as on macos because there's no on-screen indication of stuck keys and AFAIK so far no easy way to turn it on/off but it's doing the main thing fine.

For launching and activating applications with hotkeys I'm using gnome keyboard shortcuts that run a script that uses `wmctrl` to find the intended window and activate it. This is so far a reasonably good substitute for my equivalent keyboard maestro macros.

For my heads-up commander terminal, I easily found `tilda` which is basically exactly what I was looking for. Luckily commander is python and largely cross platform.

WiFi "just worked" for real this time, I'm pleased to report, even the captive portal at the coffee shop from which I write this post. Well, that's mostly true in that gnome detected the captive portal, but the actual portal consent page only worked in chrome not firefox.

The screen and fonts have been a challenge so far. In general everything is too small, which I can solve probably with some combination of zoom settings and maybe a lower resolution but I want to do some more research before implementing something. I've been hacking around it with a few font size increases and some browser zooming.

In general the fonts look bad compared to macos but that's something that I adjust to quickly and stop noticing. Also that old familiar X windows pointer just looks pretty sorry. I'm not sure why but I have a mental association with that mouse pointer icon and craptastic software.

That's where I am now. It's more or less usable but I still have a pretty big laundry list of stuff to configure before I can start doing any actual project work on this laptop.
