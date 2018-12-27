+++
title = "Recurse Center 14: OpenSSH key files"
slug = "2017/11/recurse-center-14-openssh-key-files/"
date = 2017-11-30T01:05:34.882Z
+++
So today (my 15th day of RC sabbatical) was where the rubber was supposed to hit the road. I was working on actually digging into the meaty bits of the OpenSSH private key PEM files and starting to peek into the base64 encoded data.

I did some research this morning and futzed around with both bash pipelines and rust code to start to understand how these files work.

First fun thing I found was looking at the raw data inside a PEM-encoded private key with this pipeline:

```sh
# strip out the header/footer lines (they have dashes)
grep -v - ./local/test_files/test-ssh-ed25519-2-passphrase.privatekey |
  # Decode the base64, this handles newlines no problem
  base64 -D |
  # dump that as hex
  hexdump
0000000 6f 70 65 6e 73 73 68 2d 6b 65 79 2d 76 31 00 00
0000010 00 00 0a 61 65 73 32 35 36 2d 63 62 63 00 00 00
0000020 06 62 63 72 79 70 74 00 00 00 18 00 00 00 10 d9
0000030 3b fe b4 54 93 c8 05 a7 77 21 7d 1c a5 69 1d 00
0000040 00 00 10 00 00 00 01 00 00 00 33 00 00 00 0b 73
0000050 73 68 2d 65 64 32 35 35 31 39 00 00 00 20 2e 40
0000060 78 7a 53 e2 89 d8 8f 54 9d 4b a3 3e 56 58 85 c7
0000070 1d 52 2e 7d 78 4e 9b e3 a5 89 1b 61 79 2a 00 00
0000080 00 90 68 c8 c3 da e6 6b cd d2 2f 4a 74 ad e9 7b
0000090 75 6a a6 8f d1 6d 24 86 fa 1e b1 77 25 0c e3 fa
00000a0 30 6d da 7c 72 11 be ac 98 0e b0 7b 7d 85 87 aa
00000b0 d1 49 c7 97 0a b4 5f 6e 61 5d 10 7c cd 55 c5 38
00000c0 45 e8 4c b8 2d 23 67 7b 23 18 97 06 7a 9d 0d bc
00000d0 69 d1 88 73 ba 34 8e 39 4e 50 01 cc 36 a7 c8 8b
00000e0 58 57 e9 c5 f4 b0 eb 79 ab 1b e6 64 a0 78 59 a6
00000f0 2b 05 03 00 57 bb 7b d4 19 ed 62 98 b1 db 4e 51
0000100 27 8e b7 7e f8 e2 42 d0 18 01 99 b6 c2 30 ad 9c
0000110 33 9e                                          
0000112
```

After some futzing I was sure I had the right data and extracted some telltale ASCII strings indicating I was definitely on the right track.

```sh
# remove the PEM header/footer dash lines
grep -v - ./local/test_files/test-ssh-ed25519-2-passphrase.privatekey |
  # Decode the base64
  base64 -D |
  # find stuff that looks like ASCII words
  strings

openssh-key-v1
aes256-cbc
bcrypt
ssh-ed25519
(some gobbledygook omitted)
```

Bingo! Now that I know some key words to look for, let me make a handy reference from ASCII to hex for these words.

```sh
for word in openssh-key-v1 aes256-cbc bcrypt ssh-ed25519 none
do
  echo -n "${word}: "
  echo -n "${word}" |
  hexdump |
  head -1 |
  cut -d " " -f 2-
done

openssh-key-v1: 6f 70 65 6e 73 73 68 2d 6b 65 79 2d 76 31
aes256-cbc: 61 65 73 32 35 36 2d 63 62 63
bcrypt: 62 63 72 79 70 74
ssh-ed25519: 73 73 68 2d 65 64 32 35 35 31 39
none: 6e 6f 6e 65
```

Nice! OK so I've been studying that and got some RC help with the openssh C source that generates it. Here's what I discovered about the byte-by-byte details of this openssh private key file.

- 14 bytes magic ASCII "openssh-key-v1"
  - We can see our hex: `6f 70 65 6e 73 73 68 2d 6b 65 79 2d 76 31`
- 1 NULL (zero) byte terminating that string
  - This is a bit weird because there's a mix of null-terminated C strings and length-prefixed string structs, but that's what it is
- 4 byte length for next string
- N bytes string cipher name
  - "none" for no passphrase (cleartext), otherwise "aes256-cbc"
  - We can see in our hex aes256-cbc `61 65 73 32 35 36 2d 63 62 63`
- 4 byte length for next string
- N bytes string kdfname (kdf means Key Derivation Function)
  - We can see in our hex bcrypt `62 63 72 79 70 74`
- 4 byte length for next string
- N bytes kdfoptions
- 4 byte integer number of public keys in this file
- one string for each public key
- then an encrypted and padded blob for the private keys

Part of the struggle researching this is AFAICT there's no clear, googlable name for this file format. It's just the bespoke openssh-key-v1 format but nobody calls it that and there's no file extension.

So mostly I think I'm actually coding a command line tool in rust that will be useful to me now. I'm excited to keep pushing forward tomorrow.
