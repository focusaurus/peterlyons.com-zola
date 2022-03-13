+++
title = "Squeezebox Tweaks and Plans"
slug = "2022/03/squeezebox-tweaks-and-plans/"
date = 2022-03-12T13:23:06Z
+++

Typing on the Squeezebox keyboard is coming along nicely. No real issues with it as my daily driver at the moment. I'm still tweaking my keymap but only in incremental ways.

## Keymap tweaks

### Reduce keys from 42 to 36

My main goal right now is to shrink from 42 keys to 36 by eliminating the outer most pinky columns. The reach there requires taking most fingers away from the home corner and is really disruptive. Luckily, earlier versions of the squeezebox didn't even have this column and there's not too many important keys in the keymap there anyway so I was able to find good alternatives to everything. As of now none of the layers in my keymap have anything in the outermost column that isn't also available somewhere else, and I'm practicing to learn the alternative ones and leave the outermost column behind entirely.

### Home row mods on number layer

I've never really embraced home row mods since they interfere with combos and I can't get them to play nicely with dvorak rolls (particularly "ch" when I had h as a mod-tap was giving me mods instead of taps most of the time). However, I recently realized there's no such issue when on my numbers layer, and so I can do home row mods there on the right hand while the left hand has arrow keys and thus have better access to ctrl+arrows to move by words in non-vim text editors. I'll probably start using this a lot now that I have a workable way to hold the modifiers.

### Symbols layer

My symbols layer has evolved nicely to fit in my new 36 key layout so no issues there either. The most interesting thing is I finally found how to make QMK swap colon and semicolon so colon is the regular key and semi is shifted.

## Future Plans

### Switch to ZMK

Watching Ben Vallack's youtube videos plus a few reddit comments here and there have made me interested in porting my firmware from QMK to ZMK and see if some of the more advanced features work better there. I'd also really love to get off the QMK git fork workflow and stop editing C source code files for my keymap.

Due to the "bunch of daisy chained macro pads" design of squeezebox, I can start with a single 3-key column and see how it goes.

### Bring innermost column closer

I've recently discovered the [Absolem](https://zealot.hu/absolem/) project and the associated discord. Folks in there have experimented with slicing off the part of Kailh Choc switches that house LEDs normally to get ultra-tight spacing. I'd like to try that to get the index finger X-axis travel shorter when reaching inward to its neighbor column.

### Make slot plate into a PCB

I'm pretty excited to design a PCB for this which could also serve as the slot plate that is the foundation of the structure and adjustability. It doesn't **have** to be that way and a regular PCB could be attached to a 3D-printed slot plate, but it seems like a nice duality to pursue. I don't know kicad or any PCB software though, but I'm much better connected to communities that can guide me through that. Finding sufficient free time to do it remains a separate concern, however.

Another tweak is instead of bolting onto the bottom box, the slot plate should slide into grooves along the bottom box. The bolts are too tedious to undo if you want to adjust the position of stuff.

A PCB would let me only have wires running from the underside of each column to a connector (probably a JST SH connector) on the PCB directly below it and all of the interconnections would be on the circuit board itself so that solves the wiring mess. I'm not exactly sure how I would want the USB-C and RJ-9 connectors to work. Would they be mounted onto the PCB and poked through the wall of the bottom box or would they just be mounted in the wall of the bottom box and then have wires to the PCB?
