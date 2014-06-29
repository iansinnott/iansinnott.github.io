---
layout: post
title: Meteor is (Almost) Awesome
---

### Almost Perfect, But With Room For Improvement

Have you ever built a real-time web app? Well I hadn't, not before meteor anyway. This framework makes it insanely easy to build apps that update in real-time across an unlimited number of screens, so I love it. Meteor is _so good_ in fact, that it was very easy to overlook what I would otherwise consider to be deal breakers like:

* Full blown app rebuilds, including file compilation, concatenation and minification _every time you save a file_.
* No official testing solution
* No official package manager

One of the first things you will read or be told when starting a meteor project, is to install [Meteorite][mrt] as a package manager, so the last bullet point is probably pretty clear to anyone who's used Meteor. However, the other two pain points might be less obvious when just starting with the framework.

That first one is a really big deal for anyone who likes to iterate on their design using CSS in a browser, and likes to see realtime changes to the web page. These days it's fairly easy to accomplish this using [Grunt][grunt] or [Gulp][gulp] in combination with [Livereload][lr]. But if you have a large Meteor app, you might have to wait ten seconds (or more!) for your app to reload entirely, even if you just changed a margin or added a 1px border. This is ridiculous.

Testing has also been an issue with Meteor. There have been a few decent contenders:

[mrt]: http://oortcloud.github.io/meteorite/

<!--more-->

- [Laika](http://arunoda.github.io/laika/)
- [RTD](http://rtd.xolv.io/)
- [Mocha Web](https://github.com/mad-eye/meteor-mocha-web/)

For the most part, these are all viable solutions and they are certainly all written by very smart and accomplished members of the community. However, they all fall short in one way or another:

- Laika is slow to run, and not great for integration testing with a browser (well, PhantomJS).
- RTD enforces a strict file structure, which is at odds with Meteor's philosophy of letting you put code anywhere and having it work.
- Mocha web is fine in my opinion (I'm currently using it for a project) but it's _just_ mocha essentially. It works, but it doesn't take advantage of Meteor's reactivity.

## A Solution

Both of these issues are pretty bad in my book, but luckily Meteor has an excellent community and a core team that is more than willing to collaborate with this awesome community. I had the chance to attend an excellent [Meteor devshop][dev] at Meteor HQ in San Francisco this week, and I my faith in and excitement for Meteor were both restored.

[dev]: http://www.meetup.com/Meteor-SFBay/

### Long app rebuilds

One of the summer interns at Meteor gave a lightning talk at the event and talked about support for smart reloads coming in v0.9.0. The feature works today, but hasn't shipped yet. Basically it's exactly what you expect: Change a CSS file and the updated code will be injected into the browser. It still took a visible amount of time to update the page using simple CSS, whereas a setup using Gulp plus [gulp-sass][gsass] is nearly instantaneous, so there is clearly still some work to be done there. But I'm still super excited for the feature, as it demonstrates that the Meteor team is taking heed of what numerous developers have been complaining about on GitHub and on the mailing list.

[gsass]: https://www.npmjs.org/package/gulp-sass

### Testing

All the test-related pain points I mentioned above should be disappearing very soon with the emergence of [Velocity][vel]. This project is sort of like a framework for testing frameworks. It allows various frameworks to work with meteor, and here's the kicker: They work _reactively_. This means you get real-time feedback as to whether or not your tests are passing as you write them. Or if your into the TDD approach write the test first, then watch them turn green in real time as you write your code. Cool right?

[vel]: https://github.com/xolvio/velocity

The best thing about this project is you can use it today. Just be aware that there _will_ be bugs (as of this writing), but once the framework matures a bit it will be a new and better way to test.

Velocity will also become the official testing framework of Meteor, and will most likely eventually be rolled into Meteor itself and distributed along side it.

What's more, Velocity is being developed by the same guys behind all the current testing solutions I mentioned above, so hopefully going forward there will be much less fragmentation in Meteor testing, and we can all just write our tests and move on to the actual functionality. This is something I can't wait to see.

### Package Management

The last pain point I mentioned was packages, and Meteor is also planning on tackling this by v1.0. Meteorite is slated to be rolled into Meteor itself and will become fully integrated.

## Just the beginning

The feeling as a Meteor developer must be somewhat like being a Rails dev back in 2007, or whenever it was just picking up and really becoming an amazing platform for creative applications. Going to that Meteor devshop renewed my faith in Meteor as the immediate future of web development. It still won't be the right call for every project (read blog), but it's a tremendously useful tool for building what used to be difficult, time-intensive projects. I can't wait to see where it is in a few months.
