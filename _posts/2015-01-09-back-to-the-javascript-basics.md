---
layout: post
title: "Back to the JavaScript Basics"
comments: true
---

Today I was interviewed for a developer position at a San Francisco startup and I was caught off guard when I was asked to create a simple implementation of "inheritance" in JS. Inheritance is in quotes because, well, this is JS we're talking about. There is no real inheritance in the classical sense, but we can certainly make it work. The interview question went something like this:

> Create a class Animal with a `walk` method. Then create a class Dog that inherits from Animal.

Simple enough, right? Here's what I wrote:

```js
var _ = require('lodash');

function Animal() {}

Animal.prototype.walk = function() {
  console.log("Hey there I'm an Animal walking");
};

function Dog() {
  Animal.call(this);
}

_.extend(Dog.prototype, Animal.prototype);
```

This is certainly how I would have solved the inheritance problem in any of my projects, but as it turns out this isn't the best solution in the context of someone evaluating your JS prowess. Firstly, my solution explicitly depends on [Lo-Dash][lodash] (Underscore.js would also work just as well). These days it's hardly outlandish to assume that a given project would depend on either Lo-Dash or Underscore, so I don't see anything wrong with this but it still wasn't optimal in the given setting.

Then there's the larger assumption my solution makes, which is that you're compiling your source through Browserify. Since I now use Browserify religiously on every project it didn't even occur to me to _mention_ this implicit dependency. If the interviewer wasn't familiar with Browserify himself he might have thought I was just crazy—requiring modules in a browser :confused:. Anyway, the answer they were going for was to use `Object.create` for defining the prototype of the subclass:

```js
function Animal() {}

Animal.prototype.walk = function() {
  console.log("Hey there I'm an Animal walking");
};

function Dog() {
  Animal.call(this);
}

Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;
```

Both solutions accomplish the same thing, but the latter can simply be pasted into a browser console while the former would have to be run through Browserify and have Lo-Dash installed through NPM.

## Back to the basics

What this brief experience made me realize is that there are still some basic JS methods that I'm not familiar with. Of course now it's unlikely that I will forget `Object.create`. This was a very healthy realization, because despite the fact that I am unlikely ever to use `Object.create` in any project of my own it's still good to know the ins and outs of the language you write your software in.

So, now that I'm quite familiar with `Object.create` I'm still going right back to my complex build process complete with browserify, stylus, jade and numerous Gulp tasks :smirk:. For anyone interested, my whole build process is implemented in a [Slush generator I use for new Node projects][generator]. The readme could use some work, but it should give you a gist of how I do my development.

[generator]: https://github.com/iansinnott/slush-express-isinn

[lodash]: https://lodash.com/
