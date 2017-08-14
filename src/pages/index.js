import React from 'react';
import Link from 'gatsby-link';

const toJSON = x => JSON.stringify(x, null, 2);

const BlogPostListItem = ({ post }) => (
  <div>
    <Link to={`/${post.slug}`}>{post.frontmatter.title}</Link>
  </div>
);

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

    const { posts } = this.props.data;

    return (
      <div>
        <h1>Dis ma Blög</h1>
        {posts.edges.map(({ node }) =>
          <BlogPostListItem post={node} key={node.internal.contentDigest} />
        )}
      </div>
    );
  }
}

/**
 * NOTE: I'm sorting by filename since all my filenames were generated according
 * to the jekyll convention, so they were meant to be sorted this way. The
 * filename in fact is the source of truth for the publicaton date. However,
 * although the slug is included in the filename the source of truth for the
 * title is still the front matter since capitalization and punctuation is
 * important in the title and is best represented in the front matter rather
 * than the filename.
 *
 * NOTE: Only "published" posts are included in the query because they have
 * filenames of the form YYYY-MM-DD-title.md. The filtering regex matches
 * against this, so any md files without a date in the filename are not included
 * (they are considered drafts).
 */
export const pageQuery = graphql`
  query AllPostsQuery {
    posts: allMarkdownRemark(
      sort: { fields: [fileAbsolutePath], order: DESC }
      filter: {
        fileAbsolutePath: {
          regex: "/\\d\\d\\d\\d-\\d\\d-\\d\\d.+\\.md$/"
        }
      }
    ) {
      edges {
        node {
          slug
          filenameDate
          frontmatter { title }
          internal { contentDigest }
        }
      }
    }
  }
`;
