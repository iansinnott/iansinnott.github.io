---
layout: post
title: "Setting Up Hydra Config on A Mac"
comments: true
---

## I Set Up Hydra to Minimize my Dependence on a Mouse

_This post is about moving one step closer to a mouse-less workflow, where any command can be accomplished trivially from the keyboard._

I discovered [Hydra][hy] through Hacker News earlier today, and it's almost everything I could wish for in a window management tool. My new setup allows me to manage windows somewhat like you see in the image bellow:

[hy]: https://github.com/sdegutis/hydra

![Keyboard Window Management]({{ site.url }}/public/images/hydra.gif)

If you interested, [here's the source][source] to make Hydra work like you see in that image. But if you're like me, you will probably want to customize everything, so here's a quick tutorial on how to do that.

## init.lua

If you just downloaded and installed Hydra, you will need to create an init file
at `~/.hydra/init.lua`. This file will be read every time the app opens and any time you explicitly tell Hydra to reload its configuration.

I would recommend copying in the sample file that Hydra will load if there is no init file present. That file is a great reference for both the Hydra api and Lua.

### Lua

If you have no experience with Lua and want to set up some extreme window commands with Hydra don't worry. It turns out Lua is a pretty simple language. At least simple enough to write Hydra configuration quickly and effectively. I had absolutely no experience with Lua before today and now I have an effective Hydra setup. To me, Lua's syntax feels like a bit of a middle ground between Javascript, Ruby and Bash.

## Hydra API

Hydra exposes a few useful global variables for you, but in my coding the most useful by far was `window`. Everything in my config files started with `window`, so that's what I'll cover here. Here is a snippet to grab the active frame and the screen:

```lua
local win = window.focusedwindow()

-- If no focused window, just return
if not win then return end

local winframe = win:frame()
local screenframe = win:screen():frame_without_dock_or_menu()
local newframe = {
  x = winframe.x,
  y = winframe.y,
  w = winframe.w,
  h = winframe.h,
}

-- [Do stuff to newframe before setting it]

win:setframe(newframe)
```

That is a basic boilerplate for most things you would need to do with the active window in the active screen.

### Frames

Not sure if the term 'frame' is preexisting or if it is just something coined by the author of Hydra, but what it really means to the rest of us is a window. This can be confusing since `window` is itself a global variable and it is used to retrieve the active (or focused) frame. Basically, when you manipulate a frame you are manipulating that 'window' in finder. When you resize a finder window with the mouse you are also manipulating a frame. To focus a frame, or make it active, just click on it or use the usual command tab.

### Screens

In this post whenever I say screen, I will mean the result of calling:

```lua
window.focusedwindow():screen():frame_without_dock_or_menu()
```

That `frame_without_dock_or_menu` method is key, because it returns a rectangle that represents the 'usable' part of your screen. That means everything except the top menu bar and the doc (if it's visible). This is important because people can put their doc wherever they like (left, bottom, right) but this function will always return the correct rectangle representing the usable portion of the screen.

Screens also have a second feature. This is a feature I never had a use for so I didn't explore it, but as far as I can tell these are 'Spaces' on a Mac. So if you use a ton of different spaces in your workflow this would be a good place to do some optimizing.

## Example

That's pretty much all you would need to know to get started. Here some gists taken directly from [my own dotfiles][dotfiles]

[dotfiles]: https://github.com/iansinnott/dotfiles/tree/master/dotfiles/hydra

First off, my init file which binds resize and window motion commands to a 'meta' key, which I defined as cmd+shift:

{% gist iansinnott/2cbecf87d9273a0d5918 %}

I put most of the actual logic in a separate file to keep things tidy:

{% gist iansinnott/0c9a0dcba88e6d0de0e5 %}

That's all. Feel free to leave a comment if there's anything you would add. So far this has been all I need to keep my hands on the keyboard.
