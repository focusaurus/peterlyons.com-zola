+++
title = "Eliminate Useless Callback Wrappers in JavaScript"
slug = "2015/09/eliminate-useless-callback-wrappers-in-javascript"
date = 2015-09-03T04:21:37.649Z
+++
Just a quick tip from some code I encountered today. Instead of this:


    function outerFunc (callback) {
      doSomething(42, function (err) {
        callback(err)
      })
    }

Eliminate the useless callback wrapper function:

    function outerFunc (callback) {
      doSomething(42, callback)
    }

It's more concise and more efficient and entirely equivalent.
