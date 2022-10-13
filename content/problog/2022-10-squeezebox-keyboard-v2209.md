+++
title = "Squeezebox Keyboard v2209"
slug = "2022/10/squeezebox-keyboard-v2209/"
date = 2022-10-13T13:33:05Z
+++

I have completed a new revision of the Squeezebox Keyboard with revision name v2209.

## Some quick project history checkpoints

* April 2021: First fully functional squeezebox prototype, v2104 is built
  * Slos for column stagger adjustment are on the keywells
  * Keywells mounted onto sawtooth wall for tailor fit height
  * No splay
  * Used flat (no tenting)
  * 45 keys: 3x5 finger matrix plus a 6-key (!) thumb cluster
  * Printed on green PLA
* June 2021: v2105 is done
  * Mounted on tenting stands
  * Slots for column stagger adjustment remain on the keywells
  * Splay supported with steel base plate and magnets in the keywell posts
  * Component based design where each keywell can be tested individually as a working keyboard
  * Hot swap sockets incorporated
* December 2021: v2112 is done
  * Slots for column stagger moved to the base plate
  * Splay adjustment handled by grid of slots on the base plate
  * Tried some different connectors for wiring across the columns
  * Printed in red and black PLA and looks pretty snazzy (still spaghetti wires visible though)
* February 2022: Squeezebox v2112 becomes my daily driver, replacing the TBK Mini
* April 2022: Built narrow index keywells with chopped choc switches
* September 2022: Hit personal record 85 WPM with 99% accuracy on v2112

## Driving Factors beyond previous version

The previous build, v2112, has been my daily driver since Feb 2022. The build is holding up fine mechanically. It feels very comfortable and my typing speed and accuracy are in the general vicinity of my personal record on any keyboard ever. It's not very consistent, but I can regularly hit 85 WPM with good accuracy on a 1-minute monkeytype test including uppercase and punctuation.

### No inner reach column for index fingers

I'm noticing that reaching inward for the index inner neighbor column I tend to move the whole hand a bit not just the finger and it throws my home position off. So I wanted to try a layout without any sideways reaching and giving more work to index and middle fingers and continuing to reduce work on the pinky. Thus I wanted to build a 1x4 keywell with chopped choc switches to try to get 4 switches crammed into a radius that can still easily be reached without moving the hand forward.

### Chopped Choc for very tight spacing

Now that I had experience successfully slicing about 1/3 of the material off of a Kailh Choc switch (the bits dealing with LEDs), I wanted to incorporate that into the main keywell so I could fit 4 keys under a finger and have them be easy to reach.

### No pinky top column

I noticed a similar issue when I had to reach for the top switch on my pinky column, so I wanted to reduce the pinky to just the "home corner" 2 switches.I felt OK leaving 3 switches for the ring finger and by coincidence that just happens to be 13 switches per hand so 26 for all the fingers which is the length of the English alphabet and I dig that.

### Choc Minis for shorter actuation travel

