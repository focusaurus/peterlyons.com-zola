+++
title = "Recurse Center 17: ssh public keys"
slug = "2017/12/recurse-center-17-ssh-public-keys"
date = 2017-12-05T01:48:47.759Z
+++
This morning I paired on figuring out the structure of rsa private keys which was much easier since someone already wrote [detailed documentation](https://etherhack.co.uk/asymmetric/docs/rsa_key_breakdown.html) with fabulous color-coded binary structures. So mostly we just needed to figure out specifically what is meant when someone says "this is a 1024-bit rsa key". The answer is it's the size of the *modulus* field.

Then we needed the rust code to parse it out, which we used the `yasna` crate for. My pair had an excellent catch of the fact that we were getting an error due to "extra data at end of file" because we were only parsing the first few fields and ignore the rest which are uninteresting, but yasna expects you to fully parse the ASN.1 structure it seems.

After that we dug into the public key formats which are generally smaller and simpler. I think I have ed25519 and rsa figured out and can confirm you can match corresponding private/public keys by a common value in the payload. Also you can detect trivial tampering of the algorithm label field as that data is duplicated in the base64 payload (which you could of course also tamper with).

This afternoon there was a great web security presentation and a bunch of us will be doing a web security capture the flag exercise/contest this week. Looks fun but I think I'll have to time-box my effort as there are at least 48 vulnerabilities to be found and it's mostly unaided discovery of them.
