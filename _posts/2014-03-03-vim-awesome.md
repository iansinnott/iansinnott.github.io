---
title: "Vim: It's Awesome"
layout: post
comments: true
dsq_thread_id:
  - 2349626206
categories:
  - development
  - tech
  - web
---

I've done a few posts on Vim before, but I realize how little I really knew about Vim as I wrote those posts. Lately I've taken the time to actually learn quite a bit of Vimscript, enough to finally start opening up the true power of Vim. I can customize *anything I want* and create all sorts of new behavior in the editor. But it's really true what many people have said over and over again&#8230;

## There's a learning curve

I would say at the very least it's taken six months to get proficient in Vim. It could certainly be done in less time, but if you're actively working on client projects you will find it hard to open up an editor you don't yet know and be really productive.

<!--more-->

### Modal editing is easy

> I've heard learning the default mappings is sheer pain!

Learning how to use the well-known `hjkl` keys for navigating around the document is surprisingly easy to learn. It just takes a bit of muscle memory, so by disabling your mouse and directional keys anyone could pick this up fairly quickly. I think it took me about two weeks of on-and-off practice, because again, if there's real work that needs to get done it's not practical to spend 90% of your time learning to navigate the document and only 10% actually coding.

> I've used Vim a bit, and became fairly comfortable with simple motions, but it's still slow! Why does anyone like this&#8230;

So if the mappings are actually easy to learn, what's the catch?

### Vimscript

Modal editing is indeed the foundation of Vim's amazing usability, but the true core of it's appeal to so many programmers is it's customizability. That's where Vimscript comes in. If you really want to make your editor do your work for you then you'll need to learn at least a bit of Vimscript. [Steve Losh][1] has written an amazing (and free) [book on Vimscript][2].

## Being Super Productive

So what does Vimscript allow you to do? **Anything**. At least anything I've had a need to do. Here are a few examples:

* Type `,!` to put `!important` at the end of a css declaration.
* Type `,{` to go to the closing brace of the current function or block
* Type `,;` to add a semicolon to the end of the current line

These sorts of mappings are all in addition to *super* useful functionality that comes either from core Vim or from plugins. An example is the epic [Surround][3] plugin by Tim Pope. That let's you do things like this:

* Type `ci'` to delete everything within two single quotes (`'`) and start typing. This is super useful for change CSS classes, where there are often more than one space-separated classes that need to be changed.

### Ongoing benefits

The beauty of knowing enough Vimscript to create all the functionality I want is that I no longer have to wish my editor had a certain feature. The instant I realize something could be improved all I have to do is open up a new window and write a bit of code. This level of customization is truly necessary for most developers, and I myself could never go back to using a standard editor now that I have all this custom functionality at my fingertips.

GitHub recently released a [new text editor called Atom][4] that aims to be the best of both worlds. In their own blog post, they even point out the existing polarized nature of text editors: Either they are easy to use, and provide great functionality out of the box (TextMate, Sublime, most IDEs, etc.), or they provide very little of standard text editor functionality out of the box, but are extremely customizable (I.e. Vim and Emacs). I haven't used that new editor yet, but I certainly hope they can achieve their goal. It would be nice to be able to script my editor with JavaScript instead of Vimscript&#8230;

But as it currently stands, there really isn't much in the middle. As a friend of mine recently said, if you're using Vim or Emacs you get a lot of customizability but:

> You bacically have to write your own editor.

[1]: http://stevelosh.com/
[2]: http://learnvimscriptthehardway.stevelosh.com/
[3]: https://github.com/tpope/vim-surround
[4]: http://atom.io
