---
created: '2014-06-19T07:00:00.000Z'
published: '2014-06-19T07:00:00.000Z'
title: Jekyll Theming Like a Boss With Gulp
---

## Building your own Jekyll theme quickly and efficiently

Basically I was fed up with how inefficient coding Jekyll themes was, especially with Octopress, so I decided there must be a better way. These are my findings.

We're going to use [Gulp.js][gulp] to automate most of what's lame about creating themes for Jekyll. Gulp is just a task runner, so if you have another your more familiar with (i.e. [Grunt][grunt]) that would work too.

First you need to go grab the boilerplate [Poole][poole] code so that we are all on the same page.

[gulp]: http://gulpjs.com/
[grunt]: http://gruntjs.com/
[poole]: http://getpoole.com/

### Sass

Jekyll tempting is a pain compared to general web development and it shouldn't be. Let's get gulp set up to automate the usual crap for us. I'm using SCSS, but you could do the same thing with plain CSS, Less or Stylus just as easily. Here is the is a gulpfile to get get you set up:

<!--more-->

{% gist iansinnott/a9175e41f521a56eae52 %}

The important task here is the 'sass' task. That task will compile any sass in the `sass/` directory, save it in two places:

* `public/css`: This is where you would normally save any CSS you wanted included in your project. These files would be copied into `_site/public/css` whenever you run `jekyll build`.

* `_site/public/css`: This is where your generated site lives. Normally you would never manually change any files in here, but by saving CSS to this directory on compile we can take advantage of CSS injections in the browser immediately, without having to run `jekyll build` to have the files copied over. Basically we are doing exactly what `jekyll build` would do, but only for our CSS so that the entire site doesn't have to be built every time we change one style.

The key to this setup is the `watch` task, which will compile are Sass files into CSS and inject the changes into the browser using live reload. This is an immense improvement over changing Sass files, manually running `jekyll build` and then doing a full page refresh in the browser. As an added bonus, we can also have gulp automatically rebuild the site whenever any of our Markdown or html files change. First I set up gulp with [gulp-shell][gshell] so that it could run `jekyll build` for me:

```js
gulp.task('build', shell.task([ 'jekyll build' ]));
```

Then the following code runs that `build` task on the project whenever any HTML or Markdown files are changed in our project:

```js
gulp.watch([
  '_includes/**/*.html',
  '_layouts/**/*.html',
  '_posts/**/*'
], ['build']);
```

### Wrap up

That's pretty much it. Just a way to get jekyll to act like a modern web technology when building templates. If you don't like waiting for your Sass to compile or your browser to reload, hopefully this helped.