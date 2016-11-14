---
title: Getting Started with Flow and Webpack
tags:
  - javascript
  - flow
  - webpack
---

**TL;DR:** This post will show you how to get set up with [Flow][] and [Webpack][] as quickly as possible so that you can benefit from some degree of type safety in your JS code!

## What are we talking about?

### Flow

[Flow][] is like ESLint on steroids. It is a static type checker for JavaScript. It let's you add types to any existing JS code. **Why would you want to do this?**  The short answer is because JS ❤️ runtime errors, but runtime errors make your users sad. The more helpful answer is that Flow will analyze your codebase and catch bugs that may otherwise go unnoticed until you're app is already deployed to production. There is an entire site dedicated to explaining Flow, so I will let you check that out for more detailed information: <http://flowtype.org/>

<!-- more -->

However, what may not be immediately obvious from the Flow site is the reason why it's so appealing for existing projects, which is that you can _iterate_ to full Flow coverage with minimal overhead.

That means you can keep on hitting all your existing dev milestones while adding Flow type coverage to your code in parallel. Flow is also designed to work with [Babel][], so if you're already using Babel in your toolchain you'll be pleasantly surprised at how easy it is to set Flow up.

### Webpack

If you're reading this post you probably already know what Webpack is, but just in case here's a two-sentence explanation: **Webpack is a module bundler that lets you split your JS code into separate files that can `import` or `require` each other**, much like Require.js or Browserify. In addition, it also lets you import assets such as CSS files and images directly in your JavaScript files.

In this post I'm going to show you how you can get set up using Webpack with Flow, which might be a bit daunting at first since Flow doesn't support all of Webpack's features (such as CSS importing) out of the box.

## Getting Set Up

```
npm install -g flow-bin
```

That should be all you need to get the `flow` binary installed on your CLI.

### Setting Up Webpack and Babel

This one will vary greatly depending on your projects, so I won't go over it here. What I will mention is that in order for Babel to properly compile Flow-typed code you will need to use the [Babel Flow plugin][]. If you're using `babel-plugin-react` then the Flow plugin should be included automatically.

[Babel Flow plugin]: https://www.npmjs.com/package/babel-plugin-transform-flow-strip-types

## Initial Flow Configuration

OK, here's the meat of this post. Once you have Flow installed and are in your projects root directory you will be ready to configure Flow. Let's do it.

**Create a `.flowconfig` file**

You can do this by running `flow init`.

After running that command you should have a `.flowconfig` file in the current directory. Open up the file, since we will be editing it. You should see something like this initially:

```
[ignore]

[include]

[libs]

[options]
```

**Test your configuation**

Run `flow` from the root directory where you just created `.flowconfig`. It will take a few seconds to run the first time, but every time after should be almost instant.

You should see one of two things:

1. `No errors!`
2. A bunch of errors

If you see a bunch of errors after just setting up Flow that is because Flow type-checks _everything_, even all the code in your `node_modules`. Although it may be counter intuitive this is actually desired behavior, because Flow can warn you if you try to import anything that doesn't exist from `node_modules`.

However, the downside is that when you first set up Flow you might see something like this:

