+++
title = "Exploring Editors"
slug = "2021/08/exploring-editors/"
date = 2021-08-30T23:36:08Z
+++

Content warning: programmer discussing text editors.

I have been down a path spurred primarily by 2 events:

* Development of the Atom editor becoming uncertain after microsoft acquired github and thinking it likely there was no room for both VS Code and Atom, and thus Atom would be sunset
* My rage quitting of workflowy after staring at the damn loading spinner and general disgust/contempt for the web as a platform that takes a todo list app in which my lifetime full data set could fit in memory 100 times over and makes me wait 20 seconds to see the grocery list I was looking at just a moment ago.

So I sampled some workflowy alternatives including roam research, nvalt, a vim org-mode plugin, emacs org mode, and spacemacs org mode.

I eventually concluded [emacs org mode](https://orgmode.org/) was a suitable replacement for workflowy and fully converted my entire data set. I learned just enough spacemacs/emacs to use org mode with moderate efficiency, but it became clear to me that my go-to editor would still be neovim. I did use a vim org-mode plugin for a few weeks, but its feature set was incredibly paltry and there was no active development, so I went for the real thing.

My distate for emacs stems I think primarily from:

* terrible chorded keyboard shortcut sequences which the community just cannot stop doubling down on every decade
* Arcane docs and terminology which again the community cannot just admit that for every keyboard with a meta key ever built, there have been like 20,000 keyboards built without a key labeled "meta" and update their stupid confusing nonsense docs.
* Slow startup time which reflects performance as not important and the "emacs is a place you live" approach which does not really provide a good path to gradual adoption.

So I doubled down a bit on neovim. I did find [spacemacs](https://www.spacemacs.org/) overall a breath of fresh air and am now also test driving [spacevim](https://spacevim.org/), but it's docs are also a bit of a struggle for me to use.

In my editor experimentation I was aware of [kakoune](https://kakoune.org/) and thought about taking it for a spin but...

* I am very skeptical of viability of a C++ codebase these days as not being an unstable insecure nightmare
* There seems to be fairly good user community interest but the ratio of user requests to maintainer/implementer activity seems way skewed.

That led me to my signature line of "found a new version in rust" in [helix](https://helix-editor.com/). It seems very nascent still but I'm curious to play around with the multicursor model and am very encourage by on-screen keybinding menus. God bless modern TUI apps that put the stupid keybinds on the damn screen, and hats off to old school ones like the PINE email client and nano text editor that have had on-screen keybinding menus since the beginning.

So I think I'll keep an eye on helix development and occasionally fire it up to check on progress. I'll try spacevim a little but if I can't grok how to properly customize it for thinks like a plugin to manage quotes/parens, I'll likely abandon it for basic neovim.
