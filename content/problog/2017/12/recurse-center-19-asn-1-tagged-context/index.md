+++
title = "Recurse Center 19: ASN.1 Tagged Context"
date = 2017-12-06T23:22:37.242Z
+++
Coding on tealeaves today was mostly pulling interesting bits out of ssh keys. Misc things discovered

- openssh will only generate 1024 bit dsa keys, which are not secure, but longer key sizes are supported by other software
- ecdsa keys the "bits" field represents either 256, 384, or 521 bit size curves and those are the only valid sizes
- The specific curves are encoded in ASN.1 as object identifiers that appear to be assigned well-known OIDs which tell you which curve it is
- At least one [stackoverflow answerer](https://security.stackexchange.com/questions/5096/rsa-vs-dsa-for-ssh-authentication-keys/46781#46781) thinks ecdsa is backdoored by the NSA

I also was struggling with tooling, which I guess is the name of the game in lower-level systems programming, and I ended up writing a little rust unix utility to hard wrap files at 32 characters after stripping whitespace so I can pipe hex dumps into it and get nice column widths. That was actually fairly fast and easy to do so for simple things it feels like once you're over the learning curve rust might actually deliver on its promise of scripting language ease with no-compromise performance at runtime. 

Later I paired with one of the RC mini-batchers who taught me about `fold -w 32` which is a standard unix tool that can do most of the same thing.
