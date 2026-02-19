+++
title = "Year of Wayland on the Desktop"
date = 2026-02-07T05:00:24Z
+++

## Disclaimer: Lengthy Draft Period

Most of this post was authored in June 2025 then sat around as a draft for 8 months (things got hard at work). But there's too much material for me to fully adjust it, so this is mostly a stale post with some small updates at the bottom

## X11, thank you for your service

After struggling with getting awesomewm+X11 to respond fast enough to my leader keybind, for like a million years, plus seeing some interesting wayland compositor projects float across hacker news, I decided to see if claude code could help me set up a wayland session configuration alongside my awesomewm+X11 setup that has been my daily driver for the last 5 years give or take.

This post will document some of the packages and configurations I have so far. This is mostly for future me to reference. It's early days and since my work machine is a mac I don't clock that many hours using linux on the desktop anymore, so my needs are relatively basic these days.

## Experiments

I ended up over several months putting significant work toward using niri, then KDE plasma, then hyprland, then back to niri. Each environment had a few compelling things and a few deal-breaker issues. Overall it has not been a great experience. At the moment I have no plans to go back to X11+awesome since the slowness issues I have there are a real nuisance, but overall wayland has been a pain to work with and I've had to cobble together every - damn - thing one at a time. Briefly, the experiment results were:

- niri try 1
  - overall promising
  - rows & columns layout is interesting
  - overview is both useful and fancy
  - I got tired of ONLY having keyboard shortcuts for everything
- KDE plasma
  - works great for a basic traditional desktop
  - no performance issues
  - scripting KWin was very limited and quite bizarre
  - I would need to rely on keybinds and scripting a lot less
  - The script debugging workflow is awful
  - during this experiment, I switched display manager from lightdm to SDDM and ended up liking it and keeping it
  - the dotfiles situation is absolute madness and I bailed within a week. Don't put application cache data in my `~/.config` ya dingleheads!
- hyprland
  - more community add-ons available relative to niri
  - window manager tracks focus history which is useful
  - window rules debugging is deeply unfun
  - deal breaker issues with dialog boxes in FreeCAD
  - 1Password dialog box busted
- niri try 2
  - had to go back to niri so I could use 1Password and FreeCAD

I find myself thinking about buying a used M3 macbook and just having a laptop that works. But for now it's OK so on with the details.

## Compositor: niri

I'm trying [niri](https://github.com/YaLTeR/niri) as my compositor. It seemed like this or [hyprland](https://hypr.land/) were the only 2 interesting choices. The fact that niri is written in rust, uses [kdl](https://kdl.dev/) as its config file format, and has an interesting workspace+window organization approach was enough to convince me to take it for a spin.

