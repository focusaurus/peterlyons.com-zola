# Oxidation of the command line

Denver Rust Meetup

February 2019

---
# CLI Eras

(This is not-even wikipedia effort quality "history")

## Ye Olden Times

- Early 1970s
- C programming language is new and revolutionary
- UNIX philosophy of small programs
  - standard IO streams of text in/out/err
  - compose with pipelines
  - "toolkit" approach

---
## GNU FOSS

- Early 1980s
- Clean rewrites in C
- GNU/coreutils becomes integral to GNU/Linux

---
## The Middle Ages?
- 1990s, 2000s
- Not that many attempts to replace stuff
  - OK, I'm probably missing a lot here (sorry!)
  - BUT, nothing made its way into my permanent tool belt
  - At least not whose history I'm aware of from this era

---
## Courageous Ergonomics

- Django, Ruby on Rails bring developer ergonomics to the fore
- Some scripting language developers start to have the courage to tackle ambitious new projects
- **2006** ack
- **2011** ag
- **2012** Jakub Roztočil starts httpie
  - python version of `cURL` but not user-hostile

---
## Golang Renaissance

- **2012** Go v1 released
- Starts becoming the go-to language for new/ambitious CLI projects
- docker container engine
- terraform cloud provisioning
- hugo templating engine
- [mvdan/sh](https://github.com/mvdan/sh) shell formatter
  - focusaurus Seal of Approval™
- [junegunn/fzf](https://github.com/junegunn/fzf) fuzzy finder
  - focusaurus Seal of Approval™

---
## 2016+ Oxidation

- CLIs are choosing rust now
- Getting better performance (single and multi threaded)
- Fearless systems programming primitives
  - Unicode
  - Parsers
  - Awesome command line argument parsing libraries
- Developers are taking a fresh look at the ergonomics of the classic utilities

---
# grep

- **globally** search a  **regular expression** and **print** from `ed` editor
- **1973** Extracted from the `ed` text editor by Ken Thompson for UNIX v4
- C was the new hotness
- **1998** GNU version first commit

---
# ack

- **2006** Andy Lester starts work on ack
- [Beyond grep](https://beyondgrep.com)
- Written in perl
- Claims "shorter than grep to type"
- v2 and v3 rewrites have been done, still in perl
- More ergonomic for searching filesystem, especially code repositories

---
# The Silver Searcher

- `ag`: "Shorter than ack to type"
- **2011** Geoff Greer starts project
- Written in C

---
# ripgrep

- `rg` command line
- **2016** Andrew Gallant starts coding in rust
- [BurntSushi/ripgrep](https://github.com/BurntSushi/ripgrep)
- focusaurus Seal of Approval™

---
# fd

- **1971** `find` Released in UNIX v1
- Written in C
- Search the filesystem
- [sharkdp/fd](https://github.com/sharkdp/fd)
- **2017** David Peter codes in rust
- focusaurus Seal of Approval™

---
# exa

- **1971** `ls` comes with UNIX v1
- [ogham/exa](https://github.com/ogham/exa)
- focusaurus Seal of Approval™

---
# heatseeker

- [rschmitt/heatseeker](https://github.com/rschmitt/heatseeker)
- fuzzy menu utility
- focusaurus Seal of Approval™
- Key component in my [Fuzzball Desktop Automation](https://www.youtube.com/watch?v=nI0jIxzc_YQ&t=158s)

---
# sd

- **1979** UNIX v7 has `sed`
- [chmln/sd](https://github.com/chmln/sd)

---
# bat

- **1971** `cat` released with UNIX v1
- [sharkdp/bat](https://github.com/sharkdp/bat)
- Adds syntax highlighting
- git integration, automatic paging

---
# cw

- **1971** UNIX v1 includes `wc` "word count"
- "Count Words" a modern take on `wc`
- [Freaky/cw](https://github.com/Freaky/cw)

---
# hexyl

- [sharkdp/hexyl](https://github.com/sharkdp/hexyl)
- Hex editor

---
# git absorb

- [tummychow/git-absorb](https://github.com/tummychow/git-absorb)
- For automating fixup/rebase/squash git flows

---
# tealdeer

- For when man pages are tool long
- `tldr` command
- [dbrgn/tealdeer](https://github.com/dbrgn/tealdeer)

---
# GNU Coreutils

---
# Wait, What?

---
# GNU Coreutils

---
# U WOT M8?

---
# GNU coreutils (Oh Snap!)

- [uutils/coreutils](https://github.com/uutils/coreutils)
- Rewriting all of the GNU coreutils in rust
- First high-quality, maintained, fully-cross-platform implementation

---
# Install Tips

```sh
p=bat; docker run --rm --volume /tmp:/host/tmp \
  rust bash -c "cargo install $p && cp /usr/local/cargo/bin/$p /host/tmp" && \
  sudo install --mode 755 /tmp/$p /usr/local/bin
```

---
# Awesome Rust

- [rust-unofficial/awesome-rust](https://github.com/rust-unofficial/awesome-rust#system-tools)

---

# The End

peterlyons.com

@focusaurus

