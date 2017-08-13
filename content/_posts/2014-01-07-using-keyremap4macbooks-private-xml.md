---
title: Using Key Remap 4 MacBook's Private.xml
dsq_thread_id:
  - 2096904275
tags:
  - tech
---

Using the KeyRemap4MacBook private.xml mappings can be a bit opaque, so I'm writing this as a reference to myself and anyone else that needs to delve deep into customizing KeyRemap4MacBook (KRMB) by using the private.xml config file. Here are the more important rules:

### Basic private.xml layout

This is an xml file you can start with.

```
<root>
  <list>
    <!-- <item> Tags Go Here -->
  </list>
</root>
```

Note that `<list>` is an optional tag, but I think it's nice for organization within KRMB. Leave it out if you want.

The second basic piece is the `<item>` tag. These represent the checkboxes you can turn on and off from within KRMB. They can contain multiple mappings or `<autogen>` tags. Just remember that everything you put into one single `<item>` will be activated or deactivated together. Here's what they look like:

<!--more-->

```
<item>
  <name>Item Name</name>
  <appendix>Longer, more detailed information about the mapping if necessary.</appendix>
  <appendix>You can add more than one appendix tag</appendix>
  <identifier>private.unique_name_for_item</identifier>

  <!-- Put autogen mappings here -->
</item>
```


Now on to the actual mappings.

### KeyToKey

For mapping one key to another, with potential modifier keys:

```
--KeyToKey--
KeyCode::<key we want to affect>, (optional modifier flags)
KeyCode::<key to fire when pressed>
```

Key to key mappings always take two `KeyCode`s. The first is the key you would like to remap, the second is they key you would like to remap to. Both can take optional modifier flags. The example bellow remaps the curly braces, `{` and `}`, to nothing.

```
<autogen>
  --KeyToKey--
  KeyCode::BRACKET_RIGHT, ModifierFlag::SHIFT_L,
  KeyCode::VK_NONE
</autogen>
<autogen>
  --KeyToKey--
  KeyCode::BRACKET_LEFT, ModifierFlag::SHIFT_L,
  KeyCode::VK_NONE
</autogen>
```

That particular mapping may seem useless now, but these sorts of mappings, i.e. disabling a key by mapping it to nothing, are actually very important. After you come up with new mappings for various keys you should disable their former mappings in this way so that you are forced to retrain your muscle memory.

**Note 1:** KRMB doesn't give you key codes for anything that would normally take a SHIFT to type, so to access anything that needs a shift modifier you just specify it as above. `BRACKET_RIGHT` represents `[`, so the combination of `BRACKET_RIGHT` and `SHIFT_L` is equal to `{`.

**Note 2:** I've only disabled mappings of left shift, because I would never hold right shift while pressing a bracket if I wanted to type a curly brace. However, if do hold right shift and type a bracket a curly brace will be typed. Right Shift and Left Shift are completely separate keys so the above mapping only affects what I told it to: `SHIFT_L`.

### KeyOverlaidModifier

This is the real meat of KRMB and was the real eye-opener for me. This let's us map separate keys to a certain keys &#8216;hold' state as well as a single &#8216;tap'. Here's the syntax:

```
--KeyOverlaidModifier--
KeyCode::<key we want to affect>,
KeyCode::<key to fire when held continuously>,
KeyCode::<key to fire when pressed and released quickly>
```

For example, the Shift keys are essential when typing, but we never tap them once once quickly. They are always held down as modifiers for other keys. This means each Shift key's &#8216;tap' state is essentially wasted. We can utilize this and remap anything we want to that tap, all while preserving Shifts most essential functionality.

What you would want to map to Shift is up to you. Steve Losh recommends mapping `(` and `)` to left and right Shift respectively. I totally agree that parentheses are vital when programming and should be easily accessible, but since I've already reversed my numbers and symbols it's actually quite easy for me to hit `(` and `)` where they are. I also like being able to type them both in one quick rolling motion, since many function calls don't take arguments and look like this: `someFunction()`.

