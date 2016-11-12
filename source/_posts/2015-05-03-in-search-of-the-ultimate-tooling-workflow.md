---
title: "In search of the ultimate tooling workflow"
---

Lately I've been exploring the various options out there for front-end tooling. I'm about to start a greenfield project next week and I figure I might as well do it right. The goal is not to look back in two months and wish I had implemented a better workflow. The tooling can always change, but in practice it usually doesn't so it's best to get it right the first time.

In short, here's what I've decided on:

* [Webpack][webpack] w/ [Hot Module Replacement][hmr] enabled
* [Babel][babel] (ES6 compilation)
* [Gulp][gulp]
* [Stylus][stylus]

## Webpack

Webpack is amazing. I never thought [Browserify][browserify] would be replaced in my workflow, but it has been. Webpack essentially does everything Browserify did and more. It let's you require _anything_, including images, Markdown files, fonts and probably anything else you would need in a website.

### So what?

Webpack let's you truly componentize your applications by letting you keep _everything_ organized in a single directory. For example, if you wanted to componentize your website's header you could put the HTML, CSS, JS and all associated images in the same directory. No more fumbling with paths in you're image `src` attribute.

### Hot Module Replacement

Requiring everything is great, but another revelation was Hot Module Replacement (HRM). The concept is pretty simple if you've ever used LiveReload—Your browser refreshes every time you change a file. Webpack gives you HMR, which takes the concept of live reload to the next level. Basically the HTML in your browser will change without reloading the browser window.

**This is a _huge_ win.**

When you're developing any sort of stateful UI you generally have to make changes, reload the browser and then click around to put the UI back in whatever state you were at before. The classic example is a dropdown menu, that would be hidden whenever you reload the browser.

With HMR you don't have to reload anything. You simply change your HTML/CSS and the changes will be reflected live in the browser without having to do a full page reload. **So good!**

## Babel

Babel is a pre-compiler for ES6, which means you can write JavaScript using full ES6 features and functionality. Babel will compile everything down to standard ES5 JavaScript so that you can run it in any browser.

If you're using CoffeScript all the new ES6 features probably aren't that exciting, but the new spec is a big jump for JS as a language.

## Gulp

Webpack handles _almost_ every step of our build process, but sometimes you need to run arbitrary scripts or automate things at a higher level than webpack might allow. Gulp is great for this.

In my workflow I use gulp to script webpack and run an API server that the UI will interact with.

Gulp is also good for setting up a database process running in the background if you're app is using a persistence layer.

## Stylus

Stylus is great. It's the most compact CSS syntax I've come across and it's written entirely in Node. This is probably one of the more contentious points in my build process since everyone seems to have very strong opinions about how to write their styles. But I think anyone who gave Stylus a try would really like it. Just remove all brackets, colons and semicolons from any CSS file and you're looking at beautiful Stylus syntax.

## Conclusion: Increased productivity

This new workflow has really made me more productive. Writing single page apps now takes a fraction of the time it used to take. This is admittedly due in large part to [React][react] being an excellent library for productivity, but whatever. Still counts :beers:.

[webpack]: http://webpack.github.io/
[react]: https://facebook.github.io/react/
[gulp]: http://gulpjs.com/
[babel]: https://babeljs.io/
[hmr]: https://github.com/webpack/docs/wiki/hot-module-replacement-with-webpack
[browserify]: http://browserify.org/
