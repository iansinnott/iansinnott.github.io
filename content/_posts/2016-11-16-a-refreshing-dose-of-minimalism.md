---
title: A refreshing dose of minimalism
tags:
  - javascript
date: 2016-11-16 21:00:43
---


Today I finished rebuilding my blog using Hexo (see last blog post for details). It's a blog, so I knew I wouldn't need too much JS. I started with a blank file and started coding.

Once I was satisfied with the event handling logic I had set up I sat back and reviewed my work. 44 lines including a few comments and zero dependencies. Not too bad. The web has come a long way. CSS was able to take care of a lot of the interactions and animations. But I still wanted to do better.

It occurred to me that I could actually use the `:hover` state to accomplish all of my open/close menu interactions. Done! A few more lines eliminated. But I still had the `focus` event handler I was using to select all text in a text box whenever a user put their cursor inside it. I don't think CSS can do that... so I did end up using JS for this. I took it out of my script file and in-lined it on the input directly.

That was the last event I was handling so now I scrapped my whole JS file with its event logic. Wow! No external JS file. How novel... 😕.

All in all here is the extent of the JS I wrote for the site:

```js
this.setSelectionRange(0, this.value.length);
```

---

**Aside:** I'm certainly not against large web apps—on the contrary, I love them. But for this particular project I chose to revel in the minimalism of leveraging CSS to handle almost all of my site interactions.