So instead of parentheses, I decided to map `{` and `}`. When writing function definitions or conditional statements these symbols are prevalent in many languages, but they are also very useful outside of coding. On Mac OSX, `Command + {` and `Command + }` are assigned to switching tabs in most apps (Sublime, Terminal, Chrome, etc). So now I can hold Command and hit either left or right shift to navigate my tabs in Chrome (of which there are about 40 at any given time).

So here's what that mapping looks like:

```
<autogen>
  --KeyOverlaidModifier--
  KeyCode::SHIFT_L, ModifierFlag::SHIFT_L,
  KeyCode::SHIFT_L,
  KeyCode::BRACKET_LEFT, ModifierFlag::SHIFT_R
</autogen>
<autogen>
  --KeyOverlaidModifier--
  KeyCode::SHIFT_R, ModifierFlag::SHIFT_R,
  KeyCode::SHIFT_R,
  KeyCode::BRACKET_RIGHT, ModifierFlag::SHIFT_L
</autogen>
```


And now you see why I remapped my `{` and `}` keys to nothing earlier in the post: to train myself to use the shift keys instead.

### ModifierFlag::NONE

One last thing to note about KRMB mappings is the `ModifierFlag::NONE` flag, which let's you keep certain mappings from interfering with others. I think of it a bit like non-recursive mappings in Vim. It means I could map a new key to `,` (not sure why you would, but bear with me), but if you hit `Command + ,` it would still open preferences in most applications.

The example I'm using here isn't going to make sense unless you have read [Steve Losh's post][1] about creating a Hyper key, but here it is anyway:

```
<item>
  <name>Backslash to Hyper on hold</name>
  <appendix>This makes Backslash function as hyper when held, otherwise pipe is fired. This is useful for app launching with hotkeys.</appendix>
  <identifier>private.backslash_to_hyper_on_hold</identifier>
  <autogen>
    --KeyOverlaidModifier--
    KeyCode::BACKSLASH, ModifierFlag::NONE,
    KeyCode::COMMAND_L,
    ModifierFlag::OPTION_L | ModifierFlag::SHIFT_L | ModifierFlag::CONTROL_L,
    KeyCode::BACKSLASH, ModifierFlag::SHIFT_L
  </autogen>
</item>

<item>
  <name>Swap backslash and pipe</name>
  <appendix>This one i'm trying out really, it's not as if I use either of these all that often, but I think writing OR statements happens more often than manually escaping characters. Still, if I was writing a lot of regex I would likely want the backslash back mapped to a single finger key.</appendix>
  <identifier>private.backslash_pipe_swap</identifier>
  <autogen>
    --KeyToKey--
    KeyCode::BACKSLASH, ModifierFlag::SHIFT_L,
    KeyCode::BACKSLASH
  </autogen>
  <autogen>
    --KeyToKey--
    KeyCode::BACKSLASH, ModifierFlag::SHIFT_R,
    KeyCode::BACKSLASH
  </autogen>
  <!--
    This is not needed as the main mapping above takes care of
    sending pipe instead of backslash.
  <autogen>
    --KeyToKey--
    KeyCode::BACKSLASH,
    KeyCode::BACKSLASH, ModifierFlag::SHIFT_L
  </autogen>
  -->
</item>
```


In that example I use ModifierFlag::NONE to allow me to do both a KeyToKey mapping and a KeyOverlaidModifier on the same single key.

### Go off and learn more

You probably have different preferences and needs than me when it comes to how you interact with your computer, so here are some resources you can use to learn more about customizing your system through KRMB:

* <http://stevelosh.com/blog/2012/10/a-modern-space-cadet/>
* <https://pqrs.org/macosx/keyremap4macbook/pckeyboardhack.html.en>
* <https://pqrs.org/macosx/keyremap4macbook/xml.html.en>

### Update 4/28/14

I realized when I first wrote this I didn't link to my own private.xml file for anyone to look at. Here's the link:

* [Private.xml](https://github.com/iansinnott/dotfiles/blob/master/dotfiles/KeyRemap4MacBook/private.xml)

[1]: http://stevelosh.com/blog/2012/10/a-modern-space-cadet/
