---
title: Migrating to GatsbyJS Part 1
date: 2017-07-09 10:44:59
tags:
  - javascript
  - webpack
  - gatsby
  - migration
---

**Abstract:** Migrating a static site to [Gatsby][] is pretty simple. I'll walk through how I did it and the pitfalls along the way.

[Gatsby 1.0][Gatsby] was just recently published and I got excited. I've been excited about static sites for _a while_, especially in combination with React. I've [spoken publicly about building static sites with React](https://www.youtube.com/watch?v=_1k2HEPH6fY) and two of my top repositories on GitHub are just for building static sites with React...

![Blurred Repos](https://dropsinn.s3.amazonaws.com/blurred-repos.png)

So I was pretty pumped to see Gatsby hit 1.0. And so far it has not disappointed.

## Migrating to Gatsby 1.0

OK, enough context! Let's migrate something. I chose to start by migrating [my personal site](https://www.iansinnott.com) since it's already built with React and is literally 1 page. Here it is—the entire site:

![Home page screenshot](https://dropsinn.s3.amazonaws.com/www.iansinnott.com-screenshot-2017-07-09.png)

### Adding Gatsby to an exiting project

Step 1 is to **install Gatsby**. I'm also adding `gatsby-link` and the react helmet plugin because I knew I would need them:

```
yarn add gatsby gatsby-link gatsby-plugin-react-helmet
```

**Create a `gatsby-config.js` file** in the project root and drop the following into it:

```js
// gatsby-config.js
module.exports = {
  siteMetadata: {
    title: `Gatsby Default Starter`,
  },
  plugins: [`gatsby-plugin-react-helmet`],
}
```

**Run Gatsby** to make sure everything is working.

```
gatsby develop
```

This will start a local server. Point your browser to whatever local port it gives you and try it out. You should see a Gatsby 404 page. This is because it expects your source code to be in the `src/` directory. In my project all my source is in my `client/` directory so Gatsby has nothing to find.

However, when I loaded up the dev server in the browser I was greeted by this hot error 😐 (note, this may well not happen for you):

![Gatsby dev server build error](https://dropsinn.s3.amazonaws.com/Screen%20Shot%202017-07-08%20at%2012.07.49%20PM.png)

If you _do_ see something like that not to worry. It's an issue with conflicting versions of react-proxy probably resulting from differing versions of react-hot-loader. You can check this with `npm ls react-proxy`. Anyway, blow away your `node_modules` folder and install from scratch. Also check your `package.json` dependencies to make sure you aren't depending on any hot loading packages. In fact, now would be a good time to remove almost all your devDependencies from package.json. Gatsby is an entire build pipeline that will take care of most things for you, so consider critically every one of your dev dependencies. After manually pruning mine looked like this:

```
"devDependencies": {
  "babel-eslint": "^7.2.3",
  "eslint": "^4.1.1",
  "eslint-config-zen": "^3.0.0",
  "eslint-plugin-flowtype": "^2.34.1",
  "eslint-plugin-react": "^7.1.0"
},
```

Yup, all loaders and plugins are gone. Gatsby isn't even in this list because it's a full-blown dependency, not just a devDependency.

So, once you've cleared out your old dev dependencies do a fresh install. Then restart the dev server:

```
yarn upgrade
gatsby develop
```

You should see the correct 404 page in your browser.

### Moving source code around

Here is the structure of my source code before and after the migration. I'm putting them together here for easy comparison, but I will walk through all of what changed.

**Before:**

```
.
├── client
│   ├── components
│   │   ├── App.js
│   │   ├── App.styl
│   │   ├── face.png
│   │   └── favicon.ico
│   ├── lib
│   │   └── vars.styl
│   ├── index.js
│   └── routes.js
├── package.json
├── template.js
├── webpack.config.dev.js
└── webpack.config.prod.js
```

**After:**

```
.
├── src
│   ├── components
│   │   ├── App.styl
│   │   ├── face.png
│   │   └── favicon.ico
│   ├── layouts
│   │   └── index.js
│   ├── lib
│   │   └── vars.styl
│   ├── pages
│   │   ├── 404.js
│   │   └── index.js
│   └── html.js
├── gatsby-config.js
└── package.json
```

Let's start with the quick wins:

* We no longer need webpack config so remove them:
  `rm webpack.*`
* Gatsby expects everything under the `src` directory so let's make that happen
  `mv client src`
* Create `layouts` and `pages` directories under `src`
  `mkdir -p src/layouts`
  `mkdir -p src/pages`

Now let's talk about those directories:

* `src/layouts/`: Is where you put wrapper components. Markup that will generally "go around" your individual pages. This usually means headers and footers.
* `src/pages/`: This is the meat of a Gatsby site. It's where the content goes. The rule of thumb is that you should construct your `src/pages` directory to build your URLs.

For my purposes I had one layout and one index page. Of course I also wanted a 404 page so I created all three. This meant a bit of refactoring since I had everything together in `App.js`.

I'm migrating from React Router so let's take a quick look at my route config:

```jsx
export const routes = (
  <Route path=‘/' component={App}>
    <IndexRoute component={Home} />
    <Route path='*' component={NotFound} />
  </Route>
);
```

Pretty simple right? When migrating over to Gatsby these components had a direct mapping to files in the new structure:

* `App` -> `layouts/index.js`
* `Home` -> `pages/index.js`
* `NotFound` -> `pages/404.js`

Migrating your components will be specific to your project so I'll just point you to the minimal gatsby example which includes all the relevant files: [examples/no-plugins](https://github.com/gatsbyjs/gatsby/tree/v1.0.8/examples/no-plugins).

## CSS and Stylus support

Up until this point I had commented out all my CSS and [Stylus][] imports since I figured they might cause issues. In the case of CSs this fear was unfounded. Gatsby does a great job of handling CSS imports right out of the box.

However I was using [Stylus][] along with [CSS Modules][] which is a bit more complicated. Turns out there was actually _zero support_ for Stylus with Gatsby, **but** Gatsby is highly extensible so...

Time to write a plugin. I'll skip over most of the details here since you view the source code of the plugin I wrote directly. But a neat feature of Gatsby is that you create a `plugins/` directory in your own project and extend Gatsby right there. This is a really nice developer experience and it makes it easy to write a plugin that can then be contributed back to the Gatsby community later.

So, after all the changes above and creating the stylus plugin my project looked like this:

```
.
├── plugins
│   └── gatsby-plugin-stylus
│       ├── gatsby-node.js
│       └── package.json
├── src
│   ├── components
│   │   ├── App.styl
│   │   ├── face.png
│   │   └── favicon.ico
│   ├── layouts
│   │   └── index.js
│   ├── lib
│   │   └── vars.styl
│   ├── pages
│   │   ├── 404.js
│   │   └── index.js
│   └── html.js
├── gatsby-config.js
├── package.json
└── yarn.lock
```

And it worked 🎉.

As for the stylus plugin, there's currently [a pull request](https://github.com/gatsbyjs/gatsby/pull/1437) to get it merged in. Once it's merged you can use stylus by just installing the plugin:

```
yarn install gatsby-plugin-stylus
```

## Final Polish

After getting everything working properly the last step was to add a few things I had neglected while refactoring:

**Analytics:** I've been using Google Analytics on my site all along so I needed to get that working I just needed to add the `gatsby-plugin-google-analytics` plugin.

```
{
  resolve: 'gatsby-plugin-google-analytics',
  options: {
    trackingId: 'UA-<MY_TRACKING_ID>',
  },
},
```

**Titles and meta tags**

[react-helmet][] is great for this and Gatsby recognizes it. Just add the `gatsby-plugin-react-helmet` and your good to go. See the react-helmet docs for how to actually use it.

[react-helmet]: https://github.com/nfl/react-helmet/

**Final `gatsby-config.js`:**

```
// Gatsby
module.exports = {
  siteMetadata: {
    title: 'Ian Sinnott',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-stylus',
      options: {
        modules: true,
      },
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-<MY_TRACKING_ID>',
      },
    },
  ],
};
```

That's all. If you have an questions you can leave a commend or [find me on twitter](https://twitter.com/ian_sinn).

---

P.S. You may have noticed that this was a super simple site (one page!) and that this is "Part 1". I plan to migrate this blog you're reading right now to Gatsby and do a Part 2 write up about that. It will be a much more real-world use case of Gatsby and will use the awesome GraphQL infrastructure Gatsby gives you 😋

[Gatsby]: https://www.gatsbyjs.org/
[Stylus]: http://stylus-lang.com/
[CSS Modules]: https://github.com/webpack-contrib/css-loader#modules
