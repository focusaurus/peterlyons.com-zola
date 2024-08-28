+++
title = "Kipra Keyboard v2 Build Video"
slug = "2024/08/kipra-keyboard-v2-build-video/"
date = 2024-08-25T16:38:55Z
+++

I made another version of the kipra "kinda pragmatic" split ergonomic keyboard. It's a minor incremental evolution of the first version. Key changes are:

- thumb arc moved forward and outward quite a bit
  - the extreme placement of v1 turned out to be not as great ergonomically as I predicted
- don't bother with hot swap sockets for the switches
  - I'm ride or die for the moment on Kailh Choc Ambient Nocturnal 20g silent linear switches
  - I doubt there will be any switch available that I will prefer in the next few years
  - direct soldering is more reliable and fewer components
- simplify the perimeter geometry of the PCB
  - more pragmatic generally for fitting into cases, boxes, shelves
- leave a blank area along the PCB perimiter for a bottom plate
  - also makes routing traces easier
- reduced pinky stagger
  - standardized stagger unit of 1/4 of key size
- no mounting holes
  - I ended up not needing them
  - my new caseless approach is working great for low profile use

## Even MOAR PCBs from PCBWay

Once again the great [PCBWay](https://www.pcbway.com/) was supportive enough to comp me these PCBs. I recommend them for your next ergogen keeb or any custom PCB project. I switched it up this time for the white color with black silkscreen and went on-theme for me travel case with matte black & white PLA filament as well as printing some tilted keycaps in matte black polytera PLA.

## Full Build Video

I filmed a full build of my 3rd assembled kipra v2. Mostly this will be for my own reference if I do another iteration, but it's there if anyone wants to watch.

{{ youtube(id="4qQcrFWpdw8") }}

## Key Point: Solder Microcontroller First and Test Frequently

The main idea I'd like to see adopted into the keeb zeitgeist is:

1. Test the keyboard works frequently during the build
2. As a corollary of that, **the standard advice of doing diodes first is bad for beginners**.

It's very easy to solder diodes, hotswap sockets, rotary encoders, interconnect jacks, etc and only as the last step of the build plug in the keyboard to find it does not type. It doesn't show up as a USB device to the OS.

This is super disappointing and just no fun. I don't want folks to have to feel that feeling and then experience the chaotic troubleshooting it necessitates.

But it's straightforward to avoid this by changing around the order of operations to focus on testability throughout the build.

## Recommended Order of Operations for Building a Keyboard

The build video above demonstrates this as well as showing several mid-build tests that failed and how I was able to focus my troubleshooting exclusively on the previous step and quickly correct problems.

- flash firmware on the MCUs first
  - confirm they work as keyboards
- solder pin headers to MCU (left)
  - confirm again it still works as a keyboard
- solder jumper pads on the PCB (left bottom side)
  - test with multimeter that jumpers are properly soldered
- solder the MCU onto the PCB (left side, MCU on top side, solder on bottom side)
  - (optional) could test again here it still works as a keyboard
- solder first diode closest in the matrix to the MCU (left bottom side)
- solder first switch (switch on left top, solder on bottom)
  - confirm it still works as a keyboard and that 1 switch types
- now proceed with remaining diodes (left)
  - confirm each row with a multimeter and visually confirming all diodes are oriented correctly
- solder remaining switches (left)
  - confirm every key types correctly using a keystroke debugger like `xev` or `Karabiner-Events-Viewer`
- solder the TRRS (mount to left top, solder on left bottom)
- solder pin headers to MCU (right)
  - confirm again it still works as a keyboard
- solder jumper pads on the PCB (right bottom side)
  - test with multimeter that jumpers are properly soldered
- solder the MCU onto the PCB (right side, MCU on top side, solder on bottom side)
  - (optional) could test again here it still works as a keyboard
- solder first diode closest in the matrix to the MCU (right bottom side)
  - careful that the diode orientation will be the opposite direction now
- solder first switch (switch on right top, solder on bottom)
  - confirm it still works as a keyboard and that 1 switch types
- now proceed with remaining diodes (right)
  - confirm each row with a multimeter and visually confirming all diodes are oriented correctly
- solder remaining switches (right)
  - confirm every key types correctly using a keystroke debugger like `xev` or `Karabiner-Events-Viewer`
- solder the TRRS (mount to right top, solder on right bottom)
