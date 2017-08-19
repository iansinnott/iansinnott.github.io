---
created: '2013-08-09T07:00:00.000Z'
published: '2013-08-09T07:00:00.000Z'
title: Learn Vim & Code Like a Boss
dsq_thread_id:
  - 1585683628
tags:
  - tech
  - web
  - code
  - productivity
  - vim
---

## Learn Vim and remove the trackpad from your workflow

Since your here, you probably alredy want to learn the amazing editing software that is Vim. But if you haven't yet decided to take the plunge, here are three reasons to start *today*.

1. Code Faster, better and maybe even stronger.
2. Code easily on any system.
3. Understand the command line (you will need it later)

This article is also the base for an upcoming article on being insanely productive on a Mac and eliminating the trackpad from your workflow (almost) entirely.

> But Ian, isn't Vim a productivity killer for new users?

**No.** Vim only hurts productivity if you are very hardcore about learning the esoteric commands as quickly as possible. People assume learning Vim involves a mandatory dive into the deep end. That's *not true*, and I'm going to show you why.

## Quck setup (Updated)

1. Download [Sublime Text][1]
2. Either [enable vintage mode][2] or install the [Vintageous plugin][3]

<!--more-->

Enabling Vintage mode in Sublime involves a very quick edit to your user preferences file. See the link above for the official instructions. Vintageous is actually better, but I believe it's only compatible with Sublime Text 3, so to install it you have to manually bring it into your Plugins folder for ST3. The creator gives good instructions on his GitHub page. If you know git already this is super simple to set up.

**Note:** You can of course use the real Vim if you prefer, but having access to a full on text editor makes the transition much easier and keeps you from loosing productivity during the transition. Another option for Mac users is [MacVim][4]. I've never used it but heard good things.

**Update:** The people over at Square recently published a great Vim starter kit for those who want to get set up very quickly with the real thing. If you're interested in learning Vim in it's native environment, check out <a href="https://github.com/square/maximum-awesome" title="Maximum awesome by square" target="_blank">Maximum Awesome</a>.

## Let's get started with movement

Movement in Vim is accomplished a number of ways. The most simple way is using the keyboard equivalent of the directional keys (I know the directional keys are technically on the keyboard as well, but you will be training yourself not to use them. Just bare with me!).

**Quick Note:** To switch modes between normal and insert mode use the `Esc` and `i` keys. I'm just mentioning offhand in case you feel the need to switch modes immediately. I'll cover modes bellow, just know that you must be in 'normal' mode to move with the keys.

### Vim Directional Keys

* `h`, `j`, `k` and `l` equate to left, up, down and right respectively.

If you're following along, try it out. It will feel strange at first.

**Here's a tip:** Don't take your fingers of the keys they would usually rest on (`jkl;`). You may initially think you need four fingers on the four directional keys, but you don't. You will find that reaching over with the index finger when you need `h` is not that great a challenge.

That's cool right? No? I agree. It's slow, but you will probably only use `h` for minute movements of the cursor to the left. You will be surprised how little you actually need it, once you know the rest of the movement keys. Now let's talk about the faster ways of getting around.

### Words, line-search and text-search

To navigate forward or backward word-wise, use these three keys: `w`, `e`, `b`.

These all have built in mnemonics to help you keep theme straight.

* `w`: Move forward to the start of the next **word**.
* `e`: Move forward to the **end** of the word.
* `b`: Move **backward** one word.

The capital versions of these, `W`, `E`, `B`, to the same thing but you get bigger chunks of characters with each key press because they use whitespace to differentiate words instead of a set of characters. Don't worry about that for now, you will figure it out without my help.

Ready to get crazy? Use `f` and `t` to jump to a specific character on the current line. Use `;` and `,` to repeat forward and backward.

* `fA`: Moves the cursor to the next *capital A* (`A`) in the line.
* `;`: Move to the *next* occurrence of `A` if that was your last `f` command.
* `,`: Move to the *previous* occurrence of `A` (I.e. do the same search to the left of the cursor instead of to the right).
* `t"`: Moves to cursor to the character *immediately before* the next `"` in the line. `;` and `,` work just the same as with `f`.

`F` and `T` function the same but do the initial search to the left of the cursor. Consequently, using `;` will consider the next occurrence to also be to the left of the current position, while `,` will be to the right. This can sound confusing on paper, but once you use it it will make sense very quickly.

The larger implications of these will become more clear later on once we start **deleting** and **changing** text. For now just know that this stuff is important.

Now the real speed booster: text-search. Use `/` and `?` to search for any string within the current open document (buffer). This is *case sensitive* by default. Don't worry, you can change that later.

* `/class`: Moves the cursor to the *next* occurrence of the string `class`.
* `?id`: Moves to the *previous* occurrence of the string `id`.

If you've used Sublime Text before, these commands function much like the built in 'Incremental Search' functionality, so you may not be floored by this efficiency. Either way, this is Vim so learn it. Now let's change some stuff.

## Changing and deleting text

As you noticed with many of the other keys, Vim likes to give you built in mnemonics where possible. Changing and deleting text are no exceptions to this rule. Use `c` to 'change' text and `d` to delete.

> *Change* text.. ?

Yeah, changing text tells Vim to delete it, and then enter insert mode so you can enter new text. Thus *changing* the text. You could accomplish the same by deleting the text with a movement + `d` and then entering insert mode with `i`. Let's see some basic examples. I'll use an `*` (asterisk) to show you where the is when the command is typed:

* `This is a *blog` : Typing `cw` will '*change* the *word*'.

Since the cursor is at the beginning of 'blog' this would then change the word 'blog'. So if you first type `cw` followed by `house` the new string will look like `This is a house`.

The `c` command really shines in my opinion when you want to change text between two dellimeters. So maybe you have some HTML that looks like:

```
<div class="so many damny classes on this div"></div>
```


But maybe you decided that many classes is a little rediculous and you consolodated the CSS into a single class called `single-class`. Now to apply this class, normally we might use the mouse to select everythign inside those double-quotes. Unfortunately, that's slow. With Vim, we get to use the awesome 'inner' command to select everything *inside* a delimmiter. Here that delimiter is `"`. So if we type:

`ci"` followed by `single-class` get the result we want super quickly:

```
<div class="single-class"></div>
```

> Like a boss!

Yup. This generally works great with things like `(`, `)`, `{`, `}`, `'`, `"` and HTML tags. For that last one, the syntax is `cit`. Think of it as 'change inner tag', and commit it to memory. If you code HTML, XML or anything else with tags, `cit` will become your new best friend.

### Deleting Text

You can often think of the `d` key the same way you think of `c`, except you don't end up in insert mode. Use `d` when you want to delete a group of text but don't necessarily want to replace it right away. In the above example of `cw`, using `dw` instead would have simply deleted the word. I often find `d` works wonders when combined with inline-search using `t` or `f`. Example:

```
$var = func(nested_fun($other_var));
```

Given a line like that above, how would you go about deleting everything after the `=` sign? If you're coding in a language that uses a fairly unique line-ending character like `;` then your in luck. With the cursor in normal mode under the `=`, you can type `dt;` to plow through that nested function nonsense and make room for something new. Speaking of which, if you wanted to change the assigned value of `$var` and wanted to save a step, you could use `ct;`.

[1]: http://www.sublimetext.com/3 "sublime text"
[2]: http://www.sublimetext.com/docs/2/vintage.html "Vintage mode"
[3]: https://github.com/guillermooo/Vintageous "Vintageous on github"
[4]: https://code.google.com/p/macvim/ "macvim"