+++
title = "Quick Thoughts"
date = 2017-10-08T03:09:20.809Z
+++
### Code Coverage

Organizing code so my 100% tested code is kept separate from other dev's 70% tested code so at least part of my coverage report is green.

### Flat UI

[](https://www.nngroup.com/articles/flat-ui-less-attention-cause-uncertainty)

### DynamoDB Tables

WTF is with dynamodb not having the concept of a database. This is terrible. Now we need to configure every table name for each deployment?

### Terraform Drop

Heads up, if you use terraform and change your dynamodb table key schema, it will drop and recreate your table without any extra warning.

### Deterministic Builds

TIL debian has a strip-nondetermisism perl script you can feed archives (zip, tar, etc) and it will make them deterministic


### Almost Swiped

Mobile interaction annoyance: If I swipe to dismiss a notification, but not far enough so it stays there, then I swipe it again immediately, I'm fucking trying to dismiss it, cut me some slack and dismiss it already.

### Hidden Passwords

I want mobile password inputs to take up the entire screen with keyboard letters and FFS allow me to show the password. 95% of the time shoulder surfing is not a threat to me.

### Slack Interviews

I don't do whiteboard interviews or coding algorithms. I just ask the candidate to set up some reasonable slack notification preferences.

### Slack Accounts

If only we could rewind time and have slack use a single account model

### joi vs JSON schema

I switched from joi to basic json schema objects for broadest tool support and integration and because manipulating POJOs with JS is really easy. But now the verbosity is getting to me and I might switch back to joi.

### XKCD Compiling

Instead of "compiling" my excuse for slacking off is "terraforming"

### API Gateway error messages

For AWS API Gateway errors, use JSON with {"message": errorMessage} so your application errors and the default APIG ones have the same schema

### Terraform apply errors

terraform doesn't really deliver on its promise/potential. So many cases where "plan" looks good and "apply" fails at runtime. I wonder if we could build a stronger type system and move errors from apply time to plan time like elm did for javascript errors from run time to compile time.


### Ignite Bullshit

Ignite presentation idea: Bullshit. 5 topics, 3 slides per topic: the pitch, why it's bullshit, the better option.

### Shift

Maybe shift key should be last resort as a modifier key. Because you need it for normal typing, seems more ripe for mistakes vs ctrl/opt/cmd.

### Dark Patterns

Showing a notification widget to a non-logged-in user is a dark pattern.

TransUnion dark pattern. Fill out a form. Opt out of email. Submit form. Get an error about password field. All fields retain their proper values except opt-in to email is checked again.

### DevOps Tooling Woes

I really wish there was 1 fucking tool in the entire devops ecosystem that understood what a real multi-stage deployment flow should look like.

### Terraform variable scope

Terraform what the actual fuck went on with your "declarative" design? `* function_name: duplicate local. local value names must be unique`

### Scrumish

What methodolgy do you follow? Arbitrary but we say "sprint" a bunch.

### AWSmess

An open source AWS linter called awsmess

### Code Search

OMG If I ask to search logs/code/tech stuff for XYZ-12345 I DO NOT MEAN ("XYZ" OR "12345")

### Object Storage

Nerd rage at tech companies that call S3/filesystems "Object Storage". You don't get it. Files and Objects are 2 different things to developers.

### hclfmt crap

Vertically aligning equal assignment operators is terrible. Creates SCM noise. Makes things less readable.

### Duolingo Spaced Repetition

Not buying their spaced repetition algorithm. Keeps asking me to re-prove that I know words like "gracias".

### Old Man Yells at URL

The URL query string. Intended for search. Now just used for tracking and when you do a search they don't even give you a bookmarkable URL.
