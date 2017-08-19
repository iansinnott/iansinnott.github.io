---
created: '2013-11-07T08:00:00.000Z'
published: '2013-11-07T08:00:00.000Z'
title: Page reloads are a thing of the past
dsq_thread_id:
  - 1944906311
tags:
  - tech
  - web
  - ghost
  - javascript
---

I occurred to me recently as I have been delving deeper into JavaScript and Backbone.js that single-page applications are the future. I say this because when I look back at older web pages they usually have some distinctive characteristics that instantly grant them outdated status. For instance:

* Table-based layouts
* HTML-based styling
* Unresponsive, etc..

I believe full-page reloads will belong on this list before too long.

## No, but seriously

Have you ever used [Ghost][1]? If you haven't, it's a really promising blogging platform that recently got released to the public and has scored six-digit funding on Kickstarter. I'm still using WordPress for this blog, but after a few minutes using Ghost I could say it was a vast improvement. This isn't a review, so I won't get into the specifics except to say that it built with JavaScript, so it runs like an app not a web page.

<!--more-->

## The issue with browser reloads

They are **slow**. That is really all I need to say. I spend a lot of time developing on my local server, where page reloads are as fast as possible, and it still feels slow after a while. Even when all the files are stored locally,there's still an amount of time that must be consumed for the browser to do a reload. And for what? Most elements on a given page, especially a blog, don't actually change from page to page. The header, footer and often the sidebar are all the same page-to-page. So why reload all those assets for nothing? It's a waste.

The other issue is that they are unnecessary. Through the use of AJAX we can accomplish pretty much anything we want on the back-end without actually reloading the page. Just send the necessary information, parse the response and update the page. Simple.

Admittedly this might not be *as* simple as just using page reloads but the user experience would suffer. Look at some of the largest commercial websites right now (Google, Facebook, Twitter, etc.) and see how many make extensive use of AJAX to minimize page reloads. Google's instant search and maps are both good examples. Twitter uses a ton of AJAX on their pages and Facebook, although still making use of numerous page reloads has decreased the number significantly over the years.

## When?

That's hard to say. Terrible websites will always exist, as will websites that inevitably fall into disuse and never get updated, so reloads never disappear entirely. However, the explosion of awesome JavaScript libraries along with the increasing power of online applications is also making it ever simpler to implement advanced front-end functionality. Not to mention the fact that [Node.js][2] now allows anyone to use JS for both the front and back-end.

I'm admittedly not an expert on the nitty-gritty of HTTP requests so if anyone wants to point out an aspect that I'm overlooking, feel free to do so below.

[1]: https://ghost.org/
[2]: http://nodejs.org/