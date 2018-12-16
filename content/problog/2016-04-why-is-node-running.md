+++
title = "Why is Node Running"
slug = "2016/04/why-is-node-running"
date = 2016-04-08T03:47:03.191Z
+++
Ever have a node process you expect to complete and exit just hang there? This happens when the code has active listeners or timers that **could** potentially queue up more work to be done. For example, an open network connection that might still receive some data or a pending `setTimeout` timer scheduled for the future. When everything is neat and tidy and all network connections and timers are properly canceled and closed, node sees that the event loop callback queue is empty and exits the process entirely. However, as you graduate from small scripts to small and medium applications where several databases, upstream backing API endpoints, connection pooling, etc are in play, it can be a first-class mystery tracking down a process you expect to exit that's just hanging there.

Enter [why-is-node-running](https://www.npmjs.com/package/why-is-node-running) to save the day. To use it is pretty straightforward.

1. `npm install why-is-node-running`
1. Run your app using the CLI wrapper so instead of `node server.js` you would run `./node_modules/.bin/why-is-node-running server.js`
1. why-is-node-running will print out the command and PID you need which will be something like `kill -SIGUSR1 67641 for logging`
1. In a separate terminal, run that command. The output stack traces usually should give you enough clues to track down the culprit.

There were definitely times in the early days of node where I could have really used this. Glad it's here now, though!
