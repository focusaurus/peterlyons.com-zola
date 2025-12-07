+++
title = "Using lambdas with Bluebird.map"
date = 2016-07-26T01:52:48.981Z
+++
# Using lambdas with Bluebird.map

A situation came up this week where a coworker had stumbled upon some really terse code. They weren't exactly clear on what was going on, so we went through an exercise together of rewriting the code in the most verbose format, then gradually shrinking it one piece at a time to arrive at the very terse but completely equivalent format.

## Our Task: Put Users into Groups

Here's the situation. We need to do a series of database inserts to add a user to multiple groups. This is done with an SQL INSERT statement for each groupId linking that group to the given user.

Here's the initial setup code that will be unchanged for all the examples in this post:

```js
const Bluebird = require('bluebird')

const db = {
  insert: (table, row, callback) => {
    setTimeout(() => {
      console.log('done adding row', row)
      callback(null, [])
    }, 1000)
  }
}
Bluebird.promisifyAll(db)

function addToGroup(userId, groupId) {
  console.log('adding user', userId, 'to group', groupId)
  return db.insertAsync('users_groups', {user_id: userId, group_id: groupId})
}
```

## WTF is this?

The initial code encountered, which was unclear, was

```js
const groupIds = [42, 27, 33, 99]
const userId = 12

Bluebird.map(groupIds, addToGroup.bind(null, userId))
  .then(() => {
    console.log('done')
  })
```

This makes use of `Function.prototype.bind` which is available on all functions. To show what's going in in this very terse bit of code, we coded up the fully verbose format of equivalent code as follows.

```js
Bluebird.map(groupIds, function perGroup (groupId) {
  return addToGroup(userId, groupId)
})
  .then(() => {
    console.log('done')
  })
```

We're using `Bluebird.map` to iterate over each `groupId` in the `groupIds` array so the `perGroup` function will be invoked 4 times since there are 4 values in the `groupIds` array. Each invocation calls `addToGroup` with the arguments in the proper order, and returns the promise that `addToGroup` returns.

`addToGroup` does the DB insert against our mocked-up database library which has been promisified with the `Bluebird.promisifyAll()` utility function so `insertAsync` will return a bluebird promise and not need a callback even though `insert` is coded as a callback API.

When coded like that, it was clearer what was going on. So we then started to trim out syntax that is technically unnecessary step by step as a learning exercise.

## Shrinking it down

First to go was just the name of the `perGroup` function, making it a lambda (anonymous function).

```js
Bluebird.map(groupIds, function (groupId) {
  return addToGroup(userId, groupId)
})
  .then(() => {
    console.log('done')
  })
```

## Sprinkle Some ES2015 Arrow Function On It

Next we opted for the terser ES2015 arrow function syntax.

```js
Bluebird.map(groupIds, (groupId) => {
  return addToGroup(userId, groupId)
})
  .then(() => {
    console.log('done')
  })
```

## Lose the Curly Braces

Now what we notice is we have an arrow function that just returns the value of a single expression. This means it's eligible for the ultra-terse no-curly form. So we axe the curlies and the `return` keyword and keep it on one line.

```js
Bluebird.map(groupIds, (groupId) => addToGroup(userId, groupId))
  .then(() => {
    console.log('done')
  })
```

OK now that's pretty terse. However, look closely at the anonymous mapping function itself `(groupId) => addToGroup(userId, groupId)`. How different is it from `addToGroup`? Well, instead of taking 2 arguments, it only takes one. Then it calls `addToGroup` with 2 arguments, the first being the `userId` which is directly in the parent scope and the second being the `groupId` that comes from `Bluebird.map`. So you could think of it like a variant of `addToGroup` with the `userId` argument hard coded or "baked in" to be a particular value.

It turns out that this is exactly what `Function.prototype.bind` does. Given a function, bind creates a new function that has some of the arguments pre-specified ("bound") to particular values, leaving only the remaining arguments to be varied on each function call.

## Back to .bind

So that gets us back to the `.bind` format.

```js
Bluebird.map(groupIds, addToGroup.bind(null, userId))
  .then(() => {
    console.log('done')
  })
```

It's a few characters shorter than even the tersest arrow function.

What we are doing here is creating a new, unnamed function with pre-specified `this` value and first argument value. When we call `addToGroup.bind(null, userId)` passing `null` as the first argument means the function `bind` returns will not have access to a `this` variable when called. `addToGroup` is a regular function (not an object-oriented method) and makes no reference to `this`, so it's perfectly OK to have it be `null`.

 The second argument to `bind` will be "bound" as the first argument of our new `addToGroup` variant. That leaves the 2nd argument unspecified, which lines up with the `Bluebird.map` expecting a function that takes 1 argument which is a `groupId`. Remember that `bind` **returns** the new function without executing it. So you could express this in English as "Hey addToGroup function, build me a variant of yourself with this userId fixed as the first argument and the other argument unspecified until later when I call the function".

## lodash partial version

Another option if that ugly `null` in the `.bind` call rubs you the wrong way would be lodash's `_.partial` which looks like this:


```js
Bluebird.map(groupIds, _.partial(addToGroup, [userId]))
  .then(() => {
    console.log('done')
  })
```


## Lessons Learned

My take is that the implicit-return arrow function flavor: `Bluebird.map(groupIds, (groupId) => addToGroup(userId, groupId))` is the tersest you can go and still be readable to developers without much exposure to `.bind`, which is a fairly advanced feature in regular JS codebases, although in functional programming it implements the idea of partial application, which is very commonplace and not advanced for developers accustomed to the functional programming paradigm.

I think explicitly seeing that you have a function that takes a single `groupId` argument and gets `userId` from the parent scope is important for this to be clear, and with `.bind` you lose that and it becomes magic.

The main takeaway is that all formats of this code are exactly equivalent. It's good to be able to read and understand every variation so you are prepared if you encounter it in your coding.

Thanks to [Scott Nonnenberg](https://scottnonnenberg.com/) for reviewing a draft of this post!
