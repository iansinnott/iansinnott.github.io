---
title: Testing Webpack Plugins
tags:
  - javascript
  - webpack
---

_**TL;DR:** I'm going to show you how to test Webpack plugins. I'll even show you how to integrate with a CI server :smile:. The trick is to use the Webpack [Node API][]_.

Ever built a [Webpack Plugin][]? Ever wondered how to test that awesome plugin you just built? If so, this article is for you.

I scoured the internet (skimmed the first page of a google search) for resources on testing Webpack plugins and came up empty, so I decided it was time to take matters into my own hands!

I recently built my own Webpack plugin for generating static sites from React Router routes. You can check it out [here if interested][static]. Anyway, I was getting somewhat annoyed that I hadn't yet tested the plugin. I had seen some regressions as I added support for more features and it was no fun to have to resolve those issues when I really just anted to generate awesome static sites using React and Webpack.

## Where to turn...

Even if the first page of a google search didn't answer my questions, I figured someone somewhere must have needed to test their Webpack plugins in the past, and I was right! My first move was to think about what popular Webpack plugins I was aware of. The first one that came to mind was the venerable [Extract Text Webpack Plugin][]. Little did I know, it was written by the same guy who wrote Webpack.

[Extract Text Webpack Plugin]:https://github.com/webpack/extract-text-webpack-plugin

I figured that such a high profile plugin is likely to be well tested and it is. The plugin has a whole [suite of tests][extract tests] which you can check out and use as a reference for writing your own. Nice :boom:

## Writing the tests

Let's jump in. To write a tests for a Webpack plugin you will probably want to analyze the output of a build. To do so, you can simply use the [Node API][]. It runs in Node so it probably runs in your favorite test runner. For me this is [Ava][], but it's just Node code so you can use whatever you like.

The Webpack API let's you pass in options and a callback to Webpack. The callback will be called with an `err` object and some `stats` on how the build went. In short, here's the [exact test I use in my plugin][]:

[exact test I use in my plugin]:https://github.com/iansinnott/react-static-webpack-plugin/blob/master/example/test.js

```js
import test from 'ava';
import webpack from 'webpack';

// 0. Import the config that uses my plugin
import options from './webpack.config.js';

test.cb('Compiles routes nested at one level', t => {

  // 1. Run webpack
  webpack(options, function(err, stats) {

    // 2. Fail test if there are errors
    if (err) {
      return t.end(err);
    } else if (stats.hasErrors()) {
      return t.end(stats.toString());
    }

    // 3. Map asset objects to output filenames
    const files = stats.toJson().assets.map(x => x.name);

    // 4. Run assertions. Make sure that the three expected
    //    HTML files were generated
    t.true(files.indexOf('index.html') !== -1);
    t.true(files.indexOf('about.html') !== -1);
    t.true(files.indexOf('404.html') !== -1);

    t.end();
  });
});
```

This is a pretty simple test. Given the routes defined in [`routes.js`][routes], the plugin should generate three HTML files: `index.html`, `about.html` and `404.html`. This test simply runs Webpack and checks the output to make sure those three files were generated. It doesn't check the contents of those files or check that they were written to disk, but this test already gives me infinitely more code coverage than I had before.

Of course it should be noted that I had to create a whole new directory and give it its own `package.json` and `node_modules` in order to get this test to run, but it works.

Also, looking at the Extract Plugin tests it looks like it may not be necessary to do a full `npm instal` for the subdirectory in order to run Webpack. In the future I may optimize the tests by looking more closely at how the tests are being run in the Extract Plugin.

## Running your tests on a CI server

Now that you know how to write tests for a Webpack plugin you will also probably want to run them automatically whenever you push. Personally I use [Circle CI][] for this, but I'm sure Travis or any other modern CI service would work fine.

The key point to note is that you need to run `npm install` in whatever directory you're using for your tests. This will vary depending on your CI provider so I'll just show you the command I run and link you to my `circle.yml`.

Install node modules in the `example/` directory using a [subshell][]:

[subshell]: http://www.tldp.org/LDP/abs/html/subshells.html

```
(cd example; npm install)
```

You can see my full [`circle.yml` here][circle].

## Conclusions

It wasn't as hard as I thought it would be to run tests on a Webpack plugin. That being said I didn't find this documented anywhere and google proved particularly useless since it turned up a ton of results related to Webpack plugins that run tests on your web app for you... I was looking for ways to run tests on Webpack plugins _themselves_, so this is not what I was looking for.

Hopefully this helps you out. Webpack plugins are crucial pieces of many build processes out there, so it's important that we know how to test them.

Feel free to [star my plugin repository][static] if you liked this write up, or leave me a comment if anything wasn't clear.

Cheers :beers:

[static]:https://github.com/iansinnott/react-static-webpack-plugin
[Webpack Plugin]: https://github.com/webpack/docs/wiki/how-to-write-a-plugin
[routes]: https://github.com/iansinnott/react-static-webpack-plugin/blob/master/example/src/routes.js
[Node API]:https://webpack.github.io/docs/node.js-api.html
[extract tests]:https://github.com/webpack/extract-text-webpack-plugin/tree/master/test
[circle]:https://github.com/iansinnott/react-static-webpack-plugin/blob/master/circle.yml#L9
[Circle CI]:https://circleci.com/
[Ava]:https://github.com/sindresorhus/ava

