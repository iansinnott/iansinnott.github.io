---
title: WordPress Needs Better Automation
dsq_thread_id:
  - 2086620445
categories:
  - Uncategorized
---

It's occurred to me time and time again that I don't write as much as I should. In fact I think I even wrote up a short post about that some time back. Anyway, another thing that's been on my mind lately is the friction that comes from small tasks that keeps us (or at least me) from completing larger tasks.

In the case of WordPress, there is far too much friction associated with creating new posts on a regular basis. As a programmer, I have come to despise most interfaces that require me to carry out repetitive tasks myself when they could be easily automated. I'm talking about things like:

* Open browser, head to my site login page
* Ideally I'm already logged in, but more likely I need to login again
* Spend a few seconds remembering my password
* In the WP dashboard, click on New > Post
* Copy and paste the title from the blog post I just finished
* Copy and paste the content as Markdown into the WP editor
* Hit publish

<!--more-->

That's the basic procedure when it comes to creating a new post, at least for me. The issue is that most of this is really repetitive and shouldn't require my attention. Ideally I could type a command in Terminal, something like:

```
wp post awesome-blog-post.md
```

Then it would just shoot of to my server and post for me. If I could do this I would write more. I know for a fact that this automation friction is keeping me from posting more on my blog.

Using a terminal command would mean I could just store my blog's URL, my username and my password in a local configuration file and everything would work, every time. Another massive time-saver would be not having to wait for page loads as I navigate the WP admin.

So I've concluded **WordPress needs better automation**.

## There are better ways&#8230;

I'm aware that there are much better platforms for blogging out there, or at least more suitable for a programmer's workflow (definitely [jekyll][1], maybe [Ghost][2] as well). In fact I plan to change my blog setup next time I do a site redesign. But that's a relatively large project to undertake in say, 20 minutes. So I haven't made the switch yet.

## An opportunity

So in the end I've also come to the conclusion that this would be something very useful to build myself. Since I recently started using Ruby this could be a good opportunity to make something useful from scratch with the language. Still, the same reason I haven't switched blogging platforms hasn't changed: where does one find the time&#8230;?

[1]: http://jekyllrb.com/
[2]: https://ghost.org/
