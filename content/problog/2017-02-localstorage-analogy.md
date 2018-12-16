+++
title = "localstorage Analogy"
slug = "2017/02/localstorage-analogy"
date = 2017-02-18T19:43:01.823Z
+++
I was working with a friend on her dev bootcamp project writing a little wish list management single page web application just backed by localstorage in the browser. This was her first time working with localstorage. As we gradually built features into the app, when it came time to interact with localstorage, I could see she was unclear on what needed to be done, in what order, and why. So I made this analogy and I think that gave her a good frame of reference.

In the browser, localstorage is (essentially) a javascript object. Our application was modeling a wish list as a javascript array (the list/array correspondence should be fairly clear). In that array each wish was initially just a string (whatever you typed in the "add wish" input text box). Later we would switch these to being objects so we could have proper IDs and timestamps, but for v1 we were shooting for the absolute simplest thing.

So as we were dealing with cold start, adding wishes, reloading the page with data already saved, etc, I made this analogy. Think of localstorage like a desk drawer. Inside that desk drawer is piece of paper (our wish list, which in code maps to the array) and on that paper we are writing our wishes (the javascript strings are the wishes).

So I said imagine you show up a new house (browser), go over to the desk, open the drawer and find there's no paper in there. It's empty. In real life, the presence/absence of paper is determined just by looking. In code, we need an `if` conditional statement to see if our `localstorage.wishes` property is there or not. When our condition evaluates to false, we need to get a new blank piece of paper to be our wish list, which we do in code with `var wishList = [];`. Then to add a wish, we write it on the paper with `wishList.push(newWish)`. Then we put the paper in the drawer for storage by `localstorage.wishes = wishList;`.

Similarly, once we have some wishes stored, if we reload the page, it's like walking into a house where the wishlist in the desk is already there and has some wishes, so we just render those wishes to the DOM instead of starting from a blank slate.

It felt like this analogy made it clearer how the wishes array and localstorage needed to be manipulated at each point in the app/data lifecycle.

That's all, just wanted to share this in case others find it helpful.
