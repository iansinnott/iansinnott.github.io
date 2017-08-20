const path = require('path');
const { match, head, replace, pipe, path: keyPath } = require('ramda');
const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLInt,
  GraphQLEnumType,
} = require('graphql');

const getFilename = pipe(
  keyPath(['fileAbsolutePath']),
  path.basename
);

// What if two blog posts share a slug though...
const getSlug = pipe(
  getFilename,
  replace(/^\d\d\d\d-\d\d-\d\d-/, ''), // Strip leading date
  replace(/\.md$/, '') // Strip trailing extension
);

const getFileDate = pipe(
  getFilename,
  match(/^\d\d\d\d-\d\d-\d\d/),
  head,
  x => new Date(x).toString()
);

exports.setFieldsOnGraphQLNodeType = ({
  type,
  store,
  pathPrefix,
  getNode,
  cache,
}) => {
  if (type.name !== 'MarkdownRemark') {
    return {};
  }

  return Promise.resolve({
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

exports.createPages = async ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators;
  const postTemplate = path.resolve('./src/templates/post.js');
  const result = await graphql(`
      query RenderPostsQuery {
        posts: allMarkdownRemark(limit: 1000) {
          edges {
            node { id slug }
          }
        }
      }
  `);

  if (result.errors) {
    console.log(result.errors);
    throw new Error('Things broke, see console output above');
  }

  // Create blog posts pages.
  result.data.posts.edges.forEach(({ node }) => {
    createPage({
      path: `/${node.slug}/`,
      component: postTemplate,
      context: { id: node.id }, // Context will be passed in to the page query as graphql vars
    });
  });

  // What should I return here??
};
