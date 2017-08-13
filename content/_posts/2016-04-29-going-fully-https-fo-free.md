---
title: "Going fully HTTPS (SSL) fo' free"
tags:
  - security
---

A few weeks ago I moved [my website][] over to HTTPS.

![iansinnott.com using https](//dropsinn.s3.amazonaws.com/Screen%20Shot%202016-04-29%20at%2011.08.19%20AM.png)

Then, yesterday I moved my [blog][] over to HTTPS.

![blog.iansinnott.com running on https](//dropsinn.s3.amazonaws.com/Screen%20Shot%202016-04-29%20at%2011.07.41%20AM.png)

This now means that my two primary web properties are both using SSL, and one of them was completely free to set up.

<!-- more -->

## Free SSL with LetsEncrypt

If you want SSL on your site for free there's a new certificate authority called [LetsEncrypt] which is completely free! 👏 This is excellent news, and definitely an option for you, especially if you're managing your own server.

My main site, iansinnott.com, actually uses LetsEncrypt under the hood through [Netlify][], but it's not exactly free because I do pay [Netlify][] to host my site every month.

However, LetsEncrypt is not what I'm talking about today. I just discovered something super cool which is currently letting my host my blog, a [GitHub Pages][] site, using SSL.

## All the SSL fo' free using CloudFlare

It turns out if you use [CloudFlare][] for DNS on your domain you can also get SSL completely for free.

![CloudFlare Free Cert](//dropsinn.s3.amazonaws.com/Screen%20Shot%202016-04-29%20at%2012.43.40%20PM.png)

The setup is pretty simple as well. CloudFlare has the excellent feature that they will scan your domain and migrate most of the DNS settings for you. So all I ended up having to do to get blog.iansinnott.com running over HTTPS was to move my DNS to CloudFlare. The DNS propagation took overnight, but the time I had to personally spend was less than 30 minutes.

Again, this is completely free, which is why I'm happy to write about CloudFlare and give them what amounts to free advertising. I'm guessing they make their money with enterprise clients as opposed to individuals. Either way, I've found this to be an excellent free service and I'm happy to now have my GitHub Pages site running over SSL for free.

[my website]:https://www.iansinnott.com
[blog]:https://blog.iansinnott.com
[LetsEncrypt]:https://letsencrypt.org/
[Netlify]:https://www.netlify.com/
[GitHub Pages]:https://pages.github.com/
[CloudFlare]:https://www.cloudflare.com/
