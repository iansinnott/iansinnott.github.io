import React from 'react';
import Helmet from 'react-helmet';
import Link from 'gatsby-link';
import pipe from 'ramda/src/pipe';

import { format } from '../lib/utils.js'
import Bio from '../components/Bio.js';

const formatDate = pipe(
  x => new Date(x),
  format('YYYY-MM-DD'), // What's a pretty format??
);

class BlogPostTemplate extends React.Component {
  render() {
    if (this.props.errors && this.props.errors.length) {
      this.props.errors.forEach(({ message }) => {
        console.error(`Blog render errr: ${message}`);
      });
      return (
        <div>
          <h2>Errors</h2>
          <p>See console for details.</p>
        </div>
      );
    }

    const { post } = this.props.data;

    return (
      <div>
        <Helmet title={`${post.frontmatter.title} | Ian Sinnott`} />
        <h1>
          {post.frontmatter.title}
        </h1>
        <p className={'date'}>
          {formatDate(post.frontmatter.created)}
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
  	post: markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        created
        title
      }
  	}
  }
`;
