+++
title = "Recurse Center 3: Box"
date = 2017-11-10T04:58:32.374Z
+++
Today I wrote a little unix utility to ensure a given line is present in a file. It's not that much longer than I would expect in a scripting language (60 lines vs probably ~10 for python), but the number of machinations I had to go through was vastly larger. To get basename of `argv[0]` I had to make a `Path` struct which brings lots of `Option`/`Result` handling into things. I'm getting less terrible at reading the standard library reference documentation. I continue to be frustrated that the expandable sections for each method are all expanded by default. Maybe I'll work on a PR for that later assuming it's not baked into the tool they use to generate the docs.

The timing in NYC is indeed proving to be tricky as I predicted. I work best first thing in the morning, but that's when the subways are most crowded. So RC mostly starts late around 10:30ish and goes late. I also start to fade fast into late afternoon exhaustion around 4PM. Today I just came in early. The commute wasn't that bad, but I had to let 2 trains pass because they were totally full. I think I'll end up working at home or from a coffee shop in Park Slope or from Brooklyn Boulders in the mornings for about 2 hours, then commute into RC, and either head home on the early side or find exhaustion-compatible things to fill the last 2 or so hours before commuting back home.

Oh and I learned 3 new ways to make coffee so far: chemex, aeropress, and keurig (not as easy as you might assume). Only tried 2 myself but tomorrow I'll try making a mug via aeropress.

I also paired with Casey at the end of the day and got a good verbal explanation of the differences between Refs and Boxes in rust.
