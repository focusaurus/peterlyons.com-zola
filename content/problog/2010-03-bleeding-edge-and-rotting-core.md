+++
title = "Bleeding Edge and Rotting Core"
slug = "2010/03/bleeding-edge-and-rotting-core"
date = 2010-03-19T08:53:53.000Z
+++
I just wanted to post some thoughts on the topic of selecting software components with regard to the maturity thereof. I think overall the programmer community is by default gung-ho about the bleeding edge. We like the shiny new toys with the bells and whistles. Once something's been around enough to have its weaknesses well understsood, we find it very frustrating to have to continue to work with it. I'm not going to offer any specific recommendations, just some things to keep in mind. The general gist though is that it takes some hard-earned pragmatism and real production experience to understand the value of using older releases of components.

First, let's define some terms. We're familiar with what is known as the bleeding edge. The new hotness. The stuff straight off the presses instilled with the glimmering light of state of the art knowledge. There's probably always been a lot of this, but there seems to have been a flurry in the past five years of so of interest in ruby, rails, erlang, clojure, scala, dozens of python app and web frameworks, etc. On the other hand, we have the old guard, which I'd like to call the rotting core. Generally we shy away from this, but there are times when it is absolutely the correct choice in certain situations.

So, let's look at some pros and cons.

Bleeding edge pros:

*   The freshest and (usually) best designs and thinking are made available
*   Almost always more succinct and expressive
*   Often more coherent, clean, and consistent
*   Embodies improvements based on lessons learned from past failings and shortcomings
*   Development tools and processes are sometimes more productive

Bleeding edge cons:

*   Development tools are usually immature and inferior
    *   IDE support is likely to lag behind
    *   Debugger may lag behind as may remote graphical debugging
    *   Performance profilers might not be there
*   Deployment issues may not have been well addressed yet
*   Updates will come more frequently causing churn
*   Software has not had as broad testing in production and is therefore likely to have more "surprises". Sometimes these can be showstoppers.
*   Community size will be smaller
*   Depth of knowledge in the community will be shallower
*   Standard library may be undergoing more flux

Rotting core pros:

*   Stable, known quantity. It may have warts and bugs, but at least we're aware of most of them by now
*   Development tools generally have solid support including remote graphical debugging, mature performance profilers, etc
*   Community size will be larger
*   Community depth of knowledge will be much deeper
*   Updates are rare and only for occasional major issues or security patches
*   standard library will be well known and stable

Rotting core cons:

*   Less exciting to developers. Yesterday's designs and paradigms.
*   Often tedious compared to the bleeding edge
*   Support issues. Standard answer may always be "update to the latest version"

And now, let's back this up with some examples and anecdotes. I think when it comes to rotting core technologies, you have both the "oldie but a goodie" category and the "oldie and a baddie" one. Currently my project has a component written against the now ancient Python 1.5.2 runtime, and we have hundreds of thousands of copies of that component installed at customer sites. It is running on something around seventy different OSes. Now, at the time when that component was originally written, this was close to the bleeding edge. We've still not entirely upgraded it because it's an oldie and a goodie. We've patched it a bunch and run it under huge loads and huge scales. We know what it can do, and we know what it can't do. We even had famous python educator Mark Lutz (Programming Python) come in to train us and give us quizzical looks when we explain that half of what he is saying doesn't apply to us since it wasn't available in python 1.5.2\. Over the years, I've come to see the merits of this and even though its frustrating, the business reality is that every year that stuff continues to run without issue is bettering the return on the initial R&D investment. It ain't broke, so we're not in a hurry to fix it.

Of course, on the other side, you've got things like Java 1.2, which I also worked with. Python has come a long way since 1.5.2, but really it's still basically the same deal, and the design was good from the start. Java has probably come even farther, but the design was a mess from the beginning and they've since seen the error of their ways and made some great improvements. I would put that one in the "oldie but a baddie" category and do what it takes to upgrade.

I remember chatting with a stranger on a plane after we each noticed that we were both programmers and were both actively programming on the plane. This was a few years ago and Ruby was still pretty much bleeding edge. He looked at me with desperation and asked me if I knew anything about debugging deadlocks, threading issues, and core dumps since his production ruby app was regularly hitting issues and his team was basically at a point where they didn't have the knowledge or tools to solve them, and it was jeopardizing their whole project. Sadly I couldn't offer any help, but I could certainly sympathize.

I also have a friend who used to work at a DNS registry run by someone very much of the "rotting core" philosophy. They ran Solaris 8 and ancient versions of lots of core C/unix utilities (bind et al), and to actually run versions that old took significant effort on their part, but it made sense for that project. They are running a piece of the Internet backbone. It's not bleeding edge stuff. It just needs stability, stability, stability, and those are the tools they needed to meet their business goals.

So next time you join a new project and start to reflexively freak out when they explain their software stack, supress your urge for a minute and get some information about the choices they have made and the reasoning and circumstances that got them where they are. You might be surprised at the difficult but pragmmatic choices that were made and hopefully you can admire and appreciate the character of those who made them.

And finally, think about the value of being able to look across a broad set of available components and correctly determine where components are in a "sweet spot" of their lifecycle, ripe to be chosen and deployed at length. That is a deep wisdom that is a long time coming.