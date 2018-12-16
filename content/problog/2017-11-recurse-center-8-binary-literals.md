+++
title = "Recurse Center 8: binary literals"
slug = "2017/11/recurse-center-8-binary-literals"
date = 2017-11-17T02:18:51.355Z
+++
Not that much to report today mostly some tweaks to my rust blockchain miner exercise. I remembered rust has binary literals and bitwise operations are one place they actually are useful. I've watched all the [Into Rust](http://intorust.com) tutorials/exercises and they were great but there's only a handful. I did an exercism on isograms and demoed my rustblock program during Thursday evening demos. As tends to be the case, I learned a lot from the RCers while talking about the miner and apparently the bitcoin difficulty factor is so high that you need datacenter scale computing power to even hope to mine one block in a small number of minutes. My rust miner starts to take more than a few seconds searching for a golden nonce with about 27 or 28 leading zeros so presumably the bitcoin work factor is quite a bit larger than that (with a maximum of 256 since that's the sha size but practically has to be quite a bit lower than that to allow space for enough blocks to get unique hashes for all of bitcoin's lifetime I guess).
