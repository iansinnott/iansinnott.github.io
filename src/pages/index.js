import React from 'react';
import { graphql } from 'gatsby';

import Posts from '../components/Posts.js';
import Bio from '../components/Bio.js';
import Layout from '../layouts';

const toJSON = (x) => JSON.stringify(x, null, 2);

const DevErrors = (props) => (
  <div>
    <h1>Errors happened</h1>
    {props.errors.map((err) => (
      <div key={err.message}>
        <p>{err.message}</p>
        <pre>{toJSON(err)}</pre>
      </div>
    ))}
  </div>
);

export default class BlogIndex extends React.Component {
  render() {
    if (this.props.errors && this.props.errors.length) {
      this.props.errors.forEach(({ message }) => {
        console.error(`BlogIndex render errr: ${message}`);
      });
      return DevErrors(this.props);
    }

    return (
      <Layout>
        <h2>Writing</h2>
        <Posts posts={this.props.data.database} />
        <hr style={{ margin: '3rem auto' }} />
        <Bio />
      </Layout>
    );
  }
}

/**
 * NOTE: Only "published" posts are included in the query because they have
 * filenames of the form YYYY-MM-DD-title.md. The filtering regex matches
 * against this, so any md files without a date in the filename are not included
 * (they are considered drafts).
 *
 * TODO: I added a published field in published posts but it's not getting
 * picked up by gql. I'll just keep on working sorting by created for now since
 * I want to get the blog out, but it's something worth looking in to later on.
 * Maybe after Gatsby v2.
 *
 * NOTE: Prettier removes escape sequences in the regex string for some reason,
 * causing a GQL compile error... need to have prettier ignore it.
 */
export const query = graphql`
  query AllPostsQuery {
    database: allNotionCollectionPosts(
      sort: { fields: properties___created, order: DESC }
      filter: { properties: { status: { in: ["published", "staged"] } } }
    ) {
      edges {
        node {
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
`;
