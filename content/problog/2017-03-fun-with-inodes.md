+++
title = "Fun with Inodes"
slug = "2017/03/fun-with-inodes"
date = 2017-03-17T19:03:32.324Z
+++
I had an inherited client project running on an EC2 Ubuntu instance like a champ. The system had racked up nearly 900 days of uptime! Not a lot of traffic but still it was running nginx with TLS, a node/express app, and mysql with pretty much 100% uptime for over 2 years.

As I went to do some routine TLS certificate maintenance, the system started throwing "No Space Left On Device" errors. I was confused because the root filesystem still had ample free space according to `df -h`. A round of googling eventually clued me in to having exhausted all of the ext4 filesystem inodes, which again I eventually through research understood to be mostly caused by continually accumulating unused debian linux kernel .deb packages through normal automated security patching. We had at least 15 different versions of the kernel available and each requires many files under `/usr/src/linux`. I eventually found a solution consisting of:

1. Free up some inodes by `rm -rf /usr/src/linux-headers-X` where X were older versions no longer needed. You can confirm the version you are running with `uname -r`.
2. Identifying a longish list of important packages with broken dependencies and reinstalling them with `apt-get remove` followed by `apt-get install`. The list ended up being `linux-headers-virtual linux-virtual linux-image-virtual libc6-dev libstdc++6-4.6-dev g++-4.6 g++` which is rather frightening to uninstall (not sure the system would be usable if you rebooted between the remove and the reinstall).
3. Cleaning up using the commands in [this askubuntu answer](http://askubuntu.com/a/564558/43030): `apt-get install -f && apt-get autoremove`

I ended up freeing up nearly 400K inodes and over 2.5 GB of disk space during this activity. The `apt-get autoremove` for all those linux kernel image packages took a long time (several hours) as there's a bunch of processing associated with each one.

My appreciation for dpkg/apt has always been strong, but here's another anecdote to pile on. Prior to this, I've done many many successful upgrades of debian and ubuntu and even when things start to go a bit sideways, always managed to recover a working system without wiping and reinstalling. Now I know that you can run out of inodes over and over on a server for months at a stretch, foolishly reboot before attempting any repair and still boot and run your production processes fine while you handle the repairs.
