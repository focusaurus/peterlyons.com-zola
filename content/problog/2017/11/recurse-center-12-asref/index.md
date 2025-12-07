+++
title = "Recurse Center 12: AsRef"
slug = "2017/11/recurse-center-12-asref/"
date = 2017-11-27T23:10:25.729Z
+++
I spent a long time today trying to understand how the `AsRef` trait works. I failed.

I was able to split my tealeaves project code out into a handful of files and more strongly model the filesystem checks as Enums in the type system. If you are printing filesystem permission octals, don't forget the `{:o}` format string.

I find if I battle the compiler too long or just in general struggle to understand something, it drains me really quickly. No dopamine hits from little victories. This is one of the reasons I like unit testing - lots of little frequent victories and most of the time no time debugging weird production issues whilst praying for the sweet kiss of death.
