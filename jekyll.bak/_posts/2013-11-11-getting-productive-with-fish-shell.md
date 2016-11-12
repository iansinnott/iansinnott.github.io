---
title: Getting Productive With Fish Shell
layout: post
comments: true
dsq_thread_id:
  - 1953644511
categories:
  - tech
  - web
tags:
  - bash
  - fish shell
  - productivity
  - shell
  - terminal
  - workflow
  - zsh
---

Today I took it upon myself to try out the very new and very cool looking [Fish Shell][1]. This is the second time I have taken it upon myself to really dive into the customization of my Terminal and after the fact I'm left with much the same feeling as the first time: I feel like I didn't get anything done today.

This experience made me think a bit about a certain habit I have to get really dive into my workflow and try to find areas that are lacking or could be more efficient. The first time I did this was after watching a great [tutorial by PeepCode][2] on the advanced ways I could use the command line. The whole video was about how to use [Bash], and then at the very end they recommend that those who want more serious customization should check out something called [Z shell][3].

That recommendation led me on an all-day adventure learning Z shell customization. The real killer feature of Z shell actually turned out to be the community involvement, and the GitHub users who were putting out easy-to-use plugins for the esoteric shell. The project is called [oh my zsh][4], and it's a great place to start for anyone who wants a more usable terminal.

The point being, there was recently an announcement on Hacker News that someone had started a [similar project][5] for this new shell called Fish. As soon as I saw that, a big chunk of my time for the day went out the window. I knew if I started looking into the code and the various customizations I would lose many hours of the day, but I couldn't resist. I LOVE improving my workflow.

<!--more-->

## One shell to rule them all

Like most developers I spend a lot of time in the Terminal, and it can be a pain. Fish shell actually offers code-completion in the terminal as you type. This is a step up from Z shell which would offer decent tab completion but would not print out suggestions for you as you type. What's not great about Z shell is that much like bash customizing it can be a real pain. Fish on the other hand simplifies customization by making everything a function, and making functions easily definable. Here's an example of one I use often with Git:

```
function gg -d "Commit all"
  git commit -v -a -m "$argv"
end
```

The first line defines the function `gg`, and then is passed the optional description option `-d`. This isn't really important, but it provides a nice and easy way to add a bit of text to remind yourself what the hell these two letters do. When you type `gg` into the command line and hit tab this description will pop up next to it. Anyway, the second line is easy, it's just a git command with a few options passed. The only part that has to do with Fish shell is the `$argv` variable which is a &#8216;list' of arguments that you pass. In this case I wrap it in `"` (double quotes) so that I don't have to do that myself. The third line just ends the block. Now I can type something like this:

```
git add .
gg Initial Commit
```

And my commit is done without having to type the usual annoying `"` or `-m`.

What's also great though, is that Fish shell comes with a predefined function called `alias` that supports the exact same syntax you used in Bash or Z shell. So for all those aliases sitting in your old config file you can just copy them over and be done. Or if you don't have any incompatible code in your alias file (i.e. bash or zsh functions) that would cause things to break, then just source it using the `.` syntax. Sidenote: Fish doesn't seem to support the familiar `source` keyword, you have to use the shorthand `.`.

## Caveats

Two things I've noticed so far that I'm not super thrilled about:

* Often have to type `cd` to change directory
* No official support for Vim-like editing on the command line

That first one is probably customizable somehow but I just didn't put time into figuring out how. It's a feature of Z shell that you can choose to omit `cd` before typing out a directory name and it will know what you mean.

The second one isn't a huge issue either, because Vim integration with the command line doesn't actually provide any massive boost to productivity or usability. It's nice, to be sure, but Vim really shines when editing longer documents. When using the command line I don't make many typos so most of what I'm doing is entering text not editing it.

The second one isn't a huge issue either, because Vim integration with the command line doesn't actually provide any massive boost to productivity or usability. It's nice to be sure, but

## Conclusion

So that's it. My experience so far has been good, and hopefully all the time I spent today customizing this will pay off in future productivity.

[1]: http://fishshell.com/
[2]: https://peepcode.com/products/advanced-command-line
[3]: http://en.wikipedia.org/wiki/Z_shell
[4]: https://github.com/robbyrussell/oh-my-zsh
[5]: https://github.com/bpinto/oh-my-fish
