+++
title = "Tips for Switching from Linux to Mac"
slug = "2024/07/tips-for-switching-from-linux-to-mac/"
date = 2024-07-20T13:51:11Z
+++

I've run the full matrix of combinations of linux and macos between my work and personal setups. At this point I'm pretty comfortable switching. Linux will always have my heart but periodically I get fed up and just want a laptop that goes to sleep when you close the lid. I've recently seen some posts and since I did my most recent round of switching from an all-linux setup to linux-at-home + mac-at-work, I wanted to share a short list of key apps. These are mostly from my personal toolbelt with a few picked from some online discussions I saw recently.

- terminal
  - I run [kitty](https://sw.kovidgoyal.net/kitty/) and really enjoy having the exact same terminal across OSes
  - The Terminal.app that ships with macos is also a fine choice.
  - Things are in very good state at the moment with numerous high-quality choices avalible including alacritty, wezterm, etc
- zsh
  - Just note that for license reasons the default shell on macos is zsh, which is good
- [homebrew](https://brew.sh) is the most common package manager, although I think there are alternatives for the brave
  - Also [mas](https://github.com/mas-cli/mas) is a CLI to help with the Mac App Store
- clipboard manager
  - I use [flycut](https://apps.apple.com/us/app/flycut-clipboard-manager/id442160987?mt=12)
- keyboard remapping
  - macos built-in keyboard settings can handle basic layout swapping as well as the common key remaps like caps lock is control
  - for advanced tricks, [Karabiner Elements](https://karabiner-elements.pqrs.org/) is great
  - [cliclick](https://formulae.brew.sh/formula/cliclick#default) is a handy tool for scripting simulated keyboard events (similar to xdotool for linux)
- mouse and touchpad tricks
  - I use [BetterTouchTool](https://folivora.ai/) mostly to get "natural scrolling" on the touchpad while keeping a physical mouse wheel working correctly. It has some other good knobs and dials too, and I think even a clipboard manager, but I don't use most of its features anymore.
  - [Scroll Reverser](https://pilotmoon.com/scrollreverser/) can fix this too
- screenshots
  - [flameshot](https://flameshot.org/) works on macos and linux and is great
- If you use dmenu or rofi on linux, you might want [choose](https://github.com/chipsenkbeil/choose) ("choose-gui" is the homebrew package name)
- Many command line and terminal tools you may use on linux are cross-platform and available on macos as well
  - bat
  - direnv
  - eza
  - fd
  - fzf
  - gitui
  - htop
  - jless
  - jq
  - lazygit
  - lf
  - neovim
  - pandoc
  - prettier
  - ripgrep
  - sd
  - shellcheck
  - shfmt 
  - starship
  - tokei
  - etc
 
# Window Management

Since I run [awesomewm](https://awesomewm.org/) on linux, which is configured with lua code, I run [Hammerspoon](http://www.hammerspoon.org/) on mac. It's the same philosophy and approach - use real code to get highly precise customization. The hammerspoon API is way way nicer than awesomewm though. When I joined Mailchimp in 2020 and had to use mac for work, I ended up doing a nearly feature-for-feature port of my awesomewm config to Hammerspoon and surprisingly my basic approach has been so stable that I have been maintaining both of them in parallel for about 4 years now. I know how I want my desktop environment to work and they both can acheive it.

If you just want basic window arrangements there are many good tools available including the ones below. I don't personally use these since Hammerspoon handles window management for me, but I know many folks like these:

- [rectangle](https://rectangleapp.com/)
- [Alt-Tab](https://alt-tab-macos.netlify.app/)
- [yabai](https://github.com/koekeishiya/yabai) if you prefer tiling window managers a la i3
  - pairs well with [skhd](https://github.com/koekeishiya/skhd)

# Launchers & Omnibar Thingies

[Raycast](https://www.raycast.com/) and [Alfred](https://www.alfredapp.com/) are popular. I have a home-grown thing based on scripts and choose-gui which works identically for me on linux and mac so I haven't looked at this category much.

# GOAT Meeting Reminder App: MeetingBar

Get [MeetingBar](https://meetingbar.app/). It's amazing. Perfect in every way and solves a longstanding problem for me. I barely need to look at my calendar anymore.

# Closing

The differences between linux and mac for developers are as minimal now as they have ever been. We spend so much time in browsers and other cross-platform developer tools that it's pretty straightforward to have high similarity. It may take a fair amount of tweaking and futzing, but you should be able to get something that feels comfortable.
