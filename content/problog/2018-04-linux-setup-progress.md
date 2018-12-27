+++
title = "Linux Setup Progress"
slug = "2018/04/linux-setup-progress/"
date = 2018-04-21T22:42:02.765Z
+++
Here's some miscellaneous notes on what I've gotten set up on my new linux laptop so far.

## Distribution and Desktop Environment

I tried 3:

- PopOS (ubuntu tweaked for system76, gnome-shell desktop)
- Xubuntu (ubuntu with Xfce4 desktop)
- Linux Mint Xfce4 (ubuntu with xfce4 desktop)

I like to think that I don't care that much about my desktop environment but I couldn't find a good clipboard manager for gnome shell and that was enough to make my try some others.

I don't know what went on with my Xubuntu install but it was a disaster. No gui to set up wifi out of the box and weird crashiness. I ran away screaming.

Linux Mint Xfce4 edition is where I landed and so far is working OK.

## Text Snippets

On mac I had a keyboard maestro macro that I loved that handled text expansion really nicely. I triggered it with `,,` and it would regex match the previous abbrevation, so to type my email I would type `em,,` and it would replace that with my email, based on the contents of `~/projects/snippets/em`. It was really easy to add new ones on the fly, replace them, etc.

I haven't found a way to exactly match that trigger mechanism on linux (and honestly it took me a long time to arrive at that final solution on the mac). But I found something also great, just different. I have an xfce4 keyboard shortcut `ctrl-,` which runs a shell script I wrote which basically populates [dmenu](https://git.suckless.org/dmenu/) with all of my abbreviations. This is nice because I get visual completion of the abbreviations. Once dmenu has handled selecting the abbreviation, my script reads the corresponding file and copies its content into the x11 clipboard via `xclip` then immediately pastes it as well via `xdotool` typing `ctrl-v` to complete the expansion. Also this dmenu approach means there's no abbreviation in the target app to delete. The main trick I had to figure out was terminal needs `ctrl-shift-v` to paste which is annoying. Here's a snippet of how I figured that out (get the PID of the current window and see if it's command is my terminal emulator)

```sh

#check for terminal or not
pid=$(xdotool getactivewindow getwindowpid)
exec=$(cat /proc/${pid}/cmdline)
if [[ "${exec}" == "xfce4-terminal" ]]; then
  xdotool key ctrl+shift+v
else
  # paste into the active window via keyboard shortcut
  xdotool key ctrl+v
fi
```

## Commander

Commander is my heads-up-display style app where I trigger fancy scripts by name. Think shell but powered by python. I found a really great fit for this in [tilda](https://github.com/lanoxx/tilda) which I have bound to `super-space` running commander it and works great.

Things are different enough that I might rethink whether I really need a long-running python process. I might port commander from python to node and the startup time might be fast enough to just run every command as a separate process either just shell or node.

## Docker

This time around my plan is to do development with command line developer tools like node, npm, pip, etc always run in a docker container with a volume mount to just one directory containing a specific project, not my entire filesystem or entire home directory. I think it will mostly work but there might be some hassles and kinks.

## Sticky Keys

Sticky keys setup is actually super easy on Xfce4: there's a checkbox in the accessibility settings. Done. The only thing I had to tweak was to add an indicator widget to the xfce4 panel to show when modifier keys are stuck down. That package is called `indicator-xkbmod`.

## Function Key App Hotkeys

I'm used to mapping my function keys to apps: F1 is browser, F2 is terminal, etc. Now that I have multiple desktops again, I *might* move to some different approach, but so far I'm trying to recreate that system. I have something that sort of works via `wmctrl` and `xprop` but there's some quirks I still need to figure out.

## Fewer modifiers

I'm realizing how nice it is on mac to have 2 good modifier keys: command and control (which I have bound to my caps lock key). I guess I should think about swapping my super and alt keys so super gets the prime real estate on either side of the space bar and alt can be next to that which is in the unreachable palm of your hand area.

In any case, my atom keybindings are going through a chaotic reorganization but hopefully everything will settle down soon.

## Emacs Key Bindings

On mac, `ctrl-a` and `ctrl-e` will move the cursor the the start and end of a line (borrowing emacs default keybindings) and this works everywhere: terminal, GUI text editors, browsers, Apple Apps, etc. I'm realizing on linux neither firefox nor chrome do this by default. Haven't looked into solving via extensions yet but either I'll do that or I'll become re-accustomed to using my hardware home/end keys again.

## Fonts

Oh my God the default resolution/zoom/font situation is letters for ants small. For chrome I set the default zoom way high. For atom I set my theme font to the largest allowed value of 20pt and it's usable but still on the small side.

## Xfce4 Settings Dialogs

I'll chalk this one up to the absence of designers from the linux world, but every settings app in Xfce4 is designed as if it were a dialog box (which it isn't, it's a standalone application), and by default comes up occupying like 20% of the screen width and requiring tons of horizontal scrolling. I'm in the habit of only working with maximized windows, so I find this to be a nuisance, but at least a quick `ctrl-m` maximizes them so they are usable.
