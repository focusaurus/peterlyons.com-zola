+++
title = "OpenSSH ed25519 private key file format"
slug = "2017/12/openssh-ed25519-private-key-file-format"
date = 2017-12-01T16:46:17.518Z
+++
Today I finished understanding the openssh private key format for ed25519 keys. Yesterday's analysis had a few remaining mysteries that a fellow RCer helped me solve plus a pair of mistakes that threw off some fields. So here for the record is a "complete" byte-by-byte analysis of what's inside an openssh ed25519 private key (both with and without a passphrase). This was done with OpenSSH_7.5p1, LibreSSL 2.5.4 on macOS 10.13. I say "complete" in quotes because you could go one layer deeper into the actual key payloads but for our purposes those details don't have specific meaning.

First, let's generate a test keypair (hit ENTER for no passphrase when prompted):

```sh
mkdir /tmp/test-keys
cd /tmp/test-keys
ssh-keygen -t ed25519 -f ssh-ed25519-private-key.pem
Generating public/private ed25519 key pair.
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
Your identification has been saved in ssh-ed25519-private-key.pem.
Your public key has been saved in ssh-ed25519-private-key.pem.pub.
The key fingerprint is:
SHA256:qXcj+K4QZHxJ712c/M1PPutkyxT/Hn+1RKBIHLlypY4 plyons@avi
The key's randomart image is:
+--[ED25519256]--+
|      . ..o      |
|   . . o + + o   |
|    + o o = * .  |
|   o . o B o . + |
|    .   S .   o.+|
|     . E .     +=|
|    . o o o   .**|
|     . o o .  =.O|
|      .oo     .*=|
+----[SHA256]-----+
```

Now let's get at those tasty bytes of payload as a hex dump:

```
grep -v - ssh-ed25519-private-key.pem | base64 -D | xxd -p                  
6f70656e7373682d6b65792d763100000000046e6f6e65000000046e6f6e
650000000000000001000000330000000b7373682d656432353531390000
00203cfe2afb025f46582e502b97f7dfa5a08dea09f87abfa8d5bfcaabf2
9fbb369500000090a2224bbaa2224bba0000000b7373682d656432353531
39000000203cfe2afb025f46582e502b97f7dfa5a08dea09f87abfa8d5bf
caabf29fbb36950000004002a1965d1a2684d50d29f2be0efd8e2fae3c5b
b013d06f7818416333955271a53cfe2afb025f46582e502b97f7dfa5a08d
ea09f87abfa8d5bfcaabf29fbb36950000000a706c796f6e734061766901
0203
```

OK here's how it breaks down.

```
# ASCII magic "openssh-key-v1" plus null byte
6f70656e7373682d6b65792d7631 00
00000004 int length = 4
6e6f6e65 string cipher = none
00000004 int length = 4
6e6f6e65 string kdfname = none
00000000 int length = 0
# zero-length kdfoptions placeholder here
00000001 int number of public keys = 1
00000033 int length first public key = 51 (4 + 11 + 4 + 32)
0000000b int length = 11
7373682d65643235353139 string key type = ssh-ed25519
00000020 int length = 32
# public key payload 32 bytes
# probably encoding a point on the ed25519 curve
3cfe2afb025f46582e502b97f7dfa5a0
8dea09f87abfa8d5bfcaabf29fbb3695

00000090 int length = 144 size of remaining payload
# 8 + 4 + 11 + 4 + 32 + 4 + 64 + 4 + 10 + 3
a2224bbaa2224bba iv/salt? (Not sure about these 8 bytes)

# Here's a repeat of the public key (part of the private key pair)
0000000b int length = 11
7373682d656432353531 39 string key type = ssh-ed25519
00000020  int length = 32
# public key payload 32 bytes
# probably encoding a point on the ed25519 curve
3cfe2afb025f46582e502b97f7dfa5a0
8dea09f87abfa8d5bfcaabf29fbb3695

00000040 int length = 64
# 32 bytes private key payload 1
02a1965d1a2684d50d29f2be0efd8e2f
ae3c5bb013d06f7818416333955271a5
# 32 bytes is the public/point again
3cfe2afb025f46582e502b97f7dfa5a0
8dea09f87abfa8d5bfcaabf29fbb3695

0000000a int length = 10
706c796f6e7340617669 private key payload 2
010203 padding 3 bytes incrementing integers
```