![Flow Errors](http://dropsinn.s3.amazonaws.com/Screen_Shot_2016-06-11_at_5_50_55_PM.png)

In this example Flow is detecting type errors in the `fbjs` module, which is required by React. Getting past this issue is simple enough, simply add a new ignore line to `.flowconfig`. I have no idea how regex works in OCaml, but luckily there's no need. The Flow docs provide plenty of examples to show us how to ignore a certain directory. The syntax is `.*/path/to/dir/.*`. So to ignore everything under `node_modules/fbjs` you can update your `.flowconfig` as follows:


```ocaml
[ignore]
.*/node_modules/fbjs/.*

[include]

[libs]

[options]
```

Since you haven't yet told Flow to type check any of your own code, every error you see is due to some third-party node module. That means its safe to ignore. Add more lines to the `[ignore]` section of `.flowconfig` until you've successfully ignored any offending node modules.

Now you should see `No errors!` on the command line when you run `flow`.

Whew, time to move on to the fun part: Typing your own code!

## Type checking our own code

To type check any of your js/jsx files with Flow simply add `/* @flow */` to the top of the file. This will make it visible to Flow. I would recommend doing this only one file at a time and fixing any errors that Flow catches in that file _before_ type-checking any new files. This strategy is simply meant to keep the number of errors from seeming overwhelming, since untyped code can often have a ton of errors.

It is also worth noting that if the errors are so many that they seem daunting you can use `/* @flow weak */` to turn on a weaker type-checking mode in Flow that will likely produce fewer errors. Once you have all those errors handled you can revert back to `/* @flow */` and handle the more strict errors. Using Flow in it's most strict mode is how it was meant to be used, and will ultimately provide you with the most safety.

## Advanced Configuration: CSS Modules, Image files, ES7, etc

### CSS Modules

All right, we made it to the Webpack specific part of this post. Let's talk about making CSS Modules type-check with Flow. If you're not using CSS Modules you can safely skip this section, but you may also want to [check them out][CSS Modules] since CSS Modules can be a big win for the maintainability of a codebase.

Using CSS Modules with Webpack looks something like this:

```js
import React from 'react';
import { render } from 'react-dom';
import s from './App.css'; // CSS Modules!

class App extends React.Component {
  render() {
    return (
      <div className={s.App}>
        <h1>My App</h1>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
```

The important part of that code is line 3, where we import `s` from a CSS file. Further down in the `render` method of `App` we see that `s` is expected to be a JavaScript object. However, Flow doesn't know this and it will complain as soon as it sees us trying to import a module named `App.css`. Flow will look for the `./App.css` JS module and find nothing, so it will throw an error:

```
src/components/App.js:3
  3: import s from './App.css';
                   ^^^^^^^^^^^ ./App.css. Required module not found
```

To solve this issue, we need to tell Flow to that for CSS files it should actually look for type definitions somewhere else. I'll describe how to do this briefly here, but there is also a good section on the Flow website that describes how to accomplish this: <https://flowtype.org/docs/modules.html#css-modules-with-webpack>

Create a new directory named `flow` and a new file within that directory: `flow/CSSModule.js.flow`. Now add the following to `CSSModule.js.flow`:

```
// @flow

declare export default { [key: string]: string }
```

When Flow reads this file it will see a default export of a plain JavaScript object that maps string keys to string values, which is exactly the case for CSS modules.

The last step to make this work is to tell Flow which file extensions should use this `CSSModule.js.flow` file. We do that in the `[options]` section of our `.flowconfig`:

```ocaml
[ignore]
.*/node_modules/fbjs/.*

[include]

[libs]

[options]
module.name_mapper.extension='css' -> '<PROJECT_ROOT>/flow/CSSModule.js.flow'
module.name_mapper.extension='styl' -> '<PROJECT_ROOT>/flow/CSSModule.js.flow'
```

The first line under `[options]` tells Flow that for every file with the `.css` extension it should read type info from the `CSSModule.js.flow` file we just created.

**Note** that you can map multiple extensions in the options section. In my case, I use [Stylus][] to author my CSS which means I needed to add the `.styl` extension as another filetype that should be interpreted as a CSS module. You can add support for Less and Sass in the same way.

[Flow]: http://flowtype.org/
[Webpack]: https://webpack.github.io/
[Babel]: http://babeljs.io/
[Stylus]: http://stylus-lang.com/

### Image Files

Since Webpack also lets you `import` image files we will want to add support for that as well. The process looks much the same as it did for CSS modules above: We need to create a new type definitions file that will be read for files with certain extensions. The only difference here is that our image files are imported as strings, not JavaScript objects as with CSS modules.

Create another file: `flow/WebpackAsset.js.flow`. Now add the following to `WebpackAsset.js.flow`:

```
// @flow

declare export default string
```

Then tell Flow about this file in your `.flowconfig`:

```ocaml
[ignore]
.*/node_modules/fbjs/.*

[include]

[libs]

[options]
module.name_mapper.extension='css' -> '<PROJECT_ROOT>/flow/CSSModule.js.flow'
module.name_mapper.extension='styl' -> '<PROJECT_ROOT>/flow/CSSModule.js.flow'
module.name_mapper.extension='png' -> '<PROJECT_ROOT>/flow/WebpackAsset.js.flow'
module.name_mapper.extension='jpg' -> '<PROJECT_ROOT>/flow/WebpackAsset.js.flow'
```

In the above configuration file we tell Flow to use our `WebpackAsset.js.flow`
file in place of any file with a `.png` or `.jpg` extension.

Now Flow will happily type code like this:

```js
import React from 'react';
import { render } from 'react-dom';
import s from './App.css'; // CSS Modules!
import logo from './logo.png'; // Image Files!

class App extends React.Component {
  render() {
    return (
      <div className={s.App}>
        <h1>My App</h1>
        <img src={logo} alt='App Logo' />
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
```

Pretty slick, right? 😎

**NOTE:** You will need to have the proper module loaders set up with Webpack
for this to even work in the first place

### ES7 Class Support

If you're authoring React code you may well be interested in compile ES7-style
class syntax with babel. This things like `static propTypes = {}`,`state
= {}`, etc. For example, here's a `Counter` component written using ES7 class
syntax:

```js
import React from 'react';

import s from './Counter.css';

class Counter extends React.Component {
  static propTypes = {
    color: React.PropTypes.string,
  };

  static defaultProps = {
    initialCount: 0,
  };

  state = {
    count: this.props.initialCount,
  };

  increment = () => {
    this.setState({ count: this.state.count + 1 })
  };

  decrement = () => {
    this.setState({ count: this.state.count - 1 })
  };

  render() {
    return (
      <div className={s.Counter}>
        <h1>Count: {this.state.count}</h1>
        <div className={s.controls}>
          <button onClick={this.decrement}>-</button>
          <button onClick={this.increment}>+</button>
        </div>
      </div>
    );
  }
}
```

If you're not familiar with this syntax check out this blog post on the Babel
website: <https://babeljs.io/blog/2015/06/07/react-on-es6-plus>

**NOTE:** At the time of this writing Flow requires semicolons after property
initializers in order to type check effectively, even though Babel does not
require this.

In order to allow code like that above we need to update the `[options]`
section of `.flowconfig` again:

```ocaml
[ignore]
.*/node_modules/fbjs/.*

[include]

[libs]

[options]
module.name_mapper.extension='css' -> '<PROJECT_ROOT>/flow/CSSModule.js.flow'
module.name_mapper.extension='styl' -> '<PROJECT_ROOT>/flow/CSSModule.js.flow'
module.name_mapper.extension='png' -> '<PROJECT_ROOT>/flow/WebpackAsset.js.flow'
module.name_mapper.extension='jpg' -> '<PROJECT_ROOT>/flow/WebpackAsset.js.flow'
esproposal.class_static_fields=enable
esproposal.class_instance_fields=enable
```

We've added two new lines to tell Flow we want to support this new class
syntax:

```
esproposal.class_static_fields=enable
esproposal.class_instance_fields=enable
```

### Ignore Single Lines in Flow

The last Flow trick I'll show you today is how to tell Flow to ignore single lines in your code. Just like with ESLint, it can be useful to be able to ignore just one line in a file. There are usually two reasons you would want to do this:

1. The code in question needs to be refactored to be properly typed but it
would take too much time or effort to do it now
2. Flow does not yet support some feature or has a bug

The first point is pretty obvious, but the second may come as a surprise. Flow is very advanced and very useful _today_ but it is not without its own bugs or missing features, so there may be times when you need to tell Flow to ignore a line for reason number two.

The way to ignore single lines is by using the `supress_comment` option within your `.flowconfig`. Let's define two ignore patterns so that we can differentiate between the two types of reasons to ignore listed above:

```
suppress_comment=\\(.\\|\n\\)*\\$FlowFixMe
suppress_comment=\\(.\\|\n\\)*\\$FlowIssue
```

Now anywhere in our code where we want Flow to ignore a line we can place a
comment on the proceeding line:

```js
// $FlowFixMe: We aren't yet ready to refactor this line...
function manyUntypedArgs(a, b, x, y) { /* ... */ }
```

## Conclusion

That's it! These are the tricks I've found to be most useful in my day to day
usage of Flow so far.

Here's the full `.flowconfig` we created throughout this post for your
reference:

```ocaml
[ignore]
.*/node_modules/fbjs/.*

[include]

[libs]

[options]
module.name_mapper.extension='css' -> '<PROJECT_ROOT>/flow/CSSModule.js.flow'
module.name_mapper.extension='styl' -> '<PROJECT_ROOT>/flow/CSSModule.js.flow'
module.name_mapper.extension='png' -> '<PROJECT_ROOT>/flow/WebpackAsset.js.flow'
module.name_mapper.extension='jpg' -> '<PROJECT_ROOT>/flow/WebpackAsset.js.flow'
esproposal.class_static_fields=enable
esproposal.class_instance_fields=enable
suppress_comment=\\(.\\|\n\\)*\\$FlowFixMe
suppress_comment=\\(.\\|\n\\)*\\$FlowIssue
```

You may have other options you need to make to your `.flowconfig`, such as
defining a directory for your [declaration files][]. But hopefully this
configuration helps get you started with Flow and Webpack! Big wins ahead.

If you have any questions feel free to lave a comment below or [hit me up on
twitter](https://twitter.com/ian_sinn).

[declaration files]: https://flowtype.org/docs/declarations.html
