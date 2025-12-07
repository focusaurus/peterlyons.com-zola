+++
title = "Recurse Center 20: Parsing is hard. Let's go shopping."
slug = "2017/12/recurse-center-20-parsing-is-hard-lets-go-shopping/"
date = 2017-12-08T03:13:00.706Z
+++
So I've found that the `pem` crate I've been using doesn't parse headers, which are present in encrypted dsa private key files, and the `mailparse` crate doesn't parse properly with unix newlines, which seems to be what openssh generates even though in theory the RFCs involved require carriage return newline AFAIK.

So I spent most of the day writing my own PEM parser that handles headers and thinking about the things rust programmers think about: 

- Can this be done without allocating any extra memory?
- Have I failed at life if I have to copy this 10-byte string before freeing it 4 nanoseconds later?
- Can I represent all of my data as a giant enum so rust models it as a single `u64` bitfield or something?

You know, that kind of stuff.

But after another shopping spree on crates dot io I'm leaning heavily toward learning to use the `nom` crate to parse this. There's even an open github issue asking for an example DER private key parser, which is what I've been working on. However, the `untrusted` crate also looks promising. Tomorrow I'll see how quickly I can get something easy done with `nom`.

I also gave a talk on Serverless today and pointed out my [hexagonal-lambda](https://github.com/focusaurus/hexagonal-lambda) sample project.

Here's the unix tip of the day. If you have some utf8 characters encoded as hexadecimal you can convert to regular utf8 like this:

`echo 65636473612d736861322d6e69737470333834 | xxd -r -p` 

Which prints `ecdsa-sha2-nistp384`
