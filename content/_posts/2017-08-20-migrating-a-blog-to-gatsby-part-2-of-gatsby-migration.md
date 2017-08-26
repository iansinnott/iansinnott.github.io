---
title: Migrating a blog to Gatsby (Part 2 of Gatsby migration)
created: 2017-08-21T06:53:54.533Z
published: 2017-08-21T06:53:54.533Z
---

# Migrating a blog to Gatsby

**NOTE:** This is part 2 of the Gatsby migration series. You can find part 1 here: [Migrating to GatsbyJS Part 1](http://blog.iansinnott.com/migrating-to-gatsbyjs-part-1/).

**Abstract:** Gatsby is a great tool for building a blog. In part 1 did the more simple task of migrating an existing React site to Gatsby. This time I migrated my blog, which was a lot more involved and involved a lot more Gatsby-specific knowledge.

Here's the gist of what I'm going to cover:

* Preparing an existing blog for migration
* Configuring Gatsby to handle markdown
* Querying your markdown files using GraphQL
* Adding custom data to the generated GraphQL schema
* Turning all your markdown files into static pages

Let's jump in.

## Preparing your existing blog for migration

Let's move some files around. Gatsby gives you a good amount of flexibility when it comes to file structure, but for consistency with the docs I'm going to use their suggested file structure for migrating my blog. How you handle this step will depend on what you're migrating from. I am migrating form Hexo, which is very similar to Jekyll in how it structures files.