I was able to get my [lightdm](https://github.com/canonical/lightdm) display manager (login screen) configured with an additional session type and log in to niri pretty easily. This left my awesomewm+X11 setup intact so I was in safe sandbox mode for experimenting, which I had been worried might be tricky but so far all is well.

## Essentials: the same

Most of my essentials worked in wayland without any changes or with very common changes:

- ghostty terminal
- kitty terminal
- firefox web browser
- 1password password manager
- obsidian note taking
- music with youtube music, mpd, and ario

## Application Switching with gofi leader keys

My desktop interaction is based upon a leader key modal model. Tapping my leader key brings up a small app I wrote, gofi, which presents me with a menu heirarchy navigable with single-letter mappings. So for example leader then "b" focuses my web browser. leader then "t" focuses my terminal. This lets me jump to my primary apps super fast. For less common things I can nest into a menu, so for example leader then "a" (mnemonic "applications") then "c" brings up a calculator. But the mechanism gofi uses to focus windows is very tightly coupled to the window manager, which for X11 was awesomewm. So gofi itself didn't need any niri changes, but I did need a separate gofi config file just for niri, and I had to port the script I have that focuses windows by application to niri, so I wrote `~/bin/niri-focus` which uses `niri msg --json windows` and `jq` to identify windows and tell niri to switch focus to them by id.

I bound my leader key to locate the window which has gofi running inside ghostty, and if not present to start it. That all came together fairly easily although porting `~/bin/niri-focus` had a learning curve. But I've scripted both awesomewm and hammerspoon this way already so I had a very clear idea of how things should work.

During niri experiment 2, I found [wlr-which-key](https://github.com/MaxVerevkin/wlr-which-key) which is essentially an exact functional equivalent of gofi, but written in rust as a true GUI app with a floating window. I had claude code port my gofi config to wlr-which-key and it worked perfectly the first time, so now I finally have a proper leader app.

## Menu Bar

By default, niri has essentially no UI whatsoever. There's no task bar or dock or anything. It seems the vibes in wayland favor this. Like ideal state after login is some fancy desktop wallpaper image and literally no other pixels. There's even screen lockers that are just like "it seems like your keyboard and mouse are broken until you type the correct password and hit enter then things just magically start working".

Anyway, wayland is weird about task bars and they call them something like layer shells or something. I have a nearly-default [waybar](https://github.com/Alexays/Waybar) config and it's fine I guess. My awesomewm wibar was perfectly dialed. I had it along the left edge with a vertical window list so I could see enough of the title of every window, and the bottom left corner was a dense cluster of exactly the widgets I want and nothing I don't.

I eventually discovered [eww](https://elkowar.github.io/eww/eww.html) and eventually got that dialed for a vertical bar on the left edge with tray widgets at the bottom and a window list at the top. It's very nice. The main annoying bit of glue is the `watch.sh` script I need to integrate eww with niri. It's kind of silly but it mostly works and things like highlighting the focused window update in real time correctly.

I think the author of niri is on to something with this idea of your stable reference stuff like your browser going on a workspace directly adjacent to a workspace with your activity-specific tools (like an editor and terminal) so you can navigate in space horizontally for your main flow and then up/down to reference docs etc.

## niri keybindings and app-nav

I got my keybindings which I call "row nav" set up pretty nicely. I hold a combo on my right hand then my left hand gets 3 rows of hjkl style vim directions:

- home row is "app nav" which means left/right is tabs and up/down is windows in the same app (or something that roughly matches this paradigm)
- bottom row is window manager nav so niri columns left/right and workspaces up/down
- top row is regular arrow keys which I mostly use for "up" in terminal to get the previous command and this layer has enter too so I can do things like switch between several terminal tabs and re-run the previous command in them all without lifting my right hand layer mod.

The app-nav part relies on querying niri to figure out which app is focused, then dispatching the correct simulated hotkey to do things like "previous tab" and "next tab" etc. This needed to be ported to wayland as described below.

## sending hotkeys from scripts: wtype

As an alternative to X11's `xdotool` I ported my stuff to `wtype`. So far so good.

## Clipboard history and scripting

I use the clipboard from scripts super heavily and it's critical to many of my automations. I did get `copyq` working sort of which is what I use on X11, but there were some issues with its window, so I bounced over to `cliphist` and `wofi` for the chooser. I was able to get my snippet system working fairly easily with these tools.

## fuzzy chooser: wofi

I've completely adopted a `dmenu`/`rofi` style fuzzy matching workflow to the level of "it's a complete lifestyle" so I installed and started integrating `wofi` right away. I can't believe fuzzy matching is not the default, but once you set the config file to fuzzy matching, it works great for my usage.

## wifi manager: iwgtk and iwd

On X11 I run `NetworkManager` and `nm-applet`. They are kind of clunky and I sort of hate them, but they work. There's a bunch of silly nonsense here I don't really want to bother with, but I ended up using `iwd` and `iwgtk`. I'm not sure why the ecosystem for this is so weird, but it is. It's like, in the default config it will let you pick a wifi network and join it, and then like just **not** run DHCP client to actually make it work. There's some linux mind virus that is like "whoa whoa whoa we can't assume folks want to use an Internet Protocol Address. What if they are on a commune with a local IPv6+lora configuration?". "What about if they are in a deep sea submarine???". It's ridiculous and completely stupid. So I went in to the config file like every single user must do and said "yes I connect to the wifi and internet the same way billions of people do across the world" and then it started working.

## notifications: dunst

My `dunst` setup just worked. It's compatible with both X11 and wayland I think. Literally nothing to do. I tried my `~/bin/notify` script and it worked first time. On to the next.

## screenshots: grim + slurp + satty

This one went overboard in the "do one thing, even if that thing is obviously an incomplete thing" so it seems the waylanders think 3 programs to take a screenshot is the correct design. Anyway I 100% just followed claude's advice on this one and ported my scripts from flameshot to this stack of `grim` for the actual screenshotting plus `slurp` I guess for selecting a region on the screen and `satty` for annotating the resulting image with text and arrows etc.

## bambu studio 3D printing slicer

So far one important app that is giving me trouble is the Bambu Studio program I use for 3D printing. It seems it does not support wayland directly and I have yet to figure out if there's some X11 compatibility wrapping I can do to trick it in to working.

## screen locking: swaylock

This is another linux mind virus of you need 7 programs to do something every operating system just does with no configuration. But anyway, detecting when user input goes idle, and actually locking the screen in response to that are apparently separate programs in wayland land. I didn't yet want to futz with idle detection so I got a `swaylock` 1-liner command integrated into my `~/bin/lock-screen` script and that's adequate.

It's kind of funny and kind of nice that out of the box, once you're logged in, it'll just leave you logged in and your computer open forever. Post pandemic it's like, no one is going to come into my house and try to figure out my extremely bizarre keyboard & computer setup and somehow like hack my gmail or something. Maybe I don't need to be typing my password dozens of times a day to mitigate that attack vector like the old days of working in crowded insecure offices.

## GUI prompts for input: yad

It seems `yad` mostly supports both X11 and wayland, so the scripts where I use it to pop up a text input seem to work fine.

## leader key focus

One thing that is a huge win for me is switching keyboard focus into wlr-which-key or gofi when I hit the leader key seems to be fast enough to not bother me, and not send accidental keystrokes to the current window. I never managed to solve this on awesomewm so this the killer feature for me.

## X11 nonsense with xwayland

Both Bambu Studio and Prusa Slicer seem to not support wayland so I have to do X11 compatibility sadness.

```sh
 Xwayland -geometry $(wlr-randr | grep preferred| awk '{print $1}') :1 &
 DISPLAY=:1 prusa-slicer
 ```

## Update 8 months later

I'm still on niri and I even switched my media server laptop to niri too. There are still shortcomings and mismatches with my ideal workflow, but overall it's excellent. My eww sidebar is great. I've been able to send slides to an external monitor for teaching classes without doing 20 minutes of research. There's nothing even slightly making me miss X11. All of my absurd keyboard customization nonsense is handled by `keyd` which is amazing and works at the correct system level.
