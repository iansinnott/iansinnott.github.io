---
title: 'Integrating Alfred &#038; Keyboard Maestro'
author: Ian
layout: post
permalink: /blog/integrating-alfred-and-keyboard-maestro/
dsq_thread_id:
  - 1965006338
categories:
  - download
  - free
  - tech
tags:
  - alred
  - keyboard maestro
  - macro
  - productivity
---
## One step closer to a mouse-less workflow

I&#8217;m going to show you how to integrate Alfred with the excellent Keyboard Maestro. Why? Because I have a vendetta against my mouse and I&#8217;m constantly finding new ways to remove it from my workflow entirely. To this end, the discovery of [Keyboard Maestro][1] by [Stairways Software][2] was a big win.

### Keyboard Maestro (KM)

Super quick introduction: KM makes it easy to assign almost any Mac action to an easy-to-use trigger. It&#8217;s a great piece of software and is backed by a friendly and accessible developer, Peter Lewis. Seriously, go check it out right now if you haven&#8217;t yet. It&#8217;s free to try.

### Combine & Conquer

So, let&#8217;s be honest: if you you&#8217;re already a Mac power user, you probably have far too many hotkeys rattling around in your brain already. This is especially true if your a developer. KM is an excellent piece of software out of box, but adding more hotkeys to the list of things you must remember might not be the ideal solution. But if we could just name our macros in a memorable way and then call them up at will based on that name we could do amazing things.

**Enter [Alfred][3]**. By combining the functionality of Alfred with the system control of KM you can make your Mac do pretty much anything, *very quickly*.

### Setup

To integrate the two, download the workflow I made for this purpose.

<a class="btn single-post-btn" href="http://iansinnott.com/wp-content/uploads/2013/11/KeyboardMaestro.alfredworkflow-2.zip">Download</a>

You can also [download the source][4] from Github if you feel so inclined. Once you have the `KeyboardMaestro.alfredworkflow` file just double click it to install it in Alfred. Done!

### Usage

Now, as long as you actually have KM installed you can type `km` in the Alfred prompt and then the name of a macro. Here&#8217;s a simple example; I really don&#8217;t like continually typing out my email, so I made a macro for it:

<img src="http://iansinnott.com/wp-content/uploads/2013/11/email.png" alt="email macro" width="460" height="395" class="alignnone size-full wp-image-360" />

Notice that I don&#8217;t even have to assign a trigger to it. This is somewhat of a new feature in KM 6.3, and the reason you must have that version or above. This is a great feature as it leaves room for macros that really deserve their own hotkey and doesn&#8217;t clutter your mind with unnecessary information. Just type `km` into Alfred and then start typing the title of the macro:

<img src="http://iansinnott.com/wp-content/uploads/2013/11/Screenshot_11_14_13_4_38_PM.png" alt="alfred example" width="650" height="179" class="alignnone size-full wp-image-362" />

If I hit enter my email address will be pasted into whatever text I&#8217;m editing. This is great for filling forms online. Another one that is use all the time in this same way is date insertion. I always have to think for a second about what the date is. Luckily KM comes to the rescue:

<img src="http://iansinnott.com/wp-content/uploads/2013/11/date.png" alt="date macro" width="460" height="474" class="alignnone size-full wp-image-359" />

Notice that this one does have a trigger assigned. That&#8217;s because I made this macro before KM 6.3 was released, and still had to assign a trigger to it for it to show up in Alfred. Now if I type `km date` and hit enter, the date will be inserted in the mm/dd/yyyy format. Of course I could also use the trigger I assigned, `date` (that&#8217;s the word date followed by two spaces).

This example also shows two good examples of the power of KM. First, you get set values, like `%NumberDate%` that you can pass in. Second, when you want/need to, you can also assign triggers that are fully independent of Alfred and this workflow.

OK, one last example to show off a bit more functionality. This one is key if you really want to keep your hands off the mouse while working. Check out the following macro:

<img src="http://iansinnott.com/wp-content/uploads/2013/11/upper-left.png" alt="move window macro" width="460" height="492" class="alignnone size-full wp-image-363" />

Now *that&#8217;s* a macro, and also one that KM will create for you if you dig around in the actions menu. What this does is moves the active application window to the upper left quadrant of the screen and resizes it appropriately. I find I do this a lot with finder windows, so being able to do it from the keyboard is great. This also shows more of the deep functionality that&#8217;s present in KM.

To start making your own crazy macros, you should hit the KM docs. I&#8217;ll point you specifically to the [calculations section][5], where you can dive into some of the more obscure functionality (like the `SCREEN` function in the example above). Then from there you can check out the other sections about more general functionality.

**One Last Note:** KM is fully capable of triggering macros by name all on it&#8217;s own. See?

<img src="http://iansinnott.com/wp-content/uploads/2013/11/km-trigger.png" alt="trigger macros " width="460" height="162" class="alignnone size-full wp-image-361" />

So if you&#8217;re not an Alfred user, there is a remote possibility that you can get by with just KM. In fact, if you really wanted to you could probably replicate most of Alfred&#8217;s functionality entirely with KM, but why bother?

The other reason to use these two programs together is the Active community behind Alfred. This community means you can usually find a workflow to help with whatever your looking to accomplish. Community involvement however is much more limited with KM. This is surprising, considering the built in &#8216;Export macro&#8217; functionality. KM does have an [existing macro library][6], but I&#8217;m not sure how many users know about it. That said, this certainly isn&#8217;t a deal breaker. It&#8217;s not difficult to make macros in KM, and there *is* an active community that I think would be happy to contribute macros if there was a well-known, central location at which to share them.

### Conclusion

Keyboard Maestro and Alfred make an amazing combination. If you don&#8217;t have them already, get them now! I myself have just started using it but can already see the benefits. I have a ton more functionality planned with this app that I haven&#8217;t gotten around to implementing (system-wide Vim bindings anyone?). Moreover, as I mentioned before, the developer Peter Lewis is very accessible. When I first showed him how my workflow was inherently limited by KM itself, he added the necessary functionality and shipped it a few days later with KM 6.3! That&#8217;s amazing.

**One last note:** When testing the plugin I was using PHP 5.5.5, which is newer than the standard install on new Macs. If you have any issues with the plugin, Head over to the [issues section of my Github repo][7] and let me know. Later.

 [1]: http://www.keyboardmaestro.com/main/
 [2]: http://www.stairways.com/main/
 [3]: http://www.alfredapp.com/
 [4]: https://github.com/iansinnott/keyboard-maestro-alfred
 [5]: http://www.keyboardmaestro.com/documentation/6/calculations.html
 [6]: http://www.keyboardmaestro.com/main/macro-library
 [7]: https://github.com/iansinnott/keyboard-maestro-alfred/issues