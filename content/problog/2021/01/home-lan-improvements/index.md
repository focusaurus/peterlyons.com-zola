+++
title = "Home LAN Improvements"
date = 2021-01-24T19:55:20Z
+++

With two of us working from home, we were having trouble making due with a single wifi access point covering the whole house, especially considering our offices are at opposite sides. So we made a few attempts to address the problem and learned a bit along the way.

Since the Internet service is coaxial and there were already cable runs splitting at the ISP point of entry and terminating in each of the office rooms, my first thought was maybe we can use that wiring. A web search revealed a LAN tech called Multimedia Over Coaxial (MOCA), which despite my using coax broadband since the 90s I had never heard of. So I bought a pair of adapters that were supposedly able to extend our LAN between the rooms over the coax and at the same time use that coax for the ISP link. We spent a full day trying to make it work in various configurations. If we just ran a short coax cable directly between the 2 moca adapters, they both lit up green meaning everything is working fine. We could link them at various partial lengths of our network and get a link, but the full run between the 2 offices would never show a green link light. We tried 3 types of spiltters, point-of-entry filter, etc but it just wouldn't work. It's also super tedious to test because every coax connect/disconnect operation is at least 30s of awkward work with a pair wrenches.

So we returned that gear and tried some powerline boxes. These, as we hoped, were truly plug and play and we had a functioning network literally 90s after opening the box. But it was much lower throughput and higher latency than wifi and was therefore not going to really make things better. Another order return.

I had my property manager do some research and replace our existing single coax wall plates with plates that had both a coax and an ethernet jack. He then ran a 100' length of cat8 cable alongside the coax that ran outside our house. That length just by chance was close enough to exact that we didn't bother cutting and crimping a new end. So with now a fully wired link Stella was able to get good speed and stability for her work laptop. I also bought a second Turris Omnia wifi router to act as both an ethernet switch and additional wifi dumb access point for that side of the house.

We are now getting consistently good speeds both wired and wireless. I had strong suspicions that both MOCA and powerline ethernet were both "hooey" with severe limitations to their practical application, and for this situation, those suspicions were confirmed to be true.
