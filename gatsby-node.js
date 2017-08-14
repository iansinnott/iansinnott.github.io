const { basename } = require('path');
const { match, head, replace, pipe, path } = require('ramda');
const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLInt,
  GraphQLEnumType,
} = require('graphql');

const getFilename = pipe(
  path(['fileAbsolutePath']),
  basename
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
