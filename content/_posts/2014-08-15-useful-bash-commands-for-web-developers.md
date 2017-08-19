---
created: '2014-08-15T07:00:00.000Z'
published: '2014-08-15T07:00:00.000Z'
title: Useful Bash Commands For Web Developers
---

I recently found myself tutoring a friend in the ways of the command line and thought I'd write a quick post about it. Being comfortable with bash (or some other shell) isnt necessarily a prerequisite for web development, but it certainly makes the process smoother and more enjoyable. For anyone just starting to learn the command line, here are a few useful tips:

#### The Basics

- `cd`: Short for 'change directory'. This is probably the command you will use most often until you decide to [do away with it altogether][autocd].
- `pwd`: Think 'print working directory'. This outputs the path to your current working directory.
- `ls -laG`: Display the contents of the `pwd`. The common form of this command, `ls`, really isn't very useful in my opinion, so skip it and go straight for this useful directory listing command. Alias it to something shorter like so: `alias l='ls -lahG'`.

[autocd]: http://stackoverflow.com/questions/890086/bash-blank-alias-to-cd

#### Directory Shortcuts

You don't always have to type a full path to get where you want to be.

- `~`: Home directory. Ex: `cd ~`.
- `.`: A single period. Present directory, i.e. `pwd`. Ex: `ls -la .`.
- `..`: Two periods. Parent directory.
- `-`: Hyphen. The previous directory. Ex: `cd -` is like saying 'Go Back' in bash.

This is all really basic stuff, but if you're like me you likely put off learning it for a while because it's not absolutely essential to building awesome apps. That being said, once you find yourself tweaking your won servers or deploying to someone elses you will be much happier if you are comfortable with the command line.