I still am searching for the shortest available actuation travel. The discord community is pretty convinced that actual laptop switches are very difficult to solder into DIY projects, which is a bummer. So the only switch I have identified which I can actually buy with less travel than the current Kailh Choc v2 is the [Kailh Choc Mini PG1232](https://www.aliexpress.us/item/2255800091079572.html?spm=a2g0o.order_list.0.0.30ad1802bxxiW4&gatewayAdapt=glo2usa&_randl_shipto=US). This switches has just a tiny bit less actuation travel, so I bought a bunch of linear blacks.

### Printed Circuit Board

To help reduce the handwiring spaghetti situation, I wanted to try to make an actual circuit board. If the main switch matrix circuitry could go there, and the diodes could live there instead of by the switches on the keywells, that would tidy things up a lot. I would just need a max of 5 wires coming out of each keywell and going only to the PCB. In v2112 the keywells have to daisy chain to their neighbors so there's a cable for incoming and another one for outgoing which is a fiddly mess.

I didn't know anything about PCB design or KiCAD. As I sat down to learn and started discussing my plans on the Absolem Club discord, Petr Viktori ([encukou on github](https://github.com/encukou)) saw that a small form factor PCB could be useful for many keyboard builds that were too heavily 3D to put the switches directly onto the PCB, and created an absolutely brilliant and compact PCB design he calls the [matrixbar](https://github.com/encukou/selfish/tree/c975633adc153e1b267ada8de5742252208aacc2/pcb/matrixbar). Aside: it was originally called the squeezebar which I preferred for obvious reasons.

With just a few exchanges on discord, we found a layout that would fit comfortably in the Squeezebox case and account for clearances we need for the adjustment bolts, cables connecting to the PCB, etc. Petr was also able to make it such that each keywell could connect to single row of pin headers meaning the cables would be so tidy and a standard DuPont jumper wire housing would easily fit through the slot to get to the interior of the case.

This was such an exciting and fun development! It saved me months of learning and skill building. And from there I got another unexpected and very pleasant gift from other enthusiasts on the Internet...


### PCB Fabrication with PCBWay

[PCBWay](https://www.pcbway.com/) reached out to me to offer to fabricate a PCB for the squeezebox at no cost. So I took the files that Petr created and uploaded them to PCBWay's online shopping tool. In a few minutes, I had submitted an order for 10 PCBs (enough for 5 split keyboards). Ten days later, the PCBs had been fabricated and shipped across the world to me. It was so exciting to have something with an air of legitimacy giving the project a lot of polish instead of just an embarrassing pile of wires.

Thanks PCBWay and Petr Viktori! The boards look great, fit in the case perfectly, and work great.

### New Tenting Mount

Using v2112, I got tired of the camera z-stands wanting to slide around on the desk, so I built a wooden stand for them. I carried this idea forward but I wanted to 3D print more of it and just have a single flat board be the bulky wood part. So I designed some 80% tenting mounts and assembly such that they can screw onto the stand and the Squeezebox bottom case can bolt onto them with 1/4-20 bolts. I also printed some bolt hex handles so the bolts can be tightened by hand without a wrench.

### New Case Approach

The PCB enabled me to put all the electronics into the top case, which I call the "slot box" part. That now nests into the bottom case and some magnets snap it into position. The nice thing about this is all the electronics are housed in that single unit and I can remove it from the stand to adjust either the ergonomic fit or the wiring and it's a unit without any wires that need to be disconnected.

The main driver for this was v2112 had a box w/ lid design where the lid bolts to the box with 4 m3 bolts. This is somewhat tedious to remove all the bolts to make an adjustment, so I wanted something easier. The new design is way easier: I can just grab it and remove it without undoing any fasteners, but it is noticeably jankier where the bolts were rock solid. I'm not convinced this is an improvement overall and probably need another iteration to find something that really delivers here.

## What about keymaps?

So I'm down to 26 total keys on the fingers and the fingers don't all have the same number of keys, so sticking with dvorak doesn't really apply. In fact, most of the existing layouts can't really be morphed to apply to this hardware. So I went shopping for keymaps briefly. I did not do a huge research effort, so there could be a lot more to explore here, but quickly skimming through some discord conversations and online summaries of keymap evolution, I discovered a fairly new layout called [engram](https://engram.dev) which appealed to me for 2 main reasons:

* The inner reach columns for the index fingers all had punctuation not letters
  * This meant I could use the alpha layout without heavily compromising it
  * I could stick all symbols on a layer anyway
* It had the same basic idea of vowels on left hand home row and important consonants on right hand home row which is how dvorak is and I like that.
* It didn't move any alphas to the thumb which I don't quite feel ready for so I could probably learn engram on my thinkpad built in keyboard and use that while traveling and keep my window manager keybinds consistent

After some discussion in discord, I was encouraged to swap q and z out to combos to make space to fit period and comma on the base layout, so my layout is now basically take engram, swap a few silly letters around to account for my hardware weirdness, and add period and commma.

![Engram layout for Squeezebox v2209](/problog/images/2022/squeezebox-v2209-engram.png)
