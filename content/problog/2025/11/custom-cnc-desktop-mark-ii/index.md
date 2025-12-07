+++
title = "Custom CNC Desktop Mark II"
slug = "2025/11/custom-cnc-desktop-mark-ii/"
date = 2025-11-30T21:24:39Z
[extra]
image="https://photos.peterlyons.com/2025/2025-11-30-01KBADNCXG95ZAPEFMAG51WP0X.2048.jpg"
+++

I made another custom desktop on the CNC with recesses for my split keyboard. I'm really happy with how it came out. I got the project finished up and installed over the Thanksgiving holiday break, and my wife painted two of the walls in my office - one has a logogram from the movie "Arrival", and the other is a geometric pattern. All this adds up to make my office looking and feeling so much nicer now!

{{ figureplop(url="https://photos.peterlyons.com/2025/2025-11-30-01KBADM7T0REAR0DFT1BX1GR1P.2048.jpg" caption="custom desktop mark II")}}

{{ figureplop(url="https://photos.peterlyons.com/2025/2025-11-30-01KBADQ1N0QXMREJR4KG4YMWVE.2048.jpg" caption="low angle shot showing the recess depth")}}

{{ figureplop(url="https://photos.peterlyons.com/2025/2025-11-30-01KBADNCXG95ZAPEFMAG51WP0X.2048.jpg" caption="center view")}}

## Arrival Logogram Artwork

The movie "Arrival" contains my all-time favorite visual effect. The alien writing system, referred to as logograms in the movie, are these strikingly beautiful circular smoke patterns. I thought it would be a great thing to put in my office and make an awesome background for video calls. My wife has done a few paintings directly on the walls using a projector to establish a baseline pencil sketch. So that's what she did and it came out great. On another wall I was inspired by a nearby commercial building with a geometric mountain pattern, and she did that on the adjacent wall.

{{ figureplop(url="https://photos.peterlyons.com/2025/2025-11-28-01KB5QRD0G8M9KWQ1K6NDJKJ29.2048.jpg" caption="Arrival logogram artwork: Louise has question")}}

{{ figureplop(url="https://photos.peterlyons.com/2025/2025-11-30-01KBADSMN8R7AMA8NR7KYFHYNH.2048.jpg" caption="view of whole office with geometric wall pattern, Arrival art, and desktop setups for my work and personal workstations")}}

## CNC Desktop Refinements

Mark I was made of 3 layers of MDF. For this version, with more CNC & CAM experienced, I realized I could get by with 2 layers by treating them like a sandwich and milling out the interior of both slices. So I milled the cable channels into the top piece by placing it into the CNC upside down. This also means the final assembly is 1" thick and lighter weight.

I have been bumping my swivel chair into the armrests a bit, so I shrunk those down a few inches to hopefully reduce that.

I moved the coffee recess back a bit to try to leave full thickness in the center where my flexispot desk has 4 screws for attaching the desktop to the base. In the end there's only clearance for 2 of the 4 screws, which is better. I just omit the other 2 screws because installing them they would poke up into the coffee mug recess because there's only about 1/4" of material at that position.

I did a roundover on the edge to hopefully make it a bit more durable against dings.

Even though the desktop overall is thinner, I had a bigger depth to work with for the keyboard recess, so they are recessed quite a bit deeper such that most of the keycaps are below the desktop surface. Only the tilted angle keycaps stick out of the recess by a tiny bit at their tips.

## Ergonomics and typing video

Here's videos of me typing at the desk both seated and standing.

{{ youtube(id="ZYG5xPfSfRE") }}

## Failures

I did a CNC attempt with 1/2" plywood. It did not cut well due to layers wanting to chip and splinter. That model had the cable channels too deep and the bottom of them too thin, so there was huge chunks that just exploded out entirely during CNC and it was an irrecoverable failure. After that I decided to go back to MDF which mills very consistently and nicely.

I had several CAD and CAM issues this time around. Even more than the first one which was unexpected.

I forgot to add tabs and had the dreaded projectile cutout situation at one point. Nothing went beyond the surface of the CNC though so no injuries.

In the revised CAD for this, I made a square at 7" per side. Then I filleted the corners in the sketch. And for some reason when that happens, FreeCAD drops most of the dimension constraints. I re-added the 7" dimension to the y axis but forgot to re-add it to the x-axis. So I ended up with rectangles 7" by 6.69" very unexpectedly. Definitely a head scratcher when the keyboard insert didn't fit by a large margin. As a workaround, I had to adjust the 3D print to match those dimensions, and luckily there's enough extra space to still fit the keyboard.

The deep recess meant my thumb would hit the edge of the keyboard holder insert, so I had to adjust the model to remove the wall there to make clearance.

Heading back to work tomorrow after the holiday break should be a lot more pleasant and inspiring surrounded by cool art and furniture I made to be highly tailored to me.
