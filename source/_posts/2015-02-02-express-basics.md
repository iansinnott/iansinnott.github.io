---
title: Express Basics
tags:
  - tutorial
  - javascript
  - express
  - middleware
---

_A quick guide to using Express, and the basics of Express middleware_

## Intro

All source files for this article can be found in the [GitHub Repo: iansinnott/express-middleware-lecture][repo].

## Outline

1. Intro (Simplifying Express)
2. What is middleware?
3. The relationship between Express and middleware
  * Explanation (it's just a function)
  * Build a simple logger
4. Important points about middleware
  * **MUST** call `next()`
  * Order matters
  * Middleware can be localized to various routes
5. Routes are also middleware
6. Handling errors
  * 404
  * Internal server error (500)
7. Conclusion
  * **Express is just a stack of middleware**
  * Common and useful middleware you will undoubtedly see
  * More resources

## Simplifying Express

So first things first, rather than starting with everything and figuring out what it all does, let's start with a base Express configuration and add things as we need them.

A standard Express app configuration using the `express-generator` NPM module will produce something like this:

```js
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
```

There's a lot going on there, and for anyone without experience using Express that may look daunting if all we really want is a super simple application.

### Simplify all of the things!

The above configuration file also makes assumptions about what you will need in your project. This can be useful but it is quite detrimental to learning the ins and outs of Express, because it does too much automatically. Let's start from a bare-bones Express app and expand as needed. Here's our configuration file:

```js
var express = require('express');

var app = express();

app.get('/', function(req, res) {
  res.send("hello express");
});

app.listen(3000);
```

This file will responds to GET requests at `/`—the root URL. Any other requests will cause an Express error, because there is no request handler for any other route or method.

If you open your browser and go to [localhost:3000](http://localhost:3000) you should see the text "hello express", or you could use CURL:

```
$ curl :3000
hello express
```

Now that we have a super simple Express app up and running, let's move on to middleware.

## Middleware

Middleware, in the context of Express is just a fancy term for a function that gets run on your server _after_ a request has been received from a client and _before_ a response is sent back. In other words, it's a function that gets run **in the middle** of the requeset-response cycle.

So what does that look like in practice? Let's take a look:

```js
// Define your middleware
function uselessMiddleware(req, res, next) {
  // Do some stuff...
  next();
}

// "Use" your middlware
app.use(uselessMiddleware);
```

The above function (middleware) is in fact useless as implied by its name because it doesn't do anything at all. It simply calls the next middleware in the middleware stack (more on that below).

When writing simple middleware, we often use an anonymous function, so let's refactor the above as so:

```js
app.use(function(req, res, next) {
  // Do some stuff...
  next();
});
```

Now let's make our middleware do something.

```js
app.use(function(req, res, next) {
  console.log('hey nice middleware');
  next();
});
```

This middleware is simply going to log a string to the console. To make sure it's working, and to see how middleware works, let's send a request to our server. Use either your browser or CURL from the command line:

```
$ curl :3000
hello express
```

Regardless of how you made the requeset, if you now look in your terminal you should see that our middleware was indeed run because "hey nice middleware" will have been printed to the command line.

## Express and Middleware

The one thing I want you to take away from this lecture is that **an Express app is simply a stack of middleware**. In other words, as the Express website says:

> An Express application is essentially a series of middleware calls.

To see how true this is, let's look at a standard Express route:

```js
app.get('/hello', function(req, res) {
  res.send('Hello route');
});
```

This is a super simple Express route that will respond to a GET request at `/hello` with the text string "hello route".

But what if we want some bit of code to be run on _all_ requests instead of just GET requests to `/hello`? For instance, what if we wanted to implement our own logger that would log the method and path of every request to the command line? That's where middleware comes in.

When we call `app.use` we are saying, "Every time a new request comes in run this function."

### Building a simple logger

To see this in action let's built a simple logger that will output strings of the form:

```
[METHOD] [ROUTE] [DATE]
```

Example:

```
GET / Sun Jan 25 2015 22:27:07 GMT-0800 (PST)
GET /some-route Sun Jan 25 2015 22:27:07 GMT-0800 (PST)
POST /contact Sun Jan 25 2015 22:27:07 GMT-0800 (PST)
```

Using express middleware, we can accomplish this pretty easily:

```js
app.use(function(req, res, next) {
  var date = new Date();
  console.log(req.method + ' ' + req.url + ' ' + date);
  next();
});
```

Now in just five lines of code we've created a rudimentary logging system.

## Important points about middleware

Middleware is super flexible and easy to use, but there are still a few important points that need to be noted.

### Always call `next`

As you've seen in all the middleware examples so far, I make sure to call `next` at the end of the function. What would happen if we didn't call next? Try it out. Remove next from our logging middleware above and run the app. Here's the full source code for `app.js`:

```js
var express = require('express');

var app = express();

app.use(function(req, res, next) {
  var date = new Date();
  console.log(req.method + ' ' + req.url + ' ' + date);
  // WE DIDN'T CALL `next` HERE!!
});

app.get('/', function(req, res) {
  res.send("hello express");
});

app.listen(3000);
```

Run the app, then make a request:

```
node app.js
```

```
curl :3000
```

Now your terminal will just sort of hang and do nothing. You will also see that the logging function was still run, because there will be a log entry in the terminal. This is because your app (`app.js`) received a request, called the logging middleware, logged the output and then... did nothing. The app is waiting for us to either send a response back to the client or call `next`. Since we didn't do either, it just hangs until we hit ctrl-c to stop our server.

So the point is, always call `next`, otherwise you're server will not only not respond but also not give you an error. It will simply do nothing, and leave the browser waiting for a response.

### Order Matters

As the [documentation says][docs]:

> Middleware functions are executed sequentially, therefore the order of middleware inclusion is important.

This is nothing overly complex, but it's important to be aware of. Here's a quick example, again using our logging middleware from above:

```js
var express = require('express');

var app = express();

// Route
app.get('/', function(req, res) {
  res.send("hello express");
});

// Logging middleware added after route
app.use(function(req, res, next) {
  var date = new Date();
  console.log(req.method + ' ' + req.url + ' ' + date);
  next();
});

app.listen(3000);
```

As before, run the app and send a request to the root URL at [localhost:3000](http://localhost:3000). The request that comes back from the server will have the text "hello express" as expected, but if you look at the console you will notice that our middleware did not run. This is because we added it _after_ our route.

**What happened?**

Even though we added the logging middleware _after_ the route, you might think it should still get run after our route is hit, but that's not the case. Calling `res.send` actually ends the request-response cycle, because it sends a response to the client. After the req-res cycle has ended, no more middleware will be called, so our logging middleware never gets executed.

### Middleware can be localized to routes

Global middleware is really useful, but sometimes it would be unecessary to run certain middleware for _all_ routes and methods. That's why Express let's you pass an optional string as the initial argument to `app.use`. Imagine we have an admin area on our website at `/admin`. We want to check to make sure a user is logged in before they access the page. A simple way to accomplish this would be:

```js
app.use('/admin', function(req, res, next) {
  if (!req.user)
    res.redirect('/login');
  else
    next();
});
```

This example assumes that `req.user` will be set if the user is already logged in, as is the case when using [Passport JS](http://passportjs.org/). If there is no user present on the request then the browser will be redirected to login. If there is a user however then the middleware simply calls next and allows the process to continue as normal.

## Routes are just more middleware

Usually when we talk about Express we talk about routes and middleware as separate, because conceptually they are. A "route" typically means the end of the middleware stack, the last response handler that is called and that decides ultimately how to respond to the request. However, to understand Express it's important to understand that routes themselves are also "middleware"—simply functions that get called under certain circumstances.

As an example, take a look at these two completely equivalent "routes". One is written as you would normally write a route, using `app.get` while the other is written as middleware, but the effect is exactly the same:

```js
app.get('/', function(req, res) {
  res.send('hello express');
});
```

```js
app.use('/', function(req, res, next) {
  if (req.method === 'GET')
    res.send('hello express');
  else
    next();
});
```

Using middlware syntax and manually checking the request method is of course more verbose, and certainly not what you want to do in practice. But it's important to realize that Express routes and Express middleware ware actually on in the same. This is why, as mentioned in the docs and above...

> An Express application is essentially a series of middleware calls.

## Error Handling

Until you are comfortable with Express as a "stack" of middleware that get called in the order they were added, it may not be obvious how errors are normally handled. There is no `app.error` method. The way errors are handled is again, through middleware:

```js
// The rest of the app...

app.use(function(req, res, next) {
  res.status(404).send("Oh no, there was an error...");
});
```

This middleware matches any route and any method, and all it does is send an error message to the browser. If you added this at the top of all your middleware your site would continually send this error message to the client. However, by putting this at the very end of our app configuration we can allow all routes that weren't matched by previous middleware to effectively fall through and be caught here.

However, since not every error is a 404, it's important to allow for other errors with other status codes. To accomplish this, Express recognizes middleware with four arguments instead of three as being an error handler.

```js
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send("Oh no, there was an error...");
});
```

In the eyes of Express, this middleware is clearly an error handler because it expects four arguments, the first of which is an error object. **Note:** If you don't manually set a status code 200 will still be the default, which would of course be incorrect for responding with an error. If there is no status set on the `err` object then we default to the generic 500 status code.

So, now we have an error handler but if you restart your server and navigate to a URL that we know there's no router for (ex: "/something") you will get a standard Express error, _NOT_ the custom error we just created. What happened?

Since we aren't using any third party middleware yet, we know every piece of code that's being executed when a request hits the server. As a result, we can see that at no point is an error generated. This is crucial, because errors in Express are not automatic. JavaScript errors will happily bring down your server, but if you want to handle them with easy you will need to manually call the `next` function and pass an error argument. That will let Express execute our custom error handling code as scene above. So, to make sure all 404's do indeed generate an error, we can add a catch-all middleware right above our error handler:

```js
app.use(function(req, res, next) {
  var err = new Error("Page not found!");
  err.status = 404;
  next(err); // Call `next` with an argument
});

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send("Oh no, there was an error...");
});
```

Now if we restart our server we will get the result we want: All errors, 404 or otherwise, will be directed to our final error handler and we will get a response containing the string "Oh no, there was an error...".

### A quick note on triggering errors

In the example above we called `next` with a single `Error` object as the lone argument. To generate an Express error and jump directly to error handling middleware you need only call `next` with a truthy argument. For example:

```js
app.use(function(req, res, next) {

  // All of these would trigger error handling middleware
  next('hey there');
  next(40);
  next(true);

});
```

The only exception to the above is calling `next('route')`. Calling `next` with the special string `'route'` will not cause an error. See [the docs here for more on this][nextdocs].

[nextdocs]: http://expressjs.com/4x/api.html#app.METHOD

## Conclusion

So, once again to reiterate:

> An Express application is essentially a series of middleware calls.

If you remember one thing from this lecture remember that, because it will give you a clear understanding of how Express works and more importantly how to extend it to suite your needs.

That being said, there is currently a plethora of useful middleware in the wild that you will most likely encounter at one point or another if you stick with Express.

### Useful & Common Middleware

**[Body Parser](https://github.com/expressjs/body-parser)**

This is one you're almost certain to see in most Express apps, as it's useful for handling forms as well as AJAX requests.

**[Serve Static](https://github.com/expressjs/body-parser)**

This one makes it easy to statically serve a directory. For example, if you have a `/public` and you would like to put all your static files there (images, css, scripts) then you would want to use the static middleware to field requests for all resources under public. This is so common that the serve-static middleware is actually bundled with Express:

```js
app.use(express.static(__dirname + '/public')));
```

**[Morgan](https://github.com/expressjs/morgan)**

This is flexible logging software that can be used in development or production. Even though as we saw it's quite simple to write your own logging software, it's a better idea to use something standard like Morgan because you can be sure your logs will be well formatted, and it's also one lest thing for you to test.

There's a ton of middleware out there, so whenever you run into a feature that Express doesn't have but you would like chances are there's a middleware module for it.

### Resource Links

* [Official Express Middleware Guide][docs]
* [Official app.use API documentation](http://expressjs.com/api.html#app.use)

[docs]: http://expressjs.com/guide/using-middleware.html

## Outro

As I mentioned in the intro, this guide and all JS source files can be found in the repo on GitHub: [iansinnott/express-middleware-lecture][repo].

This write-up was the content of an interview and guest lecture I had at [Makersquare][makersquare], a JavaScript bootcamp in San Francisco. The Markdown file for the presentation I gave [can be found here][presentation]. The presentation was created for use with [Deckset][deckset], a Mac application for creating slideshows with Markdown.

[makersquare]: http://www.makersquare.com/
[presentation]: https://github.com/iansinnott/express-middleware-lecture/blob/master/presentation.md
[repo]: https://github.com/iansinnott/express-middleware-lecture
[deckset]: http://decksetapp.com/
