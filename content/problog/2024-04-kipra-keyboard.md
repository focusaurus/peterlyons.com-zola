+++
title = "Kipra Keyboard"
slug = "2024/04/kipra-keyboard/"
date = 2024-04-28T13:00:10Z
+++

I've built a new split ergonomic mechanical keyboard called the "kipra". My daily driver for most of the past year has been a sofle choc, which is overall quite good and adequate for my current needs. However, I wanted to make something even more tailored to my specific preferences in terms of features and hand shape. The sofle was kind of bought on a whim when the vendor had a business closing sale so it had a bunch of stuff I wouldn't choose starting from scratch.

## Requirements

After going pretty far toward the end of the distribution for [custom scooped and tented split keyboards](https://peterlyons.com/problog/2021/06/squeezebox-keyboard-v2105/), I was in the mood for something much more portable, durable, replaceable, and generally pragmatic. Tenting is a real pain for this, and I have been using my sofle flat for a year with no RSI pain, so I felt confident I could abandon tenting at least for now and hope I stay pain-free.

I also wanted the thumb arc way lower and further inward than almost any other keyboard I have seen. I find tucking my thumb under my palm quite uncomfortable and I don't understand why so many designs put thumb keys under the palm. So I wanted my innermost thumb key just at the edge of my palm and an arc away from there. I also like to thwack my thumb keys with my thumb knuckle, not the tip, so positioned the thumb arc accordingly.

I wanted dedicated modifier keys. I have tried home row mods and all the tweaking to try to make them work and I don't like them. I type dvorak which has tons of rolls on the home row and that makes home row mods even trickier. So 4 dedicated modifier keys per hand. I also wanted to try putting the modifier row at the bottom vs my sofle layout which has them on the top row. Mods on the top row requires shifting my whole arm and losing home row, but I can  curl my fingers enough to reach the bottom row without a full reposition so I think it will be better, but time will tell.

I don't want a pinky reach column as it's an RSI risk, so I eliminated that column entirely in comparison to my sofle.

I didn't want anything fancy or fragile. Just the basics. No rotary encoders, no LEDs, no screens, no pointing devices, etc. Just a basic keyboard I could rely on and toss in a bag without snapping any parts off.

Thus I introduce to you **The Kipra Keyboard: It's kinda [pragmatic.**](pragmatic.**.md)

So in summary:

- split with column stagger tailored to my finger lengths
- choc switches with minimal vertical spacing and just a bit of horizontal spacing
- main finger grid is 5 rows by 3 columns
- below that are 4 dedicated modifier keys
- 3-key thumb arc

## Designing with Ergogen

I used [ergogen](https://ergogen.cache.works/) for this build. It's really fun to be able to layout the switches with some pretty simple yaml, then 3D print a mock-up that switches can be fit into and test out how it feels to type. Altogether I think I printed and did fit/layout testing across at least 6 iterations. The process consists of:

- Set up ergogen yaml for a rectangle for each switch footprint
- Add the overall outline of the edge of the PCB
- Export those from ergogen as a dxf file
- Load that into FreeCAD, process it into a wire then a sketch
- Extrude the sketch up about 6mm so the switch posts clear the desk surface
- Print it out and pop some switches in to test

## My first printed circuit board

I've built a few keyboard kits with their own PCBs, and done hand wired builds with no PCBs, but never had a custom PCB fabricated before. Luckily ergogen makes this overall pretty straightforward. You add the additional components, which for the kipra was just:

- a reversible MCU footprint for my pro-micro compatible MCU
- a TRRS jack
- a reset button footprint which I didn't end up needing because the one built into my MCU works great
- mounting holes for support posts

Ergogen sets up the electronics properly so your keyboard matrix is well-defined and the manual work you need to do in KiCAD to route the tracks is nearly foolproof because the Design Rules Checker will tell you if you forget anything, and KiCAD won't even let you wire something to the wrong place.

There's a tricky hand-off in the process where you've done all you can in ergogen and generated a KiCAD file which you then start to modify. If you discover any changes you want that require you to go back into ergogen, you'll need to re-do all the KiCAD work. So I put off routing traces for a while as I gradually ran out of tweaks to make in ergogen and started to get bored and keen to get on with the KiCAD bit.

It took a while for me to learn KiCAD and get the track routing done. I didn't know about "nudge mode" in the track tool until I paired with someone from Recurse Center who told me about it and then things were a lot easier.

I was super nervous about having a mistake in the KiCAD manual work that would render the PCBs unusable, so it took me a long time and lots of re-dos to practice and get slightly more confident that everything would work. The reversible PCBs can be mind-benders when things get tricky. I also used a fancy reversible MCU footprint which was important since I wanted both of my MCUs mounted face up so the buttons were accessible. Many footprints require one or both of the MCUs to be mounted face down to get the pinout to align properly on both halves.

I got a lot of help and checking, but eventually the Design Rules Checker in KiCAD had no errors and it was time to generate some gerber files and upload them to PCBWay for fabrication.

## Fabrication with PCBWay

My friends at PCBWay offered to support this project so big thanks to them! I uploaded my gerber zip file, followed their documentation about using settings that would work properly, chose blue for my PCB color and white text set in Hack Nerd Font. Then I fired off an order for 10 reversible PCBs which can make 5 split keyboards. In short order I had a package on my doorstep with a bundle of beautiful circuit boards!

## Soldering and the cycle

Soldering the diodes, hot swap, and TRRS were familiar to me so I was pretty confident all that would work out correctly. But for this reversible MCU I needed to solder across pairs of jumper pads on the correct side, and due to wanting both MCUs facing up, I ended up having to do exactly the opposite of what the instructions on the PCB  silkscreen said. So this contributed to many rounds of what I call the "oh fuck...whew cycle". This starts with me soldering something and then either thinking or being told on discord that I just fucked it up. Typically this kind of thing is all or nothing. You get all the MCU pins wired correctly and you have a keyboard, or you make one mistake and you have a drink coaster. But each time within a few minutes and with posting KiCAD files or screenshots or photos, eventually we hit the "whew" phase of the cycle where we figure out actually it's fine and correct. Keep in mind this is a custom one-off project. It's not a kit that dozens (dozens of us!) have built before. So asking for help requires friendly folks on discord to go the extra mile to learn your custom design and provide guidance.

I went through a few rounds of "of fuck...whew" on the PCB jumpers, a few rounds on the MCU mounting, a few rounds on the MCU pinout, a round about whether I had been referencing the wrong pinout for the entire project (I had), and a few rounds on the TRRS QMK firmware stuff. Exciting times!

Mounting the MCU revealed that my MCU had one extra through hole per side compared to the footprint on my PCB. So I had to figure out if the extra empty hole was supposed to be the one closest to the USB connector or the one furthest away. I studied the pinout a bunch and tried to reason that reset should map to reset, etc, but it's tricky because my MCU footprint is reversible and has jumpers so everything is like "this is reset, unless you soldered one of these jumper pads, in which case it is no longer reset, but exactly how all that cleverness works out is really hard to reason about". This was extra fun because the microscopic hole labels on the MCU are mostly between the through holes and it's not clear if the label applies to the hole above or below, and even studying the ends of the row don't really clear it up. But in the end I was pretty sure I needed my rows and columns starting on the holes farthest from USB, so I mounted it that way, and it ended up being correct.

I also chose to **NOT** socket my MCU, flouting all the advice online. I've socketed a lot of MCUs and it's extra fiddly work and hard to prevent the headers from bending. These days MCUs and PCBs are cheap, so I'm comfortable just using regular pin headers and not futzing with socketing.

**BUT** in the end it all worked out. No mistakes. No parts wasted. The first 2 kits I have built are fully working.

**Whew!**

## RP2040 MCUs are great

For this project I had ordered some MCUs from aliexpress that were on sale for something under $4 each I think. These are pretty great.

- RP2040 chips which are great
- pro-micro compatible footprint which makes them usable in many existing kits/projects
- have an on-board reset/bootloader button which makes flashing super easy

I have to say my early forays into QMK in 2019 were traumatic in how much a fiddly pain everything about flashing was. I bought a bunch of terrible cheap promicros with micro USB connectors that were a complete nightmare to get to show up on the USB bus and to boot into the bootloader and to successfully flash without bricking them. I tried linux, windows, and mac and went on many extended docs/forum reading sprees. It was a nightmare of rapidly shorting pins with tweezers, no error messages, etc.

Even the stemcell MCUs I bought recently for the sofles were a giant confusing pain.

In contrast, these RP2040s are amazing. Hold the bootloader button while plugging in USB then release it. They show up immediately in your OS as a mounted thumb drive. To flash them you copy a `.uf2` file to the root directory and that's it. They are fantastic.

## The struggle to TRRS split

I got both halves of the keyboard working when directly plugged into the computer via USB fine basically on the first try with no errors. But I couldn't get the TRRS connection to work so the secondary half would type. I spent a day reading QMK's extremely-confusing docs about serial, i2c, uart, usart, pio and flailing around until clutch help on discord arrived to guide me through the exact right settings for `config.h`, `rules.mk`, etc. There were dozens of rounds of recompiling and reflashing both halves then carefully recabling and seeing yet again the right side did nothing. TRRS comes with the risk of short circuits so care must be taken to always disconnect USB before working with the TRRS cable.

I got some clutch help on discord from someone who actually understands what the RP2040 has built in and that most of the QMK docs are for older, less capable chips, and most of what I needed was default. Oh and ALSO there was a super confusing MCU pinout off by one error. Sadly, the way this build works out, my MCUs have 1 more through hole per side than the footprint on the PCB has. So that means that I need to snip a pin header off my pin header strip AND be sure that I mount the MCU with the correct hole empty and disconnected from the PCB. I actually didn't get any confirmation from discord on this. I studied the pinout (spoiler alert, I later learned that I was studying a slightly incorrect pinout because my assumption that the product detail page on aliexpress is for one exact product, the same page in fact sells several different MCUs with different pinouts).

## Vial configuration GUI for real-time remapping

While waiting for PCB fabrication, I got a head start on configuring QMK firmware and flashing my RP2040 MCUs. My goal was to have this board supported in [Vial](https://get.vial.today) which is a nice GUI that allows real-time changes to your keymap without reflashing. As per the Vial docs, I started by making sure I had a stock QMK firware compiling, flashing, and working as a keyboard. I confirmed this by just shorting a row hole to a column hole with a jumper wire and seeing a letter get typed. Then I ported my keyboard into Vial. This is fairly straightforward using the online keyboard layout editor GUI to specify your switch positions and mapping the matrix is mostly trial and error that's clear enough when you have things reversed by mistake.

So now I can change my keymap on the fly using the Vial WYSIWYG GUI which is great.

## 3D modeling the case in janky mode

As I understand it presently, ergogen doesn't provide that much to help with creating a case. I got it to spit out the basic outline of my PCB shape, but the rest of the process from the flatfootfox tutorial seemed daunting given the amount of geometry in my design. I also didn't have experience in FreeCAD with the Draft and Part workbenches which seemed to be essential to this workflow. But with a bunch of research and experimentation, I hacked something together roughly as below. I'm not sure I can even do this again because I tried so many sequences of workbenches and tools. But logically, the flow goes:

- start with the PCB outline from ergogen, imported into FreeCAD Draft workbench as a `.dxf` file
- Create a 2D offset from that allowing roughly 0.2mm (a bit more might be better) for clearance so the PCB fits inside
- Then do another 2D offset at 2.4mm for wall thickness (4 perimeters with my 0.6mm nozzle installed)
    - Set this one be fill the offset so you get a face
- Extrude that up 12mm. We now have a wall our PCB will fit beautifully into, but no floor
- Upgrade the first offset (where the floor should meet the interior wall) to a face and extrude it up 2mm
- We now have walls and a floor
- Use some standard geometry cubes and boolean difference to make cutouts for the USB and TRRS cables
    - I did this very crudely so far
- Ideally I would make 4 12mm by 2mm cylindrical cutouts in the bottom for rubber bumpers at this point, but
  I was mostly winging this and so excited when I got something working that I ended up doing those in Prusa Slicer instead.
- Combine those shapes into a mesh and export to an STL you can print

The case is essentially exactly what I hoped for but it's a bit janky because I'm just eyeballing the MCU and TRRS positions since I have no reference geometry from ergogen available in this toolchain.

I would also ideally model the support posts exactly underneath the mounting holes in the PCB. These will get m2 threaded inserts. But I don't have a good process for this from ergogen, so I have decided to model individual posts, print them individually as distinct objects, screw them to the PCB, then just glue them to the floor of the case. I've tried to 3D model these without exact positioning information before and there's no fudging it. If you're off by a fraction of a millimeter, the bolt won't thread into the insert.

## Hoping for firmware bliss

My sofle has some nuisances that I suspect are either firmware or MCU issues. The one-shot shift key has a bug that makes it a 2-shot if you roll 2 letters quickly, which I do constantly starting sentences with "The" and it's a nuisance. Also the right half goes comatose somewhat regularly and needs a reset. Also my one-shot layer key stops working for 2 specific keys after a while which is bizarre. Actually debugging those I think would be pretty tricky, so I'm hopefully these new kipras don't have those issues. So far the evidence is that they are all good.

## Build guide

When I built the second keeb, I took photos throughout the process so I could create a detailed build guide. This is probably mostly going to be for me to reference, but if anyone else ends up ordering some PCBs, this will help them get it soldered up correctly.

- Some custom text added in KiCAD
    - 
    - It's silly, but I am solidly at the place where having a PCB with silkscreen text I added in my hands still feels special and awesome.

## Thanks to my internet heros

- ceoloide who designed the reversible MCU footprint and provided tons of detailed specific help to me to get this build designed and working
- causuanoob who diagnosed the QMK split keyboard firmware issues and helped get my RP2040 settings correct so the right half started working
- flatfootfox who wrote this amazing in-depth ergogen guide which I studied constantly throughout this project
- hand_le for expert guidance and troubleshooting help
- mrzealot who is the lead on ergogen and moderates the Absolem Club discord
- outline
    - flatfootfox tutorial
    - getting help from RC
    - "oh fuck/whew" cycle
    - ceoloide MCU footprint
    - photos
