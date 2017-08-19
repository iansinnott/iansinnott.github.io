---
created: '2014-07-24T07:00:00.000Z'
published: '2014-07-24T07:00:00.000Z'
title: Using Dokku As A Personal Heroku
---

## Dokku For The Win

I might just be in love with [Dokku]. Why? Here are some things I like as a developer:

- Not having to configure servers
- Not having to upload files
- Deploying apps to production (or staging!) with a few key strokes
- Portability of code
- Extensibility

With a service like Heroku you get all of this, but with free, open source software like [Dokku][dokku] you not only get these great features but you don't have to pay a premium. It's completely free, which means if you're like me and you enjoy using [Digital Ocean's][do] $5/mo base package you get the most critical features of Heroku for five bucks a month. That's a deal in my book.

[dokku]: https://github.com/progrium/dokku
[do]: https://www.digitalocean.com/?refcode=9acd82993bac

After a session of coding, here's what my new deployment process looks like:

```
git add .
git push dokku master
```

It's _that_ simple.

## Setting Up

I'm not going to go in depth on this because there's really not that much to say. Here are the steps you would take to get set up with Dokku if you're using Digital Ocean:

- Crete a new droplet from the standard Dokku image. [Here's a guide][guide].
- Install the [Dokku Domains Plugin][domains]. It's unofficial, but it works great.
- Run `dokku domains:set <app-name> www.myawesomeapp.com`
- Symlink the newly created nginx conf file to the `/etc/nginx/sites-enabled/` directory.
- Restart nginx: `sudo service nginx restart`

Step four is what tripped me up initially. I thought I could just run the domains command and everything would work fine, but apparently the script doesn't link anything up to Nginx, so you must do it yourself.

The generated conf file will likely be located at `/home/dokku/<app-name>/nginx-domains.conf`. So all you need to do is symlink that into your Nginx configuration and your good to go:

```
ln -s /path/to/nginx-domains.conf /path/to/sites-enabled/<app-name>
```

After that, restart your server with the command mentioned above (or whatever works for your system) and you should be good to go. Reload your custom URL in the browser and see it live.

**Note:** This only works if you already have a domain name set up and DNS set up. Just Google this if you need help there, Digital Ocean has some great guides and a surprisingly nice DNS management interface.

[guide]: https://www.digitalocean.com/community/tutorials/how-to-use-the-digitalocean-dokku-application
[domains]: https://github.com/wmluke/dokku-domains-plugin

That's all. Dokku is awesome.