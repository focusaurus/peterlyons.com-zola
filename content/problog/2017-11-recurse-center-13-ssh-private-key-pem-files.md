+++
title = "Recurse Center 13: ssh private key PEM files"
slug = "2017/11/recurse-center-13-ssh-private-key-pem-files"
date = 2017-11-28T22:48:55.176Z
+++
Today I used the rust `pem` crate to check whether a given file was or was not parseable as PEM encoded. PEM stands for Privacy Enhanced Mail. I learned that most ssh private keys are stored as PEM files and there are ED25519, ECDSA, RSA, and DSA types (maybe more but those are the ones I'm familiar with and read about a bit in the openssh source code). Still not clear on whether the public keys are in SSLEAY format or not. Also did some pairing and showed another RCer the rust `?` operator.
