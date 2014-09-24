---
layout: post
title: "Building A Mobile App With Backbone"
comments: true
published: false
---

Do this:

- `cordova create [app-name] com.[orginization].[app-name] AppName`
- `cd [app-name]`
- `cordova platform add ios android`

Build the app, specific for each platform:

- `cordova build ios`
- `cordova emulate ios`

Note that to add platforms you will need to have the various SDKs installed already. For iOS this means Xcode, for Android it's the Android SDK that is available from Google.