Now let's generate one and encrypt with a passphrase

```
ssh-keygen -t ed25519 -f ssh-ed25519-passphrase-private-key.pem
Generating public/private ed25519 key pair.
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
Your identification has been saved in ssh-ed25519-passphrase-private-key.pem.
Your public key has been saved in ssh-ed25519-passphrase-private-key.pem.pub.
The key fingerprint is:
SHA256:QfPM5uIVVM6yT5sXeCvSjETCcP5zmTH+Rt7wY/91Ik8 plyons@avi
The key's randomart image is:
+--[ED25519256]--+
|      . + ...    |
|       * * o     |
|        = O =    |
|         B = *   |
|        S B B =  |
|       . + O B * |
|        . o O Eo=|
|           . B..=|
|              . +|
+----[SHA256]-----+
```

Here's the dump

```
grep -v - ssh-ed25519-passphrase-private-key.pem | base64 -D | xxd -p
6f70656e7373682d6b65792d7631000000000a6165733235362d63626300
0000066263727970740000001800000010d08f6b8fd17593f246db4ac6c4
5a11930000001000000001000000330000000b7373682d65643235353139
0000002062837be86c63712896b8e0e7543e367c3abd0c0b5ad3e764ea0e
4f8ddd7d00ef000000901e60c56ef30d0ff02e07b57bf14645076c32c86c
88ecad545ca28424e4739aff5895bebd6778e70b6c54b309b9fdb0c94102
bf8cef5b97d3d75636967e67e4b9c1ee72ae81074b0ce0f7e540e051d569
05da263af3e383342cc75b3145242abb75257586a119c9d3673dfb7eabe4
696350904e7c7af3cd77f28bea10374e15bc6536c2e1029438fdd3930bee
bbc5ac30
```

Here's the annotated structure:

```
#ASCII magic "openssh-key-v1" plus null byte
6f70656e7373682d6b65792d7631 00
0000000a int length = 10
6165733235362d636263 string cipher = aes256-cbc
00000006 int length = 6
626372797074 string kdfname = bcrypt
00000018 int length = 24 (kdfoptions)
00000010 int length = 16
d08f6b8fd17593f246db4ac6c45a1193 salt/iv for bcrypt
00000010 int work factor = 16
00000001 int number of public keys = 1
00000033 int length = 51 public key 1 size (4 + 11 + 4 + 32)

# Public key 1
0000000b int length = 11
7373682d65643235353139 string key type = ssh-ed25519
00000020 int length = 32
# public key payload 32 bytes
# probably encoding a point on the ed25519 curve
62837be86c63712896b8e0e7543e367c
3abd0c0b5ad3e764ea0e4f8ddd7d00ef

00000090 int length = 144 encrypted aes256-cbc output (16x9)
1e60c56ef30d0ff02e07b57bf1464507
6c32c86c88ecad545ca28424e4739aff
5895bebd6778e70b6c54b309b9fdb0c9
4102bf8cef5b97d3d75636967e67e4b9
c1ee72ae81074b0ce0f7e540e051d569
05da263af3e383342cc75b3145242abb
75257586a119c9d3673dfb7eabe46963
50904e7c7af3cd77f28bea10374e15bc
6536c2e1029438fdd3930beebbc5ac30
```

So there you have it. You could dig even deeper into the keys themselves to extract the various specific numbers (usually they have 1-letter names from the math equations they belong to like e,n,p,q etc) but I didn't bother for this since for this key format all I want to know is that it's an ed25519 private key and whether or not it has a passphrase.

Other bits I learned while pairing are that ed25519 is the name of a specific curve in elliptic curve cryptography and the numbers represent `((2^255) - 19)` as a Mersenne prime (out of my depth here, could be wrong). Part of it is the x coordinate and then you can compute the y bit if you know the sign or something like that.

Also in the openssh source code they explicitly error out if the number of keys field isn't 1 so only 1 key is supported.

For further reading check out [How do Ed5519 keys work?](https://blog.mozilla.org/warner/2011/11/29/ed25519-keys/) by Brian Warner.

----

This post is technically my Recurse Center 15 post but it was suggested that this post would make a handy reference so I didn't want to muck up the clarity/SEO of the title.
