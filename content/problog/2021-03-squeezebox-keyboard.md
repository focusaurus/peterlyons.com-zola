+++
title = "Squeezebox Keyboard"
slug = "2021/03/squeezebox-keyboard/"
date = 2021-03-31T01:32:05Z
+++

I designed and built a split ergonomic keyboard with some ideas I've been wanting to try for a few years. Here are the main features of the keyboard:

* Split design, obvs
* linear columns
* customizable tailor fit column offsets
* tailor fit per-finger vertical offsets
* thumb cluster with 6 keys

## The Home Corner

I think the main design element that sets this apart for other similar keebs is the shape of the middle and bottom rows. They are arranged in a steep 100-degree corner and the home position for the finger rests simultaneously with the point of the finger resting on the middle row and the pad of the finger resting on the bottom row. You can type the middle row while maintaining contact with the bottom row, and vice versa. So there's 2 separate keys that can be typed without any reaching. Additionally, because the switches are in such a tight corner, it's possible to press both of them with a single finger by poking into the corner. Both keys press and release in perfect unison. So each finger has 3 separate characters it can type without any reaching when you add a QMK combo into the keymap. There is an upper row which is positioned and angled for very small reach so when you add that it's 4 keys per finger. The upper row is so tightly spaced that if you reach for it, you'll overshoot it. You don't need to reach. Just "think up" slightly and you hit it.

So we have a 3x5 grid for the fingers plus 6 thumb keys so it's 21 keys per hand for a total of 42 (nice!). The thumb cluster has pairs of keys in a "lounge chair" arrangement with one flat and one reclined at an angle making it easy to hit them separately or to chord them. One column is the home position for the thumb and then there's one you move your thumb inward to hit and another you move outward for.

## Naked Switches

No keycaps! Choc switches have a perfectly fine flat top stem. The tight geometry I wanted requires an extremely small gap between the middle and bottom row switches and keycaps would get in the way. When you look at it from the side you'll notice the bottom row stem actually overlaps just above the middle row stem slightly. Keycaps could technically go on the top row and most of the thumb cluster I think but they don't really add much and I think it's kind of a cool flex to not have them I think. It's like the fixie bike of the keeb world.

## Starting Vertical

My initial plan was this was to be a fully vertical keyboard used in joystick orientation. After a lot of prototyping I decided to back off that requirement which added a lot of challenges and go for typical horizontal layout flat on the desk with optional tenting.

So the name "squeezebox" was originally because of the hand orientation and tight grid of buttons made it a lot like an accordion or concertina. Squeezebox is an informal name for an instrument like that. Even after switching to a horizontal design I decided to keep the name because the cases ended up very boxy and the corner keys have a trigger squeeze actuation motion so it still seems like an appropriate name.

I was also really interested in vertical orientation combined with more trigger-squeeze activation as I have a background in saxophone and I wanted to bring some of that motion to my typing.

## Weeks and weeks of prototyping

Getting the main finger columns laid out right was really tricky. I was just learning parametric 3D modeling with FreeCAD too so I was struggling a bit with how to get my ideas into the software. The adjustable fit in 2 dimensions: forward and back as well as lower/higher went through a large number of prototypes and close to 2 full spools of 3D printer PLA filament. I had slotted designs, bolted designs, magnetic designs, glue designs, LEGO brick designs, etc. Some of these would have been difficult to wire up so making it feasible to hand wire became a major constraint once I got close to the positioning I wanted.

Thumb cluster custom fitting is afforded by a grid of holes than can have a threaded insert so that gives you X/Y adjustment and because it's attach with a bolt you can rotate it to exactly the best angle for your hand as well before tightening the bolt.

## The First Usable Design

Eventually I ended up with a design that provided 2 degrees of customization with 2 mechanisms:

* Key height was designed into the wall shelf heights. Because they can be printed separately and mechanically attached or swapped in/out, it's pretty straightforward to tweak the parametric CAD and print out walls with the right height offsets for a given person.
* The forward/back adjustment is handled by slots on each column and they are fixed into position with a m3 screw and threaded insert once tailor fit to the user.

This design with the walls also facilitates hand wiring while keeping the frustration level manageable. I did 3 solder operations on each switch with the completely out of the case, and only after that did I glue them into their positions. That helps a lot. Then, wiring can proceed with only one wall bolted on at a time so the other side has plenty of clearance for the soldering iron and manipulating the wires by hand.

The design necessitates fairly tall wrist rests. So far I've been using stacks of 4 CD jewel cases which I had handy and are about the right size. You need your hand to be well above the desk surface so your fingers can dive down into the keywells like you are gripping the end of an armchair. It's sort of like a Kinesis Advantage but taken more to an extreme.

## Key Mappings

I've been getting RSI pains from pinky reaching to the outer column and chording shift, so I have been very motivated to reduce use of pinky drastically and move more work to the thumb, so there's no column outward from the pinky. Shift and control/escape go to the thumb and tab goes on my navigation layer so the pinky only has basic letter duty. I'm likely to switch to a pinky-minimizing layout like BEAKL sometime soon but I didn't want to tackle that while also adjusting to the new hardware.

I kept one reachy innermost column because I wanted to keep a dvorak base layer and not have to immediately switch to something different. So that innermost column is really only there to ease my transition but I ultimately might make a layout that doesn't require it and ditches it. To reduce the distance I need to reach sideways, the 2 innermost columns are a single plate so the gap can be quite small about 2mm.


## More parts details

The switches are Kaihl Choc Reds which are linear, low-profile, low activation force, and quiet. The microcontrollers are Elite-C. The hands are interconnected via RJ-9 cable and soft serial configuration. Mostly it's by the book handwired keeb approach.
