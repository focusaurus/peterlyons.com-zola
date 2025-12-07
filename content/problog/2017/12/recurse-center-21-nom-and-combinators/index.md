+++
title = "Recurse Center 21: nom and combinators"
date = 2017-12-09T01:37:35.630Z
+++
Last night I asked RC about whether `nom` or `untrusted` seemed like better crate choices for parsing mixed text and binary file formats. This morning I woke up super early for no reason and was ready to go so I watched RC alumnus Stefanie Schirmer's talk on parser combinators.

{{ youtube(id="oU2418-8_KI") }}

Then I was excited to dig in so after I commuted in to RC early I searched on crates for "nom pem" since the PEM format was what I needed to parse next. I found an existing crate `nom_pem` that looked promising so I gave it a whirl. I was able to get it to parse a test file but I couldn't get at the parsed data. I was getting a "that field is private" error which was odd. How was I supposed to do anything with this parser if the parser output is private? So I looked again at the crate and saw "Last updated 2 hours ago". That was not the most recent update, that was the only update ever. Someone had published a nom PEM parsing crate to crates.io while I was watching the combinator video!

So I was download number 5 (probably a bunch of bots beat me to it) for that crate and the first github star. Within a few hours I had forked it and sent in 3 small PRs to fix trivial but showstopper issues, and by the afternoon they all had been merged. Go open source!

So I dove into learning `nom` which makes heavy use of macros which are hard. I spent basically all day starting with the most trivial example of like "can I tell that 'a' is the letter 'a'?" and eventually was at the point where I could parse the openssh public key format. Then I started to refactor that code into tealeaves but there's still more to do.

Today I also heard one of the RC mini-batchers talk about some cool clojure spec libraries and had a nice dinner out instead of take-out which was fun.

Today's unix command line tip is that there's a golang project by google called [der-ascii](https://github.com/google/der-ascii) that can translate both ways between the binary DER format used in some crypto stuff and an editable ascii version. Works like this:

```
grep -v - files/ssh-rsa-1024-a-private-key.pem| base64 -D | der2ascii
SEQUENCE {
  INTEGER { 0 }
  INTEGER { `00a3475d589021587893902869f524c6493856c3ad46f28eeee793a22da33dfd0c690f67a99b3acef3dcc877f4ad98fb91feb6c39d25a28871ad73a03bc7143a559de8eb22e3ca69a72ca6059a7ff5526878de96d29d82f2227be0308efb1e9f5fbf256c11f35e7ee8213961980b208666463f48c115a884aabc1ba7705f3293a7` }
  INTEGER { 65537 }
  INTEGER { `3bfa5915d14c0e7dac67061176159e2903630bda38f79cfdb15f8ff187c79b8ed580ed29667641d35ec4dd1baa314a282512e9e46e10b86259bee19b53d3e06140b6b2bfaaf9434b92569e5f67cd7d90deeeb0fb609fcdacb83518da6e7f39dc5c39bfb726362458fae49c03127338799e1104183cb4015a71b5f1cea91dd621` }
  INTEGER { `00d07dcd4433eebddf5ca318643c4b6066bc37ebd01e9b9468e8b97a0d9542b15ad236247a43f35b9a54acc7398ef9b0283658ca103e1b3e2eed4bf9f0b2abf4bf` }
  INTEGER { `00c87c1d8693dc1d624e30e6627fd79246da11aac0f95467193226a348cfb0ec2c605516cb73a472d558b54752666445046bb4e02057227260208f744832a29319` }
  INTEGER { `0b2b622ed0356f18a346dd8ca92a449cdc6286909cc32afd3fd287f66853ad5ab73e4d4ffb89f3135e8bef1467537b1b7c65df55656e62337365099bda8699d3` }
  INTEGER { `394f31697ceed8ff76f68784f4a27cd0001a38c37d02618e5445b33b67135e0fb961d9684320692b0f769272bd8e4024695d850bf99c8131755d4c922ed74651` }
  INTEGER { `54dfe6859a0ca3df5d85bbc031b6da4428af4328629157045495aedc9f3056b2538ebf513fbcc4bfe79d4a35a7cc3afedf79b7f856997cb3783dfad052a6ca06` }
}
```

Pretty handy! I couldn't find it in homebrew so I had to compile it by hand and manually install it, but it works.
