+++
title = "Switched to Arch Linux"
date = 2020-01-12T16:38:33Z
+++

I've switched from Linux Mint to Arch Linux on both my work and personal setups now. The main motivating factors were roughly

- So many more packages were available in the Arch User Repository
  - On Ubuntu/Mint I had accumulated ~100 custom installation scripts for new or obscure packages from git and assorted random web sites. With Arch the number of packages I have to script installation for is much smaller (a handful at most). Plus keeping them up to date is properly automated now.
- I grew tired of certain things in Linux Mint Cinnamon not being in plaintext config files, especially keymappings for the desktop.
  - My new rule is settings in a text file in my dotfiles or GTFO
- I have access to a work colleague who runs arch, has a highly-tuned setup, and is willing to answer questions. This is so nice. I'm mostly over the hump now and learned how and where to find information on the web, but at the beginning in particular many things were confusing and being able to ask a question in slack and get opinionated guidance was so nice.
- Generally I was feeling a bit stuck and open to massively overhauling my software stack. Let's talk about that some more.

## Full Stack Overhaul

I'm not sure why, but I became motivated to do a major overhaul of my linux stack. I think this started when I wasn't able to find any decent clojure tooling in Atom text editor and it seemed like I was going to have to switch to VS Code. Changing editors is a major hassle for me as I get heavily used to the quirks of text selection, multi-cursor support, almost 100 custom keybindings, etc. When I finally accepted that I would need to switch editors, I think I let go of my attachment to anything in my stack and was just like "OK, here we go".

So in the last few months, I have...

- Finally got a personal Lenovo ThinkPad T480 that closely mirrors the one I use for work.
  - I was using a System76 Lemur which is terrible and my partition scheme was getting full on the root filesystem so I was going to have to reinstall anyway
  - I found one for like $900 on ebay with enough RAM and SSD for personal use, so I said "What they hey" as my Dad would say
- Switched from Linux Mint (Ubuntu-based, which is Debian-based) to Arch Linux
  - I have been 100% Debian-derived since I first started running linux circa 1999. I was under the impression that dpkg/apt-get was the best package manager available but I wasn't aware of how much the high friction for community-contributed obscure/new packages was impacting my setup. Arch AUR has a much broader selection of packages and keeping everything up to date continuously is easier
- Adopted sxhkd (simple X11 hot key daemon) for most of my keybindings. That is, anything that isn't specifically window management.
  - This has a nice text config file I can take with me across window managers
  - It has some advanced syntax features that are nice
  - The config file doesn't require extra quoting/escaping (i3 does)
- Switched to the i3wm window manager
  - This was more of a "Ross uses it so I'll probably end up there eventually"
  - I like it OK-ish I guess but I think I'll actually switch to something less hard-core
  - I don't really need tiling and i3 just being so goofy is bothering me. Please hold, work zoom I'm screensharing, while I go read the i3 docs and edit my config file to learn how to close this popup window that's occupying my entire screen.
- Switched my dotfiles system
  - I've tried a few variants of the Atlassian-suggested bare repo
  - There's one more step I think I need to configure to get this to a good state
- Reorganized my dotfiles
  - I separated this into a new dotfiles-public repo where most non-secret/non-personal things will live. It's on github as a private repo currently but I plan to make it public once it stabilizes a bit
  - I had public dotfiles in the past but the overhead of trying to keep them clean of client details, credentials, etc got to be too much and for a while I kept everything private because I couldn't manage tracking what didn't belong in a public repo
  - Now I'm going to have 2 repos: dotfiles-public and dotfiles-private
    - Shareable scripts like my fuzzball scripts go in public, but the data directories full of my specific snippets and scripts stay in private
- New hotkey approach for navigation
  - I'm pretty jazzed about this but I'm just going to write it up in my public dotfiles README and publish that when it's ready
- Starting to use systemd timers for periodic scripts
  - There's a bunch of low hanging fruit I really should just put on timers and forget about, I just have been pushing it off for a while
  - I started learning about systemd timers at the airport yesterday and I'll be putting a few scripts in there in the coming weeks

So mostly happy with my setup. Don't get me wrong, it's still linux on the desktop with all the associated terribleness and embarrassment, but mostly I feel like my systems are dialed in at this point.
