---
layout: post
title: "Time Machine to the Rescue"
comments: true
---

A couple weeks ago I made the decision to reinstall OSX and start anew, washing away over a years worth of accumulated files. It took about two hours to get most things reinstalled and running again, and after the fact I was very happy with the results. My computer is now fresh again, the downloads folder doesn't have 1000 items in it and I have over 100GB of free space (up from ~5GB before)! All in all a very quick and painless experience... until this week.

## Know what to migrate

It's tough to keep track of everything on your system that's vital to your day-to-day workflow. The toughest are the things that aren't needed day-to-day, but which become vital the second you try do something that depends on them. In my case this was building an android app for distribution.

To distribute an app on the Google Play Store you need to create a Java Keystore to sign your app with. This file is monumentally important if you're an app developer, because without it you cannot update your app. This week I had to update an app on Google Play and figured out how important that file was.

## Time Machine to the rescue

Luckily, I did make sure to back up my entire system before reinstalling OSX, so I knew I must have my Java Keystore saved somewhere. I just had to find it. This was actually surprisingly fast as I had initially stored it under a folder named `keystore`. Simple enough. I hit restore in Time Machine and done, it was on my system.

Excellent, now I just need to sign my Android APK and I would be good to go. This particular project is built with Cordova, so the easiest way I've found to do this is to specify an `ant.properties` file under `platforms/android`. There's a great, concise [article on this with full instructions][article].

Great, now to just run the command...

```
$ cordova build android --release

...

-release-prompt-for-password:
    [input] Please enter keystore password
```

... shit. Did not remember my keystore required a password.

At point I ended up trying a few common passwords all of which failed, but I did ultimately figure it out. I wrote a quick Ruby script to run through a list of about 20 potential passwords and one of them did turn out to be the right one. So in the end not a terrible experience, just a strong reminder that backing up everything is always a good idea, and backing up the keys to your apps is paramount.

[article]: http://ilee.co.uk/Sign-Releases-with-Cordova-Android/
