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
    filenameDate: {
      type: GraphQLString,
      resolve: getFileDate,
    },
    filename: {
      type: GraphQLString,
      resolve: getFilename,
    },
  });
};

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators;

  return new Promise((resolve, reject) => {
    const postTemplate = path.resolve('./src/templates/post.js');
    resolve(
      graphql(`
        query RenderPostsQuery {
          posts: allMarkdownRemark(limit: 1000) {
            edges {
              node { id slug }
            }
          }
        }
    `)
      .then(result => {
        if (result.errors) {
          console.log(result.errors);
          return reject(result.errors);
        }

        // Create blog posts pages.
        result.data.posts.edges.forEach(({ node }) => {
          createPage({
            path: `/${node.slug}/`,
            component: postTemplate,
            context: { id: node.id }, // Context will be passed in to the page query as graphql vars
          });
        });

        return resolve();
      })
    );
  });
};
