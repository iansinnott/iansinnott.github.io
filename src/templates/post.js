import React from 'react';
import Helmet from 'react-helmet';
import Link from 'gatsby-link';

import Bio from '../components/Bio.js';

class BlogPostTemplate extends React.Component {
  render() {
    const { post } = this.props.data;

    return (
      <div>
        <Helmet title={`${post.frontmatter.title} | Ian Sinnott`} />
        <h1>
          {post.frontmatter.title}
        </h1>
        <p>
          {post.frontmatter.created}
        </p>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
        <hr />
        <Bio />
      </div>
    );
  }
}

export default BlogPostTemplate;

// NOTE: The $id var is passed in via context in gatsby-node
export const pageQuery = graphql`
  query PostById($id: String!) {
  	markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        created
        title
      }
  	}
  }
`;
