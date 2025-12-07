+++
title = "Linux Mint 19 Cinnamon"
slug = "2018/07/linux-mint-19-cinnamon/"
date = 2018-07-04T19:48:31.862Z
+++
## xfce4 problems

I had some problems with xfce4 that eventually made it untenable.

* No way to make `ctrl-w` always close browser tab instead of being an emacs kill word keybinding
* xfwm4 would occassionally lock up and prevent me from dragging windows around. I had to run `xfwm4 --replace` to fix it. This is kind of a deal breaker for a window manager.
* Reordering window buttons in the window list by drag and drop didn't work
* I couldn't find good keyboard shortcuts to switch tabs in xfce4-terminal
* Sometimes on resume, wifi wouldn't work
* Laptop would not suspend properly if screensaver was active (so ridiculous)
* Keyboard shortcuts and other keyboard settings scattered around like 4 different settings apps
  * There's even 2 different apps for "Window Manager Settings" and "Window Manager Tweaks" FFS. Let's just send users on scavenger hunts recreationally.

## Linux Mint 19 Cinnamon

After experimenting with the live USB image in beta, Linux Mint 19 Cinnamon went full release recently and I installed that same day. Even though I've run linux on and off since ~1999, this was the first time I kept my home directory on a separate partition and could reinstall the OS without wiping my home directory. This has turned out to be awesome because linux does a pretty good job of keeping most personal settings in your home directory, so even after the reinstall, a lot of things continued to have my customizations. For example the actions assigned to my extra mouse buttons are configured in `~/.xbindkeysrc` and that survives the reinstall just fine.

So now I've got lots of nice things working in Cinnamon.

* `ctrl+a` does select all properly
  * I just use `home`/`end` instead of emacs keybindings as needed
* `ctrl+w` closes a chrome tab properly
* I can close the laptop lid and know the OS will actually suspend
* pomodoro applet in my panel
* `super+right`, `super+left` to switch tabs in gnome-terminal
* can reorder window buttons in the window list
* gpaste clipboard history and panel applet
* System Settings GUI is more clearly organized and usable

I also tweaked my ergodox layout to give me F11 and F12 keys which I use to switch to adjacent workspaces, and I also needed a more accessiblyALT modifier, which generally I try to avoid but it's useful for some things. I really wish I could make `super+right`/`supert+left` switch tabs in chrome.
