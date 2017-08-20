import React from 'react';

import Posts from '../components/Posts.js';

const toJSON = x => JSON.stringify(x, null, 2);

const DevErrors = props => (
  <div>
    <h1>Errors happened</h1>
    {props.errors.map(err => (
      <div key={err.message}>
        <p>{err.message}</p>
        <pre>
          {toJSON(err)}
        </pre>
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

    console.log(this.props);

    return (
      <div>
        <h2>I wrote these</h2>
        <Posts posts={this.props.data.posts} />
      </div>
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
 */
export const pageQuery = graphql`
  query AllPostsQuery {
    posts: allMarkdownRemark(
      sort: { fields: [frontmatter___created], order: DESC }
      filter: {
        fileAbsolutePath: {
          regex: "/\\d\\d\\d\\d-\\d\\d-\\d\\d.+\\.md$/"
        }
      }
    ) {
      edges {
        node {
          slug
          frontmatter { title created }
          internal { contentDigest }
        }
      }
    }
  }
`;
