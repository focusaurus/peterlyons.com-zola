+++
title = "javascript try catch is fail"
date = 2016-03-23T14:32:56.405Z
+++
It is possible to write solid javascript code almost entirely without using try/catch. The only common standard library function that requires it is `JSON.parse`. Almost everything else will expose environmental/input errors with some other mechanism (usually a special value or surprising behavior).

- `parseInt('turkey sandwich', 10)` returns `NaN`
- `parseFloat("I'm on a boat")` returns `NaN`
- `new Date("St Swiven's Day")` returns `Invalid Date`
- `Math.max('tomato', 'potato')` returns `NaN`
- `15/0` evaluates to `Infinity`
- `'home'.slice('biscuit')` returns `'home'`
- Errors of any kind when dealing with `XMLHttpRequest` will not produce exceptions

### Error-first callbacks and ES5 Are OK

This, while contributing to JavaScript's "WAT" factor, is actually a good situation, all things considered. It is good because it leaves exceptions to represent ONLY programmer errors and never operational errors. Operational errors are problems with the environment such as invalid user input, failed network communication, no disk space left, etc. They can be resolved without changing the program code itself. Programmer errors on the other hand indicate a flaw in the program code that can only be fixed by correcting the source code. For further information on this distinction, I highly recommend this archived version of a Joyent blog post on [Error Handling in Node.js](https://web.archive.org/web/20140401155055/https://www.joyent.com/developers/node/design/errors).

In the vast majority of node code I've written, which uses the node error-first callback convention, I end up with the following properties

- Any exception thrown represents a programmer error (excluding JSON.parse as mentioned)
- All operational errors are represented as either error-first callbacks or `error` events emitted
  - This is largely due to the async event loop constantly unwinding the stack, making try/catch/throw effectively useless

Thus I can set up a `process.on('uncaughtException')` handler and confidently exit my program knowing if that event ever fires, it's a programmer error, and as discussed in the "Error Handling in Node.js" article, exiting with an error and restarting is the correct thing to do.

Now, this does require discipline to properly handle all error-first callbacks and some boilerplate comes with that. Failing to do so risks operational errors going undetected, but usually within a few lines of code, those operational errors are inadvertently escalated to programmer errors when you try to access the first record in a database query result array, which is undefined because the query failed and you ignored the error. **Operational errors eventually manifesting as impostor programmer errors are pretty bad (but...)**. I do see YOLO-ignore-the-error code occasionally in my consulting practice, but I'm usually able to make a convincing argument that all errors must be at the very least logged if you don't want to spend days debugging odd program behavior.

### ES2017 async/await ruins this

Part of my motivation to write this post was exasperation encountering my first bleeding-edge babel/ES2015/ES20XX project that combines [async functions](https://tc39.github.io/ecmascript-asyncawait/) (Slated for ES2017), the await keyword, promises, and try/catch. You get code looking like this:

```
try {
  let user = await db.users.getOrThrow({email})
  res.sedn(user.toJSON())
} catch (nouser) {
  res.status(404).send('user not found')
}
```

The problem is this masks a programmer error as an operational error. What happens in the scenario I'm so concerned about is:

- DB query runs and finds the user, returns it
- await/promise do their magic and let this look like synchronous code
- we try to send success, but there's a typo: `res.sedn` instead of `res.send`
- this throws an exception, our good friend "is not a function"
- the API is designed to indicate record not found with an exception
  - I consider this a poor design, but it exists
  - specifically the bookshelf.js ORM has a `.fetch({require: true})` API that does precisely this
- the catch block catches it, miscategorises it as an operational error, and sends a 404, when the correct behavior would be to send a 500 and exit the process nonzero
- Nobody notices this

**(...)Programmer errors hiding as operational errors is worse**.

### Freaking out

So with ES2017 the combination of await, implicit promises, and try/catch for error handling seems to me like this scenario is going to become increasingly common, and I'm worried about how I can actually still detect programmer errors and exit. The duck typing of exception instances in javascript is sufficiently undefined, unimplemented, and unreliable that I doubt you can reliably distinguish unless you have a complete and well-understood catalog of all possible operational exceptions a block of code might generate, which I don't think is feasible without slimming your `try` blocks down to a single operation, which loses a primary proposed benefit of try/catch in reduction of error handling boilerplate.

### What's to be done?

At the moment, I'm not sure how this is going to play out. I'm sticking to ES5 and callbacks for now. I think exceptions should represent programmer errors and never be used for control flow nor for operational errors. That's why they have stack traces, and that should be their sole purpose. But I'd love to hear your thoughts and suggestions, so post a comment here via disqus (click "Show Comments" below) if that's your thing or take it to twitter or hackernews etc.

**Update 2017-11-04**: Eran Hammer is proposing [Bounce](https://hapi.dev/module/bounce/) as a solution to this problem, and it looks promising.

### See Also

[Promises are not neutral enough](https://staltz.com/promises-are-not-neutral-enough.html).
