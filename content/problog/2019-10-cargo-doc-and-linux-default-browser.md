+++
title = "cargo doc and linux default browser"
slug = "2019/10/cargo-doc-and-linux-default-browser/"
date = 2019-10-02T14:34:39Z
+++

So I recently learned about `cargo doc --open` while attending the [Colorado Gold Rust](https://www.cogoldrust.com) conference. However, on my linux mint machine it opened the docs in chrome instead of my default web browser which is firefox. Since I spent most of my morning rust coding time tracking down why that was and how to fix it, I figured I write a blog post about it. So here goes:

- By looking at the cargo source, I was able to see that a separate crate named `opener` was used for this
- By reading the `opener` docs and source, I determined it runs `xdg-open` but not the one from my OS package manager, a separate copy it has bundled with the crate. (xdg-open is a shell script).
- I tried running `xdg-open target/doc/my-crate/index.html` directly on the command line and noticed it opened the wrong browser, too.
- By editing my system-level xdg-open to add `set -x` debugging, I was able to determine that my xdg-open was eventually calling `gio open` which I had never heard of.
- So I read a bunch of [gio docs](https://developer.gnome.org/gio/stable/gio.html) that said the configuration comes from a file called `mimeapps.list`
  - And of coures, there's many locations where this file can live and both an old deprecated set of locations that is widely documented online and a new set of actual working locations with scant documentation
- I tried a bunch of wrong locations where `mimeapps.list` might need to be with no success
- I eventually found [this Arch Wiki page](https://wiki.archlinux.org/index.php/XDG_MIME_Applications#mimeapps.list) that described the format and accurate location of mimeapps.list: `~/.config/mimeapps.list`
- In there I found a bunch of stuff and every time I saw `google-chrome.desktop` I just preceeded it with `firefox.desktop;` and that seemed to work
