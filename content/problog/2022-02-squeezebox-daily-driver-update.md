+++
title = "Squeezebox Daily Driver Update"
slug = "2022/02/squeezebox-daily-driver-update/"
date = 2022-02-25T23:46:03Z
+++

So I've been using the squeezebox as my daily driver keyboard for two weeks now. Here's my thoughts on this experience. But first a typing video:

## Typing video

{{ youtube(id="EgOgtf3WEmI") }}

## The Home Corner Works

The design element of the middle and bottom rows being a steep 100 degree angle feels totally validated to me and I'd recommend other experimenters out there incorporate it into their designs. Even though accidental bottom row presses are still some of my more common errors, I think with time that will improve and the benefits of that saxophone-like squeeze action are worth it.

## Per-finger ergonomics are really about the pinkies

So I have small variations in the height and columnar offset for every finger, and I'm beginning to really doubt whether this is worthwhile for the index, middle, and ring fingers. I may print a few more sets of standoffs and set them all to be the same height and remove the columnar stagger. I think the proprioception of those 3 fingers understanding when they will all come to rest on a flat surface is pretty strong and each finger having a different height key to press I think counteracts that. Both are definitely necessary and worthwhile for the pinky but for the other 3 fingers even after all this ergonomic prototyping work I'm skeptial.

## I still want less travel

The kailh chocs I'm using say 1.5mm travel for activation and it feels like I would prefer much less than that. Even kailh butterfly keys (which I have never tried) only get that down to 1.2mm which seems disappointing. It still feels like a long way to press and I have to consciously think about pressing deep enough to avoid presses that fail to activate the switch.

## Tenting is a nightmare

Even after all the nonsense design and prototyping work I did to make this thing exactly fit my hand, getting a tenting setup that is stable and correct is a massive hassle. I ended up having to buy a keyboard tray to attach to my desk and then drill holes through that so I could bolt the camera stands that hold my keyboard to it down solidly. Otherwise they squish together, rotate inward, and lift up while typing. Any of that instability I think is super bad for typing confidence.

I'm expecting a Keyboardio Model 100 in the next few months and if I can comfortably type on that without tenting I'll likely try to switch to it. The availability of a flat sturdy desk surface is just so good and not having to deal with the complexity that comes with tenting would be a nice relief. Of course the ergonomics of tenting are significantly better but it all comes down to whether or not typing becomes painful in any given position.

## Typing is OK but inconsistent

My typing speed and accuracy sometimes bump up pretty close to my previous level, but when either take a dip, they can dip pretty far before bottomming out. I feel like my range on my TBK mini was like 50-70 WPM and fairly tight whereas it's like 25-70 WPM on the squeezebox and currently I'm still far less accurate, especially on longer typing tests.

## Chair and body position are locked

When I'm seated, the bolted-down tenting setup pretty much requires my chair be exactly centered an exactly in the right position and my butt all the way back and punishes any kind of leaning or slouching or half-sitting on my chair. Any of that causes it to become hard to squeeze the bottom row properly. I don't know if this is all-in-all a benefit, but it's definitely a change and less forgiving than my TBK mini setup.

## The compromise in this design shows

Ultimately the key layout I have is a compromise between two fundamentally incompatible approaches:

* Hands stay still and fingers do the typing
* Hands move to get fingers over the keys then the fingers type

Because I have extra columns outward from both my pinky and index fingers, it means I have to move my hands a bit to reach the outermost keys, and that kind of screws up the beauty of the home corner which is really about keeping your hands almost exactly still and your finger movements very small from there.

Ultimately I'd have to switch to a layout with like 24 main keys in a 3x8 grid to really go all-in on stable hands. But even a layout like BEAKL doesn't do that. It would require 2 combos for the least common letters and every symbol would need to be off the base layer. Maybe someday, but not right now. Of course, just because the physical switches are there doesn't prevent me from changing to a keymap where they are not mapped to anything.

I think if I were to get up the learning curve to a 24-key layout, it would really let the strengths of the squeezebox's ultra-tight spacing shine through. But as it is with the outer column reaches, things are hampered and I probably would be just as well off on a more dactyl type shape or even back to flat columnar like an ergodox.

Now, some clever redditor told me I could get these neighbor columns even closer by cutting my Kailh choc switches to chop off the bit where the LED goes because all the switch electronics are on the other side. That might help a lot and if I could basically get choc switch stems really tight next to each other the reaching to neighbor columns might be less disruptive. BUT that's a fairly big hack to undertake. Maybe someday. As of now I'd lean toward building a butterfly design as more likely to be an improvement.

## 1-Finger chords

My keymap doesn't have many 1-finger chords because I was holding on to a keymap that was identical between my TBK mini and the squeezebox just in case I needed to switch back. It's been long enough now though that I added one: left index finger middle+bottom chord is escape and it's working nicely.

## Thumb clusters

The thumb clusters feel pretty optimal to me, at least for this key mapping. They are not mechanically as rock-solid stable as I'd like but it's OK enough as long as there's adequate torque on their bolts.

I could see myself trying a 5-way switch for each thumb for a bunch of layers, and of course I'd love to get a track point or track ball going at some point, but for keys-only, these clusters are good.

Surprisingly, one of my most persistent typing errors is activation failure on space, which I type with the right thumb on its home key. My intuition would be this would be the absolute most reliable key. The strongest finger on my dominant hand on its home key, but for some reason it doesn't fire reliably. This being a DIY hand-wired prototype, I can't rule out that maybe the hardware itself is flakey for that key. Actually, maybe the hardware is flakey for every key but I notice it most on space because it's the most common key. But going on the assumption the hardware works properly, it's an open question why space doesn't fire consistently.

## The case

Since the previous blog post, I added a big empty box to the bottom of the case to provide much more rigidity. The bare slot plate was pretty thin and with all those slots it was getting more deflection when I typed than I would like. So I printed a much thicker version then bolted them to a box and now it's good. The box is deep enough so I can set the keyboard down flat on the desk and it rests on the box without resting on the edge of the thumb cluster, which always felt like it was going to bend or snap the thumb cluster post eventually.

Next case would have the slot plate attach to the bottom by sliding into a groove instead of being bolted on. The bolts are too much of a pain to undo when you want to adjust the columns. Of course, this is only supposed to happen rarely, but it's so easy to just go "eh, nevermind".
