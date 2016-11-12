---
title: "Dokku, Mongo & Node.js"
---

_TL;DR: If you run into trouble using Mongo with Dokku for a Node.js app, re-image your server and start from scratch._

Today was my first adventure into setting up a full-fledged, database-driven application with Dokku. I built the app with Node.js so I chose Mongo as the database. Local setup was easy, I already had Mongo installed. Setting up the production server also seemed easy at first until it just didn't work. Here's I troubleshot it:

## Nginx Error

The first problem I ran into was an Nginx error page. I forgot the status code, but it essentially meant there was no app running. Strange, since the app was running fine on my local system. Since my application was set to log to stdout I wasn't able to see any information about what was causing the app to error out, so I decided to do a quick deploy to Heroku and see what was amiss.

**Sidenote**: I _really_ like Heroku. If it wasn't so much more expensive than a Digital Ocean droplet I would probably use them for every project.

### Troubleshooting on Heroku

Heroku has a great `heroku logs` command that shows everything an application logged while it was running. As soon as I saw the output I had a face-palm moment: I hadn't saved all my dependencies to `package.js`, so I was getting simple "module not found" errors. That was embarrassing, but at least it's a quick fix.

After cleaning up my `package.json` file I deployed again and got a database error. Nothing unusual there, I hadn't added a Mongo database to Heroku. This was to be expected, so I decided to deploy straight back to my own droplet.

## Was Dokku Broken?

After redeploying I was still getting the same Nginx error telling me that there was no app running. When I ran `docker ps` I saw that was true: Only the MongoDB container was running. Lame.

At this point I didn't know what to try. I'm still not super familiar with Docker/Dokku for deployment, so I used the good old fashioned method of just resetting everything.

I had saved a droplet image on DO right after installing Node but before setting up Dokku with my SSH key, so I just restored to that image. Then I:

- Setup my SSH key as usual, not using virtual host naming b/c I still haven't transfered the clients main site.
- Installed the Dokku Mongo plugin and the domains plugin
- Created a Mongo container using the plugin: `dokku mongodb:create <app>`
- Created the actual Dokku app from my local server: `git remote add dokku dokku@<ip>:<app>`
- Deployed: `git push dokku master`

Then everything worked fine. Running `docker ps` now shows two running containers: one for the app and one for Mongo.

## So.. in conclusion

I don't know what went wrong initially, but resetting everything worked like a charm. So when in doubt, just restore to a stable image and start from scratch. And make sure to make snapshots of your droplet whenever you feel it is in a reusable state. Boosh!
