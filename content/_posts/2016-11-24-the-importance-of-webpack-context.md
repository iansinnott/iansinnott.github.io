---
created: '2016-11-24T08:00:00.000Z'
published: '2016-11-24T08:00:00.000Z'
title: The importance of Webpack context
tags:
  - webpack
date: 2016-11-24T19:21:05.000Z
---

Today I ran into an issue testing my [react-static-webpack-plugin][] plugin. I've been running webpack builds in subdirectories of the repository and then running test assertions against the output in order to test the project. So far it's worked great, but after updating my dependencies recently I ran into a nasty error:

```
Error: Error: Child compilation failed:
Entry module not found: Error: Cannot resolve 'file' or 'directory' ./src/routes.js in /path/to/react-static-webpack-plugin:
Error: Cannot resolve 'file' or 'directory' ./src/routes.js in /path/to/react-static-webpack-plugin
```

...😖

Not good. But looking at the output and enabling the debug logger in my build process led me to the ultimate culprit, Webpack's context.

Here's what was happening:

* I was running build commands from the root directory of my project
* The builds I was running needed to be ran in their own subdirectory
* Building directly in the subdirectory worked fine...
* Webpack's context was getting set to the root directory no matter what

After looking at the [Webpack docs][] it quickly became apparent what was happening:

`context` in the `webpack.config.js`

> The base directory (absolute path!) for resolving the entry option. If output.pathinfo is set, the included pathinfo is shortened to this directory.
> _**Default:** process.cwd()_

[Webpack docs]: https://webpack.github.io/docs/configuration.html#context

I was pretty sure I knew what `process.cwd()` would return, so I started to have a hunch. Looking at the [Node docs][]:

[Node docs]: https://nodejs.org/api/process.html#process_process_cwd

> The process.cwd() method returns the current working directory of the Node.js process.

[react-static-webpack-plugin]: https://github.com/iansinnott/react-static-webpack-plugin

Ah, I see. Turns out that my Webpack builds which ran in subdirectories were actually searching for the entry files in the _root_ directory of the project.

The fix was swift and effective. I added the following line to my `webpack.config.js` files:

```
context: __dirname
```