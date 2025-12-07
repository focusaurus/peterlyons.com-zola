+++
title = "keeping npm dependencies up to date"
slug = "2016/03/keeping-npm-dependencies-up-to-date/"
date = 2016-03-15T02:16:37.749Z
+++
I've recently tried a few tools to help me keep the dependencies of my node/npm projects up to date. Here's a quick report on my experience, but first a few notes.

### Why bother?

Keeping up with the barrage of updates can be a tedious chore. Is it even worth the effort? For silly side projects and things you've generally not committed to maintaining, no, it's not worth the effort. But for an open source library that is actively used or a side project you want to be perceived favorably, it's worthwhile.

- It shows recent maintenance activity, which is a strong signal of a non-abandoned project
- it shows ability to add to a project after the initial release and "new project energy" has dissipated
  - You might be surprised how few projects can pass this test
- It can help to avoid security vulnerabilities

### greenkeeper

The first tool/service I tried was [greenkeeper](http://greenkeeper.io). It integrates with both npm and github and works by detecting when new packages are published to npm and sending your project a github pull request to update your `package.json` file to the new version. The intention is for you to have continuous integration set up so automated tests can confirm the new version still works properly in your library, and if you, you can just click "Merge" and get on with things.

Overall the service works as advertised. I eventually disabled it, though because it is too tedious to manage given multiple projects. I ended up with several emails/PRs per day and increasing complexity to manage them, avoid conflicts, click around the github web UI for ages, etc.

So I went back to the command line with the next tool.

### npm-check-updates

I found [npm-check-updates](https://www.npmjs.com/package/npm-check-updates) to work really well. It's a command line tool (abbreviation `ncu` also available) you can run in your project's root directory and it will print out your stale dependencies, optionally updating your `package.json` file. Then you should run `npm install` to actually install the new deps, make sure your tests pass, and then commit and potentially release a patch update to your project.

I ended up adding a little shell function to loop over my node projects and run `ncu -u` on all of them so I can quickly update any stale dependencies.

### packages to avoid

I looked at the following packages and they seem to be unmaintained, so don't bother:

- [npm-update](https://www.npmjs.com/package/npm-update)
- [npm-modernize](https://www.npmjs.com/package/npm-modernize)

### general tips

- Make sure your test and release process (the git part, CI part, and npm part) are automated well enough that the process is not tedious nor error-prone
- consider scheduling a specific time to handle non-urgent updates to avoid needless distractions. I've made this the first part of my "Open Source Wednesday Morning" routine I do while at the Code and Coffee get together.
