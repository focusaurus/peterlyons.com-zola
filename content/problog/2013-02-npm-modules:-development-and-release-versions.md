+++
title = "npm modules: development and release versions"
slug = "2013/02/npm-modules:-development-and-release-versions/"
date = 2013-02-01T20:17:35.407Z
+++
You are working on two npm modules that are both actively being developed:

  1. `my_app`: some application, which depends on `my_lib`
  1. `my_lib`: a shared library

There are 2 modes you'll need inside `my_app`: 1) using a published release of `my_lib` and 2) using a local development version of `my_lib`.

Using a published release of `my_lib` is standard faire:

  1. list `my_lib` as a dependency in `my_app/package.json`
    1. `dependencies: {"my_lib": "1.2.x"}`
  1. `cd my_app && npm install`
  1. npm will populate `my_app/node_modules/my_lib` for you as you would expect

To use your development version so you can easily make changes to both codebases and have them available with minimal fuss, set up this structure

    ~/projects/my_app (working directory for the app)
    ~/projects/my_lib   (working directory for the lib)
    ~/projects/node_modules/my_lib (symlink to ../../my_lib)

You can set this up with

    mkdir -p ~/projects/my_app ~/projects/my_lib ~/projects/node_modules
    cd ~/projects/node_modules
    ln -nsf ../../my_lib

So now when developing `my_app` and you want to use the local development version of `my_lib`, just do :

    cd ~/projects/my_app
    npm uninstall my_lib

Now node's `require` function will load `my_lib` from `~/projects/node_modules/my_lib` and you are good to go. To switch back to a public of `my_lib` just do:

    cd ~/projects/my_app
    npm install

Of course, there is [the npm link command](https://npmjs.org/doc/link.html) which does something nearly identical to this, so far I prefer this approach as I find it a little simpler.
