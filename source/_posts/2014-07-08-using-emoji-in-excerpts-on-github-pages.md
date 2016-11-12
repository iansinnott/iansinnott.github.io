---
title: "Using Emoji in Excerpts on GitHub Pages"
---

## Here's how to get GitHub emoji working in post excerpts

As I was redesigning my blog recently I decided I wanted all the emoji in all of the places. That's not usually a problem on GitHub pages. Seriously, they even have [an official page about it.][gh]. But if you want emoji in your post excerpts, you will have a problem.

[gh]: https://help.github.com/articles/emoji-on-github-pages

GitHub pages only support emoji in post or page content. In theory, that should really apply to excerpts as well, but for some reason it does not. Here is what emoji looked like on my site before:

<div></div>
<div></div>

![Broken GitHub Emoji]({{ site.image_dir }}broken-emoji.png)

The problem was this line of code which uses Jekyll's built-in excerpt feature:

```
{{ "{{ post.excerpt "}}}}
```

The solution? Generate your own excerpts directly from the content using Jekyll's built-in helpers:

```
{{ "{{ post.content | truncatewords: 50 "}}}}
```

Thank goodness that worked, I thought I was going to have to move away from GitHub pages. If you want to be able to play around with the excerpt length easily without editing `index.html` you can also add it as a [custom variable][cv] in `_config.yml`:

[cv]: http://jekyllrb.com/docs/variables/

```
# In _config.yml...
excerpt_length: 100
```

Then in `index.html`:

```
{{ "{{ post.content | truncatewords: site.excerpt_length "}}}}
```

This is the approach I took because it feels cleaner to me, but use whatever works for you. That's all, hope this helps :sunglasses:
