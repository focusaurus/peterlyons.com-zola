+++
title = "Reading Pseudogrammars"
date = 2020-06-12T15:57:21Z
+++

In my software development work, I encounter new syntaxes truly almost every day.

**&lt;grumplezone&gt;**

It's a gripe for me that our contemporary way of working introduces a huge new ecosystem of commands every 6 months. 

- We're on AWS, here's the CLI with 3 dozen subcommands you'll need to learn. 
- Oops, sorry it's GCP now. A lot of similar stuff but the CLI is completely distinct.
- Oh yeah it's kubernetes so there's a huge YAML grammar.
- Wait, no it's helm charts which have a grammar built on the kubernetes grammar but also golang templating which you should also learn now.
- Oh wait helm is terrible, we're using kustomize instead.

**&lt;/grumplezone&gt;**

This is usually command line program arguments, but sometimes it's file syntax or structured data in a common syntax. This means I read a lot of man pages and similar documentation. One thing I struggle with is the pseudogrammar block often found at the top of such documentation. For example, here's the pseudogrammar for the `COPY` command in `Dockerfile` syntax:

```
COPY [--chown=<user>:<group>] <src>... <dest>
COPY [--chown=<user>:<group>] ["<src>",... "<dest>"]
```

My old habit would be to skip straight past that as noise and look for examples. When I see examples, I can immediately and with no conscious cognitive effort derive what the syntax is. I guess this comes from decades of using command line programs but when I see

```
count-floopers --mode terse projects/blog/settings.json
```

I don't think "Oh dang, it only works on json files at that particular relative path, let me make some directories and move my json file around so the path matches". I also infer there's other possible values for `--mode` and it's an enum of string names. Thus I usually reach for examples but I want to get better at actually parsing and grokking the pseudogrammar.

So for the Dockerfile COPY example above, here's how I'd slowly break it down in my mind.

- OK it seems like square brackets are indicating optional stuff and angle brackets mean required
  - This is somewhat conventional but not in a rigorous or consistent way. For example, I'm pretty sure the group identifier is optional but there's not a nested pair of brackets indicating that.
- So there's a long-form option `--chown` and it takes user and group separate by colon
  - BUT because there's no example I have no idea if those need to be names or numbers
- Then comes a required src argument which I infer must be a filesystem path
- The `...` means there can be more than 1 &lt;src&gt; argument and I presume they are space separated and delivered as distinct entries in the underlying`argv` array.
- Then comes a required &lt;dest&gt; which I have to infer from context (which I probably don't have if I'm just learning this command) that this is a filesystem path inside the docker image filesystem.

So I guess I managed to grok this one, but it's pseudogrammar was pretty small. When I start to see pipe symbols. For the next few pseudogrammars I encounter, I'm going to practice reading slowly character-by-character and writing out in long form what I think each element denotes. Hopefully with a little practice I'll become more fluent in grokking these.

