const rupture = require('rupture');
const path = require('path');

/**
 * NOTE: options.name in the source filesystem plugin translates to
 * `sourceInstanceName` in the graphql query
 *
 * Example query to get only 'posts':
 *
 *  {
 *    files: allFile(limit: 3, sort: {fields: name, order: DESC}, filter: {sourceInstanceName: {eq: "posts"}}) {
 *      edges {
 *        node {
 *          id
 *          name
 *          sourceInstanceName
 *        }
 *      }
 *    }
 *  }
 */
module.exports = {
  siteMetadata: {
    title: 'Ian Sinnott',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'posts', // See NOTE
        path: path.resolve('./content/_posts'),
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'drafts',
        path: path.resolve('./content/_drafts'),
      },
    },
    {
      resolve: 'gatsby-plugin-stylus',
      options: {
        use: [rupture()],
      },
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-52511246-1',
      },
    },
  ],
};

