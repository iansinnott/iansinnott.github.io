---
title: Migrating from Jekyll to Hexo
tags:
  - blog
  - javascript
---

**TL;DR:** I migrated my blog from Jekyll to Hexo. This is everything you need to know to do the same.

## Initializing Hexo in your existing Jekyll project

Here's what I did:

Back up your existing Jekyll blog to a subdirectory so you can wildly make changes with impunity:

```bash
mkdir jekyll.bak
```

Now move all the non-git files in the directory into `jekyll.bak`. Initially I just did it in finder, but then I got curious about how to do it in bash. So if you want to just run a nifty command here you go:

```bash
find . -maxdepth 1 -mindepth 1 ! -name '.git' ! -name 'jekyll.bak' -exec mv '{}' ./jekyll.bak/ \;
```

<!-- more -->

We keep the `.git/` dir around so that we can cleanly iterate towards a Hexo blog from our Jekyll blog while maintaining all previous version control history. However, the `hexo init` command actually removed `.git/` on my system so we need to move it too, but only temporarily:

```bash
mv .git .git.bak
```

Now initialize Hexo in your project directory:

```bash
hexo init .
```

This should have left `jekyll.bak` and `.git.bak` intact while adding a bunch of new files. Now it's safe to bring back your Git history and add a commit:

```bash
mv .git.bak .git
git add .
git commit -m 'Add Hexo boilerplate'
```

Now we've succesffully initialize Hexo. From here on out everything we do will to customize Hexo to suit our needs.

To make sure everything is running properly run the dev server:

```bash
hexo server
```

## Migrating Content

Now let's get all your blog posts migrated over to the new system. When running the server you should see the Hello World post as your first post on the homepage. You will also see the default Hexo theme. Here's what that looks like:

![Default hexo blog](http://dropsinn.s3.amazonaws.com/Screen%20Shot%202016-11-12%20at%203.09.34%20PM.png)

That "Hello World" post is the only post in your blog. Hexo keeps all your posts at `source/_posts`. Let's remove the default post.

```bash
rm source/_posts/hello-world.md
```

Now, since Hexo and Jekyll are very similar in how they store your posts it's very straightforward to migrate all your content. First, copy it all over. If you also used `jekyll.bak` to backup your original blog then you can do this:

```bash
mv jekyll.bak/_posts/* source/_posts/
```

Second, update your Hexo settings to recognize Jekyll-style post filenames. In `_config.yml` edit the line for `new_post_name`:

```yaml
new_post_name: :year-:month-:day-:title.md # File name used to identify posts
```

Now restart the Hexo server and you should see all your content :sunglasses:

## Gripes

Hexo is not without its shortcomings. I'll outline those here, but take this with a grain of salt because I just started using Hexo yesterday so it may be that my gripes are due to lack of understanding rather than actual problems with the framework.

### Not simple to create standalone pages

Hexo is highly content focused, meaning when you create a new "page" you are actually just creating a new Markdown file with some content. In my experience the "content first" approach is perfectly suited to blog posts, but not necessarily to pages which are often unique in layout.

For example, I wanted to create a `/tags` page. This is simple enough using the Hexo API in a layout file:

```erb
<% site.tags.each((tag) => { %>
  <a class='tag' href='<%= url_for(tag.path) %>'>
    <%= tag.name %>
  </a>
<% }) %>
```

But I wanted to be able to do this on one single page. I.e. instead of writing markdown I wanted to write the above code and output all my tags. This didn't work, so I ended up creating a workaround where my `tags.md` file does nothing more than specify the layout I want to render.

```
---
title: Tags
layout: tags
---
```

This may seem minor, but I would have liked to be able to simply put the above EJS code into my "page" file and had it render.

## Development Takeaway

Only one really: If you want to create custom pages then create a new layout file with the desired name (say `about.ejs`) and then specify that layout file in the post/page markdown file:

```
---
layout: about
---
```

## Why

I've been meaning to redo my blog for a while. Jekyll does it's job quite well, but I never liked liquid templates and my existing blog has needed some work for quote some time. For example, code snippets when rendered in post excerpts sometimes caused unclosed `<pre>` tags, which would really mess up rendering for the whole index page.

Also, JavaScript. I write it all the time so it makes sense to use it for my blog. I also like the emphasis out of the box on Stylus as opposed to Sass or Less.

Lastly, a good friend of mine recently told me he uses Hexo for his blog. Personal recommendations go a long way.

## Outcome

So far I've been quite happy. Things I like:

* Drafts
* CLI for creating content
* Simple, multi-language support
* Powered by JavaScript
