# My Blog

## Commands

* Dev: `yarn dev`
* Build: `yarn build`
* Deploy to live blog: `yarn deploy`

🚧 **NOTE** 🚧

Although the project will build normally with node you will also need `pipenv` installed in order to run the post-deploy script, which updates the rows that were just uploaded (but weren't there before) in Notion.

## Content Creation

* Create a new post: `yarn post <title>`
* Create a new draft of a post: `yarn draft <title>`

**NOTE:** Until I add a script to publish existing drafts the `draft` command isn't too convenient.

## Getting Started

First, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.