---
created: '2013-06-15T07:00:00.000Z'
published: '2013-06-15T07:00:00.000Z'
title: The WP_Post Object
dsq_thread_id: 1402742612
tags:
  - web
  - php
  - theme development
  - wordpress
  - wp
---

This is a quick reference for myself and anyone else who commonly uses the WP_Post object in WordPress. I find that I often forget exactly what attributes this object has so I finally decided to just make a post about it and save my future self having to dump the var to remember. Here it is:

<!--more-->

```
WP_Post Object
(
  [ID] => 252
  [post_author] => 81
  [post_date] => 2013-06-13 09:27:19
  [post\_date\_gmt] => 2013-06-13 09:27:19
  [post_content] =>
  [post_title] => Mac Mall, 1be/5ba
  [post_excerpt] =>
  [post_status] => publish
  [comment_status] => open
  [ping_status] => open
  [post_password] =>
  [post_name] => mac-mall-1be5ba
  [to_ping] =>
  [pinged] =>
  [post_modified] => 2013-06-13 09:27:19
  [post\_modified\_gmt] => 2013-06-13 09:27:19
  [post\_content\_filtered] =>
  [post_parent] => 0
  [guid] => http://orangefinders.dev/listing/mac-mall-1be5ba/
  [menu_order] => 0
  [post_type] => listing
  [post\_mime\_type] =>
  [comment_count] => 0
  [filter] => raw
)
```

This is the result of calling `print_r()` on a `WP_Post` object. Enjoy.