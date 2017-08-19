---
created: '2015-01-26T08:00:00.000Z'
published: '2015-01-26T08:00:00.000Z'
title: Use RedCarpet to Render Markdown
---

Most of the markdown I write ends up on GitHub, so when I preview my markdown I on my computer I like it to look _exactly_ like it will once I push it live to some repository. I also like to use the excellent [Marked][marked] app to preview my markdown. Unfortunately, even though Marked claims to support [Github Flavored Markdown][gfm] (GFM) it leaves some features out. I'm not going to blame Marked for the incomplete implementation of GFM, they outsource the processing to [Discount][discount], so it's probably not their fault. But certain features of GFM, like nested lists, are really useful so I decided to switch to [RedCarpet][rc], since that is the Gem GitHub itself uses to parse READMEs.

So, for anyone else who runs into the issue of Marked's incomplete GFM support, simply install `redcarpet` and use it as a custom processor:

```
sudo gem install redcarpet
```

In the "Advanced" section of Marked's preferences you can find the custom processor section:

![Custom Marked Processor](https://dropsinn.s3.amazonaws.com/Screen_Shot_2015-01-26_at_2_26_54_PM.jpg)

**Note:** You _might_ have to click the "Update Permissions" button since Marked may not have read access to wherever you're `redcarpet` executable is located.

Once you've added the custom processor you should get a little nondescript button near the lower right-hand side of your Marked windows:

![Custom processor button in Marked](https://dropsinn.s3.amazonaws.com/Screen_Shot_2015-01-26_at_2_27_38_PM.jpg)

If you click that button you should now get markdown rendered through your custom processor! Nice 😎

Hope that helps anyone who ran into the same problem I did.

[marked]: http://marked2app.com/
[gfm]: https://help.github.com/articles/github-flavored-markdown/
[discount]: https://github.com/Orc/discount
[rc]: https://github.com/vmg/redcarpet