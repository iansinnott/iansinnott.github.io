---
title: "Running a Meteor App on Dokku"
---

This is a quick overview of how to get a Meteor app set up on Dokku. It's actually not difficult, but it doesn't seem to have been well documented anywhere yet. Let's get started.

## What you need

Obviously, you will need a server running Dokku. I used the Digital Ocean Dokku droplet, which uses the following versions:

* Ubuntu 14.04
* Docker 1.1.2
* Dokku 0.2.3

If you have a different setup your results may vary, but I'm guessing this guide will generally work for you as long as you have Dokku v0.2.3 setup.

You also need a meteor app. If you are reading this just out of curiosity and don't have an app feel free to use one of the example apps. You can generate them easily through the CLI. Example:

```
$ meteor create --example todos
```

## Dokku Configuration

First of all, the default buildpack that Dokku will use if it detects a Meteor app is the [Heroku Buildpack][heroku_buildpack], which is not yet compatible with Meteor 1.0 and still uses Meteorite. That's no good, so you will need to specify a custom buildpack for Dokku. The buildpack I've used successfully with Meteor 1.0 is [Meteor Buildpack Horse][horse_buildpack]. As of this writing (11/22/14) the documentation still doesn't reflect that it's compatible with 1.0, but it's worked so far so don't worry about that.

To specify a custom buildpack, just create a file in your project root named `.env` and within that file export the buildpack URL like so:

```
export BUILDPACK_URL='https://github.com/AdmitHub/meteor-buildpack-horse.git'
```

[heroku_buildpack]: https://github.com/oortcloud/heroku-buildpack-meteorite

Make sure you `git add` your new `.env` file with and commit it.

## Adding Mongo

Now you need to add the [Dokku MongoDB Plugin][mongodb] to Dokku. Make sure you've SSHed into your server, then run the following commands:

```
$ git clone https://github.com/jeffutter/dokku-mongodb-plugin.git /var/lib/dokku/plugins/mongodb
$ dokku plugins-install
```

This may take a few minutes since it will need to install `mongodb-server` on the remote machine, unless you've already installed Mongo in which case it should be quick. Once it's done, start Mongo and link it to your app:

**Note:** In the following snippet replace `<app>` with the name of your application, assuming you've already pushed it to Dokku. If not, push your app up first and then run these commands. Your app name is what you specify in the git remote URL that points to Dokku. It looks like `dokku@yoursite.com:<app>`.

```
$ mongodb:start
$ mongodb:create <app>
```

## Final Configuration

If you haven't yet, deploy your app to Dokku. It will most likely crash (i.e. You get an Nginx error when you hit your URL), but that's fine as it is still missing one last piece.

The final step is to set the `ROOT_URL` environment variable in your app container. You need to have pushed your app at least once for the app container to exist. Replace `<url>` with the URL you intend to use for your app. If you haven't yet purchased a domain name, you can set this variable to your IP address and it should still run just fine. Don't forget the leading `http://` (ex: `http://example.com` or `http://0.0.0.0`):

```
$ dokku config:set <app> ROOT_URL=<url>
```

Setting the environment variable will trigger Dokku to restart your app. Once it does you should be able to view the app at the URL you provided in`<url>`.

## Success!

That's it. Hopefully this helps as you deploy your meteor apps quickly using Dokku. If you want to create another meteor app you will just need to run through the above steps again, with the exception of adding the MongoDB plugin.

## Troubleshooting

If you had trouble with anything above there are a couple ways you can troubleshoot Dokku and it's containers:

1. Inspect the apps logs. This is likely the most useful troubleshooting technique, and will likely reveal the problem. Run `dokku logs <app>`.
2. If the logs don't reveal the issue, put Dokku into debug mode and re-deploy. To do this you need to create a new Dokku config file at `/home/dokku/dokkurc`. Add a single line to the file: `export DOKKU_TRACE=1`. Now when you deploy, Dokku will send back _a lot_ more information.

## Useful Resources

* [MongoDB Dokku Plugin][mongodb]
* [Meteor Buildpack Horse][horse_buildpack]
* [How To Deploy a Meteor.js Application on Ubuntu 14.04 with Nginx][guide]

That last link is _not_ specific to Dokku or even Docker, but it gives good insight into what is required to set up a production Meteor server.

[mongodb]: https://github.com/jeffutter/dokku-mongodb-plugin
[horse_buildpack]: https://github.com/AdmitHub/meteor-buildpack-horse
[guide]: https://www.digitalocean.com/community/tutorials/how-to-deploy-a-meteor-js-application-on-ubuntu-14-04-with-nginx

Feel free to leave comments if you still have questions.
