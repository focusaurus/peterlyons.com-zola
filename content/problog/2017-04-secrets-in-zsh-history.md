+++
title = "secrets in zsh history"
slug = "2017/04/secrets-in-zsh-history/"
date = 2017-04-17T00:25:00.532Z
+++
I've been trying to get a manageable system for dealing with projects that need a lot of settings, some of which are secrets such as credentials. In general, environment variables are the most widely-supported mechanism. They have many shortcomings: they are exposed by the OS to other processes running as your user or root via the `/proc` filesystem (at least on linux), don't have data types other than strings, can't express nesting or arrays easily, etc. However, they can get the job done if you keep things simple.

Anyway one of my main concerns was keeping these secrets relatively secret but also not massively inconvenient for actual development work. My approach so far has been to keep them encrypted in 1password as a multiline notes field that is just some shell syntax to export them as environment variables. It looks something like this:

```sh
export AWS_ACCESS_KEY_ID='blah blah blah'
# Use this for dev
export AWS_REGION='us-west-2'
# Use this to test the standby region
export AWS_REGION='us-east-1'
# etc etc
```

So I feel pretty good that this is securely off disk. I would copy and paste this into my shell and go about my work. However, these commands then get put into my shell history which are clear text files. I wanted something this convenient but keeping secrets out of my shell history.

What I came up with is this:

`eval $(pbpaste;echo)`

Which I set up as a keyboard macro so I type `epb,,`, keyboard maestro detects the double comma and looks up the proper snippet to expand the text. The eval tells the shell to execute the code and the pbpaste bit outputs the text I just copied from 1password.

So this is better. Some shells allow omitting a command from history by typing a leading space in front of it, just FYI but I felt that was too error prone to use consistently.

It's still not ideal as stuff lives in memory probably longer than it should, and the mechanism to clear things is to exit the shell, which I don't do regularly enough because there's usually state in the shell I don't want to have to re-setup like activating python virtualenvs, etc. It's also possible to unintentionally copy some other text before you paste it into the terminal, thus shooting yourself with your` eval` footgun.

Got something better to suggest?



Side note for zsh: `setopt interactivecomments` will avoid annoying errors when you paste snippets with comments into an interactive shell.

**UPDATE (2017-09-12)**

It looks like [aws-vault](https://github.com/99designs/aws-vault) is a handy tool for this as well. I've started using it on 2 projects and so far so good, but it only handles the AWS creds, not randow other project vars.
