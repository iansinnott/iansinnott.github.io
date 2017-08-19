---
created: '2014-06-28T07:00:00.000Z'
published: '2014-06-28T07:00:00.000Z'
title: Jekyll Management Like a Boss
---

## Blogging Without Friction

Yesterday I wrote a script to help myself blog more often. This is what it looks like in the terminal:

* Create a new post: `post new [post title]`
* List all of my posts: `post list`
* Search existing posts: `post search [post title]`
* Edit a post: `post edit [partial post title]`
* Publish to this blog: `post publish`


I really like [Jekyll][jek], but having to manually create files with the Jekyll filename format (`YYYY-MM-DD-post-title`) is a bit of a hassle. Clearly you could just do this by hand, but if you're like me and want to automate all the minutia in your life, then that's not going to cut it.

<!--more-->

The other reason I decided to write a script for managing Jekyll was _friction_. Blogging can be fun, but sometimes it's hard to get myself to actually start writing posts. In the past, that was largely because my post-writing workflow looked something like this:

1. Open a new Markdown file
2. Write an amazing post
3. Open a browser, log in to WordPress
4. Use the WordPress UI to create a new post
5. Copy my Markdown from my editor into the WordPress WYSIWYG
6. Hit publish
7. Navigate to the post on the front-end to make sure it looked OK

Steps 3-7 were really causing a lot of friction when it came to writing blog posts. So much so that I still have some posts sitting on my computer that never got published because interacting with the WordPress UI is just too tedious. Here's what my new workflow looks like:

1. In a terminal: `post new Jekyll Management Like a Boss`
2. Write blog post about Jekyll. Save it.
3. Back in a terminal: `post publish`

And done.

Now I have no excuses. If I don't write a post, I can only blame my own lassitude since I now have a super efficient workflow. This is a good thing.

## Why not Octopress

The only existing option for managing a Jekyll blog that I came across was [Octopress][oct]. It's a good project, and I already miss some of its features by not using it, but to me it had one glaring problem: Theming. There is limited documentation on how to theme Octopress, and while there are a bunch of 3rd-part Octopress themes to choose from it's just not good enough. I have nothing against using premade themes, it's just that once in a while you will probably want to change some little thing about the site and if you don't know how it's a real pain.

The other reason I decided against Octopress, is fairly minor, but significant in my mind: The CLI syntax. If you don't know, creating a new post in Octopress looks like this:

```
rake new_post['Post Title']
```

To me that just doesn't make sense, when you can just as easily write a script to do the same thing with much less typing:

```
post new Post Title
```

Octopress certainly does _way_ more than this little script I wrote, and I'm sure those guys knew exactly what they were doing when they designed the CLI the way they did, but it's the little things like that that really make the experience for me so I just decided to write my own.

For anyone interested, you can find my script on GitHub: <https://github.com/iansinnott/jekyll-post>

**Note:** I haven't optimized this script for use on other systems, so it may well not work on Linux or especially Windows. It also won't work on any system without [ Node ][node] installed.

[jek]: http://jekyllrb.com/
[oct]: http://octopress.org/
[node]: http://nodejs.org/