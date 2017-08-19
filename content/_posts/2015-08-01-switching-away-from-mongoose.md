---
created: '2015-08-01T07:00:00.000Z'
published: '2015-08-01T07:00:00.000Z'
title: Switching Away From Mongoose
tags:
  - javascript
  - node
---

I've been using MongoDB as my primary database for some time now. That means all new projects I created were running Mongo, and Mongoose was my ORM of choice. Mongoose has worked well for my in the past and even _still_ does, but I can feel that it's time for a switch.

## Why the change?

### Mongo

The main reason actually isn't Mongoose, but rather **Mongo**. The data in _most_ applications is probably going to be relational so why would you use a non-relational database? The main reason I liked Mongo initially was that it had a JavaScript API but I've come to realize that doesn't matter that much, and it can even be a hindrance when working with team members that know and love SQL.

### Mpromise

For anyone who doesn't know already, Mongoose provides a promise-based API for doing async database operations in addition to the classic callbacks. This API is unfortunately under documented, but it exists none-the-less and the library it uses to implement promises is [Mpromise][mpromise].

Mpromise seemed fine at first, but it turns out it simply doesn't adhere to the ES6 Promise spec. The most glaring example of this is that Mpromise does not implement `.catch`, meaning you can't do nice pretty error handling at the bottom of your then-stack. Here's an example using Express to build an API:

```js
import Model from '../models/Model.js';

// GET all the Models
api.get('/models', (req, res, next) => {
  Model.find({})
    .then(data => res.send(data))
    .catch(next);
});
```

<!-- more -->

The above code will break, throwing an error because an Mpromise Promise has no `catch` method. There's even an [open issue about this][issue] from _last year_. That's probably already a dealbreaker, but we can get around this by patching Mpromise ourself:

```js
var mpromise = require('mongoose/node_modules/mpromise');

mpromise.prototype.catch = function(onReject) {
  return this.then(undefined, onReject);
};
```

Still, this is ugly and should not be necessary with the myriad promise libraries in addition to the rollout of ES6 (We can currently use native Promises in Chrome and FF).

## So what now?

Well, despite what I said about Mongo earlier it's still the database I know best. For this reason I'm going to keep on using it in the interim while I survey the state of relational database support in the Node ecosystem. There are a number of interesting libraries currently out there. Here are a few:

* <https://github.com/tgriesser/knex>
* <https://github.com/tgriesser/bookshelf>
* <https://github.com/balderdashy/waterline>

I'm currently leaning toward Waterline, as I tried out Bookshelf and wasn't a fan of the API. That being said, the whole idea of query building with Knex is interesting, and allows simple application of existing relational DB knowledge to a Node app.

I'm not sure what my ideal stack will be in a couple months, but for now I'm trying out some new things in the hope of discovering the "ultimate" stack. Maybe I'll get tired of writing out all my routing logic with Express and switch to [Sails][sails] or [Loopback][loopback]... or better yet maybe I'll get fed up with JS all together and switch to a Clojure-ClojureScript stack. I'd really love to start using [Om][om] right now, but the overhead of getting up to speed with ClojureScript would cause a serious hit to my immediate productivity.

[mongoose]: https://github.com/Automattic/mongoose
[mpromise]: https://github.com/aheckmann/mpromise
[issue]: https://github.com/aheckmann/mpromise/issues/15
[loopback]: https://github.com/strongloop/loopback
[sails]: https://github.com/balderdashy/sails
[om]: https://github.com/omcljs/om