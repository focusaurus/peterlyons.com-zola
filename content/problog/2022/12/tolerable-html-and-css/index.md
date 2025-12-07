+++
title = "Tolerable HTML and CSS"
date = 2022-12-07T01:17:26Z
+++

## Back Story

For my entire time as a web developer, front end web layout has been a kludgey messy nightmare. I think about every few years since 1999 or so I spend a few days reading the latest CSS features that are the new hotness and advertised as finally going to solve pervasive problems with layout, centering, alignment, etc. I've just been through so many rounds of this nonsense: rounded corners, sticky headers and footers, gradients, wrapping text around images, weird magic number font sizes, negative margins, margin collapsing, battling horizontal scrollbars, parallax nonsense, full-width background images. I have the scars. Every time without exception, I've come away disappointed and bitter and without an actually workable solution.

Anyway, when flexbox turned out to be complex and bad and front end devs seemed to still be doing bootstrap or various terrible grid systems, I noped out again to focus on back end concerns and continue my wait-25-years-if-thats-what-it-takes approach to wanting semantic HTML with no extra wrapper divs and expressive CSS that matches how we think about layout.

For the late 2022 round of this self-flagellation, I'm taking a look at CSS grid in hopes that I can 1. Not use a 3rd party grid system and 2. be rid of non-semantic wrapper row/column grids. I watched some great tutorials by Jen Simmons on CSS grid, and I think I'm ready to declare the project a success. There's still a handful of nuisance issues, but most of my modest layout desires are straightforward to implement with CSS grid and other core features both old and new.

## Tidy Site

To showcase how I like to split my SCSS files up and which ones I can re-use wholesale between similar site projects, I did a little demo project called [Tidy Site](https://focusaurus.github.io/tidy-site). It's up on github pages for the live version and the source code is on github. Have a look!

[https://focusaurus.github.io/tidy-site](https://focusaurus.github.io/tidy-site)
