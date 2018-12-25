+++
title = "Command Line: Newbie to Ninja"
slug = "2015/12/command-line:-newbie-to-ninja"
date = 2015-12-06T17:52:52.245Z
+++
## Part One: Bow to Your Sensei

![Bow to your Sensei](https://static1.1.sqspcdn.com/static/f/1209144/20265241/1347563118103/RexKwonDo2.jpg?token=mU%2Beslcb3UKPj3JU%2FUTKrbccAxI%3D)

These tips are the dojo ground rules you must learn before even the most basic command line work can get done. If you haven't got these down, everything is going to take much longer than it needs to. These are also definitely a prerequisite to any command line activity while pair programming if you don't want your pair to pull their hair out during the session.

### tab completion

The shell can help you out with typing long filesystem paths and avoiding typos in command names. It does this with a feature called "tab completion". Tab completion allows you to start entering just the first few characters of something then type the `<TAB>` key and the shell will complete it for you. So for example, instead of typing `cd ./external/plugins`, you could type `cd ./ex<TAB>` and the shell would expand the rest of the directory name "external", allowing you to keep typing `pl<TAB>` to expand plugins. This saves a lot of typing and prevents typos from ruining your day. Pretty much every experienced command line user I've paired with uses tab completion on nearly every command they run.


### navigating command history

Another glaring sign that it's your first day at the command line is re-typing a command you recently ran. The shell keeps a history of commands you ran and makes it easy to re-run a previous command because this is something that happens all the time in typical interactive shell usage. Here are some shell history basics that will keep you moving fast.

- Use the up and down arrow keys to scroll back/forward through your history
  - CTRL-p (previous) and CTRL-n (next) do the same thing and touch typists may prefer these as your hands don't need to leave the home row

And for something you remember running but it was far enough back that you'd need to hit the up arrow many times to find it, there is `CTRL-r` for reverse interactive searching your history. Type `CTRL-r` then any portion of the command you remember and the shell will search backward through your history for a match. Keep typing to find the exact match and hit `ENTER` when you see it to re-run that command. If you need to edit it before running again to modify it slightly, use the arrow keys to move your cursor and the line will be loaded as your current command but not yet executed.

For example:

    cd /tmp
    sudo restart nginx
    ls /var/log
    vi /tmp/some/file.txt
    <CTRL-r>restart<ENTER> #<- quickly re-run the sudo restart nginx command


### line editing keyboard shortcuts

Second only to re-typing previous commands in terms of obvious beginner indicators would be backspacing over most of a command to make an edit to the beginning of the command, then re-typing everything you deleted.

Instead, use the shell's interactive line editing features. These are keyboard shortcuts taken from the 2 most popular command-line text editors: vi and emacs. Most shells support both of these. By default the bash shell loads the emacs keybindings. You can switch to vi bindings with `set -o vi` and back to emacs with `set -o emacs`.

The most important ones for emacs are `CTRL-a` to move the cursor to the beginning of the line and `CTRL-e` to go to the end.

If you use `vi` for text editing, you'll love having all your favorite move/edit commands available.

### don't cd for one-off commands

Another common pattern I see with beginners at the command line is a tendency to `cd` to a new directory for every command. Think of `cd` like taking off your coat and staying a while. If you are just running a single command dealing with a different directory, there's no need to `cd` to that directory first. `cd` when you are going to stay in a single directory and run a bunch of commands for a while. This will keep your paths short since you can use relative paths and tab completion. But if you just want to create a directory in `/tmp`, just run `mkdir /tmp/foo` without `cd /tmp` first.

In particular, avoid the tendency to `cd` every time you use the `ls` command. It usually ends up causing you extra work to `cd` back to your project directory. `ls` can take the names of directories/files to list as command line arguments so instead of

    cd /var/log
    ls

just run

    ls /var/log

### understand space-delimited args

"Do I need to quote it?" is something beginners often ask. You may have heard that all the complex edge cases of bash quoting rules are complex and tricky, and that is indeed true. Here be dragons. However, for the basic cases, it's really simple. By default the command you enter is separated into distinct values on spaces. So if you enter `ls /tmp /home/me /var/log` the shell is going to parse that as 4 distinct tokens with `ls` being the program to run and each of the 3 directory paths as the arguments. So what that means is **when a value you want to pass to a program contains a space, you need to quote it so the shell knows it is one value not several**. So if I have a file path with a space in it like `/tmp/uprade notes.txt` and I want to pass that to the `wc` program, I need to type `wc "/tmp/upgrade notes.txt"` so the `wc` program gets just 1 argument that is a valid filesystem path instead of 2 arguments: `/tmp/upgrade` and `notes.txt`, neither of which are valid. This rule applies to the shell entirely, and it doesn't matter which program is at the start of your command line command, the shell does the parsing before passing the values as arguments to the program being executed.

## Part Two: Breaking Boards

![Breaking Boards](https://l7.alamy.com/zooms/94bc81f5d797471ebc5790c8ee4d90e7/female-breaking-boards-with-bare-fist-in-a-karate-demonstration-an0nnm.jpg)

Now that you've got the basics, let's add some intermediate skills and understanding that will make you more effective.

Let's start with 2 issues that are a constant nuisance to beginners but once properly understood, immediately solvable every time for the intermediate developer.

### no such file or directory

One of the core subsystem of every computer is a hierarchical data structure called the filesystem. Overall, it's pretty great. It's extremely general purpose and versatile while being pretty straightforward. However, it is pretty easy to get confused about filesystem paths and inadvertently ask the computer to read a file path that does not actually exist. Sadly, the common pattern for this is the bad path gets passed in from a high level application and the actual error doesn't occur until deep in the core of the OS where no context exists about who or what wants to read this file and for what purpose. So at the command line, the error message can often be entirely unhelpful "No such file or directory" with an unfamiliar path you've never heard of. This can be quite confusing and frustrating.

However, once you understand the basics of the filesystem including importantly absolute paths, relative paths, `./`, `../`, symlinks, and the per-process current working directory, these errors suddenly all become trivial to solve.

It's worth spending a few hours mastering this stuff so you can handle it properly once and for all.

### learn how command lines are verbalized

When discussing things in person, on the phone, or over video chat, it helps to have a common understanding of how command line commands are verbalized so your coworker doesn't have to give you keystroke-by-keystroke instructions like your keyboard is the control panel of a Boeing 787.

Pair up with someone and practice speaking command lines to each other and learn to parse what is a command name, which is a command line option, and how some of these odd unix/C abbreviations are pronounced.

Here's a few examples to get you started:

- "make dir dash P temp foo" = `mkdir -p /tmp/foo`
- "L S  temp foo" = `ls /tmp/foo`
- "vee eye etsy profile" = `vi /etc/profile`
- "find dot dash name star dot text pipe to W C dash L" = `find . -name '*.txt' | wc -l`

## Part Three: Enter the Dragon

![Enter the Dragon](https://latimesblogs.latimes.com/.a/6a00d8341c630a53ef0168e87fb4c5970c-600wi)

Here are a few more advanced techniques.

### learn when you don't need sudo

`sudo` is a command that comes with some legacy baggage about what it is, why it is needed, and when to use it. I commonly see beginners try it at random when things don't work. Don't do this. `sudo` let's you run an individual command with full root permissions. You need it when doing sysadmin type things like installing software system-wide, applying security patches, editing core OS configuration files, starting and stopping system services etc. You should NOT need it for doing normal user things like running read-only commands, managing files within your home directory, running programs that are already installed, etc. Read through an [introduction to sudo](https://www.linux.com/learn/tutorials/306766:linux-101-introduction-to-sudo) and get clear on excatly when it is or is not necessary.

### OSX pbpaste/pbcopy

If you work on OSX for development, the `pbpaste` and `pbcopy` commands are convenient bridges from the main OS clipboard ("pasteboard" is what the "pb" stands for) and the command line. For example, if you copy a bunch of text in your editor and want to see how many characters there are, you can run `pbpaste | wc -c` on the command line. Similarly, if you want to copy a program's output you can pipe data into `pbcopy`. For example, I might run something like `npm run lint | pbcopy` if I know that is going to print out a bunch of errors that I want to work through one at a time. I'll then paste it into an empty buffer in my text editor so I can fix each item then delete it's line from my editor buffer until I'm done.

### use short-lived functions and aliases

Many advanced command line users learn to effectively define aliases and shell functions in their dotfiles to improve their productivity. This is a great idea and a programmer's dotfiles can serve as an essential tool as well as a source of pride and the occasional geek contest about whose dotfiles are more sophisticated/ridiculous.

However, one practice I see less often but is also really useful is defining quick aliases or functions just for the current session. I often do this if I know I'll need to run a series of commands over and over in a sequence like edit some code, stop a service, copy new code into place, restart a service. I might quickly define an alias for all those steps like `alias r="cp ./src /deploy && stop myapp && start myapp"`. This lets me focus on a rapid turnaround in my edit/test cycle and makes me more effective.

### share your dotfiles on github

The conventional name for the repo where your dotfiles live on github is just "dotfiles" and by searching around you can find and study how others use the shell. It feels a little bit like getting a tour of someone's workshop and you can readily see people's styles and preferences. Perhaps the most famous repo is [Mathias Bynens dotfiles](https://github.com/mathiasbynens/dotfiles) with over 11K stars on github.

### use long options in shell scripts for readability

When typing interactive commands, brevity is good for speed and convenience. However, when you are writing a script that is getting checked into source code management as part of a project, consider using the long options. This will make it easier to read the script and understand what it does for the maintainers, who are unlikely to be as intimately familiar with every command your script runs as you were when you wrote it.

So instead of:

    curl -b 'active=1' -D /tmp/foo \
      -e http://example.com -O http://example.com

Code it as:

    curl \
      --cookie 'active=1' \
      --dump-header /tmp/headers.txt \
      --referer http://example.com \
      --remote-name \
      http://example.com

The longer names will tend to be easier to understand without referring to the documentation. The backslash-continued lines also help with readability.

## references and further reading

- My [dotfiles on github](https://github.com/focusaurus/dotfiles). Feel free to study and mine for snippets.
- [Tim Pope's dotfiles](https://github.com/tpope/tpope). Maybe yours would look like this if you had written a hundred vim plugins
- [Github dotfiles repos sorted by most stars](https://github.com/search?o=desc&q=dotfiles&s=stars&type=Repositories&utf8=%E2%9C%93)
- [Bash Emacs Editing Mode Cheat Sheet](http://www.catonmat.net/download/readline-emacs-editing-mode-cheat-sheet.pdf) by Peteris Krumins who writes [an outstanding blog with incredible unix expertise](http://www.catonmat.net/)
- [The Unofficial Bash Strict Mode](http://redsymbol.net/articles/unofficial-bash-strict-mode/)
- [Jessica Dillon's great command line tutorial series](https://quickleft.com/blog/tag/command-line/) on the Quick Left Blog
- [Shell Check](http://www.shellcheck.net/) shell script linter
- [Bash Automated Testing System](https://github.com/sstephenson/bats)
by Sam Stephenson
- [Oh My Zsh](https://github.com/robbyrussell/oh-my-zsh) Popular plugin system for customizing zsh
