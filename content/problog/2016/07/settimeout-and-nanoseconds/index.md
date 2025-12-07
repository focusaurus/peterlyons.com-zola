+++
title = "settimeout and nanoseconds"
slug = "2016/07/settimeout-and-nanoseconds/"
date = 2016-07-30T14:37:28.624Z
+++
Just a quick "today I learned" that if you pass a number < 1 as the delay argument to `setTimeout` node.js will attempt to run your callback at that time even if it's less than 1ms in the future.

```js
const pretty = require('pretty-hrtime')

setTimeout(() => {
  const delta = process.hrtime(start)
  console.log(pretty(delta))
}, 0.5)

const start = process.hrtime()
```

If you run this in a shell loop, you'll notice sometimes it is able to complete in 500 nanoseconds or so, but sometimes it can only manage 2.5ms.

```
for i in $(seq 1 10); do node time.js; done
1.92 ms
562 μs
568 μs
1.87 ms
565 μs
2.62 ms
1.88 ms
1.87 ms
553 μs
566 μs
```
