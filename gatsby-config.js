const rupture = require('rupture');
const path = require('path');
const cheerio = require('cheerio');

const pipe = require('ramda/src/pipe');
const tryCatch = require('ramda/src/tryCatch');

// NOTE I initially wanted to put this in setFieldsOnGraphQLNodeType but it
// wasn't working and debugger wasn't firing so NVM!
const getExcerptFromNotion = tryCatch(
  pipe(
    (x) => {
      const text = cheerio.load(x).text();
      return text;
    },
    (x) => x.replace(/\n+/g, ''),
    (x) => x.split(' '),
    (xs) => xs.slice(0, 55), // Supposedly 55 words is the default for wordpress, so I'm going with it
    (xs) => xs.join(' '),
  ),
  (err) => {
    console.error('[ERR] Could not extract excerpt', err);
    return '';
  },
);

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
    description: 'The personal blog of Ian Sinnott',
    siteUrl: 'https://blog.iansinnott.com',
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
      resolve: 'gatsby-plugin-feed',
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
              }
            }
          }
        `,
        // https://www.gatsbyjs.com/docs/adding-an-rss-feed/
        feeds: [
          {
            serialize: ({ query: { site, database } }) => {
              return database.edges.map(({ node }) => {
                const url = node.canonicalURL;
                return {
                  title: node.properties.title,
                  description: getExcerptFromNotion(node),
                  date: node.properties.created,
                  url,
                  guid: url, // Using url as guid was the idea of gatsby docs. Just going with it
                  custom_elements: [{ 'content:encoded': node.content_html }],
                };
              });
            },
            query: `
              query RSSFeedQuery {
                database: allNotionCollectionPosts(
                  sort: { fields: properties___created, order: DESC }
                  filter: { properties: { status: { in: ["published", "staged"] } } }
                ) {
                  edges {
                    node {
                      id
                      slug
                      content_html
                      canonicalURL
                      properties {
                        title
                        created
                      }
                    }
                  }
                }
              }
            `,
            output: '/rss.xml',
            title: "Ian's RSS Feed",
          },
        ],
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
