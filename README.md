# My Blog

## Dev

* Dev: `yarn start`
* Build: `yarn build`
* Deploy to live blog: `yarn deploy`

🚧 **NOTE** 🚧

Although the project will build normally with node you will also need `pipenv` installed in order to run the post-deploy script, which updates the rows that were just uploaded (but weren't there before) in Notion.

## Content Creation

* Create a new post: `yarn post <title>`
* Create a new draft of a post: `yarn draft <title>`

**NOTE:** Until I add a script to publish existing drafts the `draft` command isn't too convenient.
