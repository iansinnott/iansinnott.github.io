---
title: "Integrating Alfred With Keyboard Maestro"
layout: post
comments: true
dsq_thread_id:
  - 1965006338
categories:
  - download
  - free
  - tech
tags:
  - alfred
  - keyboard maestro
  - macro
  - productivity
---

**Update 7/6/2015:** I've now been using this Alfred workflow for over a year and I still use it _every single day_. It's become vital to my workflow and I highly recommend it to anyone trying to boost their productivity.

However, other parts of my workflow have evolved quite a bit (such as window management). If you're interested in a full post on the subject [drop me a line on twitter][twitter] or leave a comment at the bottom. 

Now back to the original article.

[twitter]: https://twitter.com/ian_989/

## One step closer to a mouse-less workflow

I'm going to show you how to integrate Alfred with the excellent Keyboard Maestro. Why? Because I have a vendetta against my mouse and I'm constantly finding new ways to remove it from my workflow entirely. To this end, the discovery of [Keyboard Maestro][1] by [Stairways Software][2] was a big win.

### Keyboard Maestro (KM)

Super quick introduction: KM makes it easy to assign almost any Mac action to an easy-to-use trigger. It's a great piece of software and is backed by a friendly and accessible developer, Peter Lewis. Seriously, go check it out right now if you haven't yet. It's free to try.

### Combine & Conquer

So, let's be honest: if you you're already a Mac power user, you probably have far too many hotkeys rattling around in your brain already. This is especially true if your a developer. KM is an excellent piece of software out of box, but adding more hotkeys to the list of things you must remember might not be the ideal solution. But if we could just name our macros in a memorable way and then call them up at will based on that name we could do amazing things.

<!--more-->

**Enter [Alfred][3]**. By combining the functionality of Alfred with the system control of KM you can make your Mac do pretty much anything, *very quickly*.

### Setup

To integrate the two, download the workflow I made for this purpose.

<a class="btn btn-download" href="https://github.com/iansinnott/alfred-maestro/raw/master/AlfredMaestro.alfredworkflow">Download</a>

You can also [download the source][4] from GitHub if you feel so inclined. Once you have the `KeyboardMaestro.alfredworkflow` file just double click it to install it in Alfred. Done!

### Usage

Now, as long as you actually have KM installed you can type `km` in the Alfred prompt and then the name of a macro. Here's a simple example; I really don't like continually typing out my email, so I made a macro for it:

![Email Macro](http://dropsinn.s3.amazonaws.com/email-macro.png)

Notice that I don't even have to assign a trigger to it. This is somewhat of a new feature in KM 6.3, and the reason you must have that version or above. This is a great feature as it leaves room for macros that really deserve their own hotkey and doesn't clutter your mind with unnecessary information. Just type `km` into Alfred and then start typing the title of the macro:

![Email macro example](http://dropsinn.s3.amazonaws.com/Screen%20Shot%202015-07-06%20at%209.15.08%20PM.png)

If I hit enter my email address will be pasted into whatever text I'm editing. This is great for filling forms online. Another one that is use all the time in this same way is date insertion. I always have to think for a second about what the date is. Luckily KM comes to the rescue:

![Date macro](http://dropsinn.s3.amazonaws.com/Screen%20Shot%202015-07-06%20at%209.18.19%20PM.png)

Now if I start typing `km date:` and hit enter, the date will be inserted in the mm/dd/yyyy format:

![Date macro example](http://dropsinn.s3.amazonaws.com/Screen%20Shot%202015-07-06%20at%209.19.00%20PM.png)

This example also shows two good examples of the power of KM. First, you get set values, like `%NumberDate%` that you can pass in. Second, when you want/need to, you can also assign triggers that are fully independent of Alfred and this workflow.

To start making your own crazy macros, you should hit the KM docs. I'll point you specifically to the [calculations section][5], where you can dive into some of the more obscure functionality (like the `SCREEN` function for manipulating application screens. Then from there you can check out the other sections about more general functionality.

**One Last Note:** KM is fully capable of triggering macros by name all on it's own. See?

![Keyboard Maestro macro by name](http://dropsinn.s3.amazonaws.com/Screen%20Shot%202015-07-06%20at%209.12.29%20PM.png)

So if you're not an Alfred user, there is a remote possibility that you can get by with just KM. In fact, if you really wanted to you could probably replicate most of Alfred's functionality entirely with KM, but why bother?

The other reason to use these two programs together is the Active community behind Alfred. This community means you can usually find a workflow to help with whatever your looking to accomplish. Community involvement however is much more limited with KM. This is surprising, considering the built in &#8216;Export macro' functionality. KM does have an [existing macro library][6], but I'm not sure how many users know about it. That said, this certainly isn't a deal breaker. It's not difficult to make macros in KM, and there *is* an active community that I think would be happy to contribute macros if there was a well-known, central location at which to share them.

### Conclusion

Keyboard Maestro and Alfred make an amazing combination. If you don't have them already, get them now! I myself have <del>just started using it</del> been using it for **well over a year**. I have a ton more functionality planned with this app that I haven't gotten around to implementing (system-wide Vim bindings anyone?). Moreover, as I mentioned before, the developer Peter Lewis is very accessible. When I first showed him how my workflow was inherently limited by KM itself, he added the necessary functionality and shipped it a few days later with KM 6.3! That's amazing.

**One last note:** If you have any issues with this plugin head over to the [issues section of my GitHub repo][7] and let me know. And if you you find it useful, [starring the repo][repo] on GitHub is a great way to say thanks. Have fun :sunglasses:

 [1]: http://www.keyboardmaestro.com/main/
 [2]: http://www.stairways.com/main/
 [3]: http://www.alfredapp.com/
 [4]: https://github.com/iansinnott/keyboard-maestro-alfred
 [5]: http://www.keyboardmaestro.com/documentation/6/calculations.html
 [6]: http://www.keyboardmaestro.com/main/macro-library
 [7]: https://github.com/iansinnott/keyboard-maestro-alfred/issues

 [repo]: https://github.com/iansinnott/keyboard-maestro-alfred

 [workflow]: https://github.com/iansinnott/alfred-maestro/raw/master/AlfredMaestro.alfredworkflow
