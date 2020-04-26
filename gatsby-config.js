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
 *
 * NOTE: I'm still not sure if the order of these plugins is important...
 */
module.exports = {
  siteMetadata: {
    title: 'Ian Sinnott',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: '@iansinnott/gatsby-source-notion-collection',
      options: require('./config.js'),
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: ['gatsby-remark-prismjs', 'gatsby-remark-autolink-headers'],
      },
    },
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
    `gatsby-plugin-client-side-redirect`, // keep it last in list
  ],
};
