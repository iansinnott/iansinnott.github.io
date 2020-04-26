const {
  NOTION_NODE_PREFIX,
} = require("gatsby-source-notion-collection/lib/helpers");
const path = require("path");
const {
  match,
  head,
  map,
  filter,
  replace,
  pipe,
  path: keyPath,
} = require("ramda");
const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLInt,
  GraphQLEnumType,
} = require("graphql");

const getSlugFromNotion = pipe(
  (x) => x.properties.title,
  (x) => x.toLowerCase(),
  (x) => x.split(" "),
  map(
    pipe(
      (x) => x.replace(/&/g, "and"),
      (x) => x.replace(/[^A-Za-z0-9_-]/g, ""), // Remove non-alnum
      (x) => x.trim()
    )
  ),
  filter((x) => Boolean(x)),
  (xs) => xs.join("-")
);

const getCanonicalURLFromNotion = pipe(
  getSlugFromNotion,
  (slug) => `https://blog.iansinnott.com/${slug}/`
);

exports.setFieldsOnGraphQLNodeType = ({
  type,
  store,
  pathPrefix,
  getNode,
  cache,
}) => {
  if (type.name.startsWith(NOTION_NODE_PREFIX)) {
    return Promise.resolve({
      canonicalURL: {
        type: GraphQLString,
        resolve: getCanonicalURLFromNotion,
      },
      slug: {
        type: GraphQLString,
        resolve: getSlugFromNotion,
      },
    });
  }

  return {};
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const postTemplate = path.resolve("./src/templates/post.js");
  const result = await graphql(`
    query RenderPostsQuery {
      database: allNotionDbPosts(
        sort: { fields: properties___created, order: DESC }
        filter: { properties: { status: { in: ["published", "staged"] } } }
      ) {
        edges {
          node {
            id
            slug
          }
          next {
            id
            slug
            properties {
              title
              created
            }
          }
          previous {
            id
            slug
            properties {
              title
              created
            }
          }
        }
      }
    }
  `);

  if (result.errors) {
    console.log(result.errors);
    throw new Error("Things broke, see console output above");
  }

  // Create blog posts pages.
  //
  // NOTE: Prev and next are reversed here. To me, "prev" means a post in the past
  // and "next" means a post in the future. Prev and next are reversed in the data
  // so I reverse them here to make more sense as I see it.
  result.data.database.edges.forEach(({ node, next, prev }) => {
    debugger;
    createPage({
      path: `/${node.slug}/`,
      component: postTemplate,
      context: {
        // Context will be passed in to the page query as graphql vars
        id: node.id,
        next: prev, // See NOTE
        prev: next,
      },
    });
  });

  const redirects = [
    [
      "wordpress-development-server-full-set-up-guide",
      "wordpress-development-server---full-set-up-guide",
    ],
    ["vim-awesome", "vim-its-awesome"],
    [
      "using-keyremap4macbooks-private-xml",
      "using-key-remap-4-macbooks-privatexml",
    ],
    [
      "solving-a-problem-is-the-biggest-win",
      "solving-problems-is-the-biggest-win",
    ],
    ["page-reloads-thing-past", "page-reloads-are-a-thing-of-the-past"],
    [
      "migrating-a-blog-to-gatsby-part-2-of-gatsby-migration",
      "migrating-my-blog-to-gatsby-part-2-of-gatsby-migration",
    ],
    ["life-upgrades-4-13", "life-upgrades-and-reasons-to-write-more"],
    ["learn-vim-code-like-a-boss", "learn-vim-and-code-like-a-boss"],
    ["learn-vim-code-like-a-boss", "learn-vim-and-code-like-a-boss"],

    // Yeah... this was the URL for a very long time as far as I can tell
    ["super-birthday-post", "jekyll-theming-like-a-boss-with-gulp"],

    [
      "integrating-alfred-and-keyboard-maestro",
      "integrating-alfred-with-keyboard-maestro",
    ],
    ["going-fully-https-fo-free", "going-fully-https-ssl-fo-free"],
    ["how-to-nearly-give-up-coffee", "how-i-nearly-gave-up-coffee"],
    ["im-famous-on-gobodylanguage-com", "im-famous-on-gobodylanguagecom"],
    [
      "startup-idea-feedback-week",
      "from-startup-idea-to-invalidation-in-a-week",
    ],
    ["custom-post-types-a-great", "custom-post-types-a-great-article"],
    ["dokku-mongo-node", "dokku-mongo-and-nodejs"],
    ["engineer-maker-or-both", "programmer-maker-or-both"],
  ];

  const ROOT_PATH = "/";

  redirects
    .map((arr) => arr.map((x) => ROOT_PATH + x)) // Prepend the root slash on all
    .forEach(([fromPath, toPath]) => {
      actions.createRedirect({ fromPath, toPath, isPermanent: true });
    });

  // What should I return here??
};
