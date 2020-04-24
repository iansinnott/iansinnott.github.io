const path = require("path");
const { match, head, replace, pipe, path: keyPath } = require("ramda");
const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLInt,
  GraphQLEnumType,
} = require("graphql");

const getFilename = pipe(keyPath(["fileAbsolutePath"]), path.basename);

// What if two blog posts share a slug though...
const getSlug = pipe(
  getFilename,
  replace(/^\d\d\d\d-\d\d-\d\d-/, ""), // Strip leading date
  replace(/\.md$/, "") // Strip trailing extension
);

const getFileDate = pipe(getFilename, match(/^\d\d\d\d-\d\d-\d\d/), head, (x) =>
  new Date(x).toString()
);

/**
 * I currently only use this for passing to disqus, but it's good to have a
 * clear idea of what my current canonical urls are. In the future if I were
 * ever to change these urls it will be good to know what I'm migrating from.
 */
const getCanonicalURL = pipe(
  getSlug,
  (slug) => `https://blog.iansinnott.com/${slug}/`
);

exports.setFieldsOnGraphQLNodeType = ({
  type,
  store,
  pathPrefix,
  getNode,
  cache,
}) => {
  if (type.name !== "MarkdownRemark") {
    return {};
  }

  return Promise.resolve({
    canonicalURL: {
      type: GraphQLString,
      resolve: getCanonicalURL,
    },
    slug: {
      type: GraphQLString,
      resolve: getSlug,
    },
    filename: {
      type: GraphQLString,
      resolve: getFilename,
    },
  });
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const postTemplate = path.resolve("./src/templates/post.js");
  const result = await graphql(`
    query RenderPostsQuery {
      posts: allMarkdownRemark(
        limit: 1000
        sort: { fields: [frontmatter___created], order: DESC }
        filter: { frontmatter: { created: { ne: null } } }
      ) {
        edges {
          node {
            id
            slug
          }
          next {
            frontmatter {
              title
              created
            }
            slug
          }
          prev: previous {
            frontmatter {
              title
              created
            }
            slug
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
  result.data.posts.edges.forEach(({ node, next, prev }) => {
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

  // What should I return here??
};
