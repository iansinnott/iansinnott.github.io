import React from 'react';
import Helmet from 'react-helmet';
import Link from 'gatsby-link';
import pipe from 'ramda/src/pipe';
import path from 'ramda/src/path';
import classnames from 'classnames/bind';
import 'prismjs/themes/prism.css';

import s from './post.module.styl';
const cx = classnames.bind(s);

import { format } from '../lib/utils.js'
import Bio from '../components/Bio.js';

const formatDate = pipe(
  x => new Date(x),
  format('YYYY-MM-DD'), // What's a pretty format??
);

const getPost = path(['data', 'post']);
const getContext = path(['pathContext']);

const PostNav = ({ prev, next }) => (
  <div className={cx('PostNav')}>
    {prev && <Link to={`/${prev.slug}/`}>Prev</Link>}
    <Link to='/'>All Posts</Link>
    {next && <Link to={`/${next.slug}/`}>Next</Link>}
  </div>
);

class BlogPost extends React.Component {
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

    const post = getPost(this.props);
    const { next, prev } = getContext(this.props); // Not to be confused with react context...

    return (
      <div className={cx('Post')}>
        <Helmet title={`${post.frontmatter.title} | Ian Sinnott`} />
        <h1>
          {post.frontmatter.title}
        </h1>
        <p className={cx('date')}>
          <i style={{ marginRight: 10 }} className='fa fa-calendar-check-o'></i>
          Published: <strong>{formatDate(post.frontmatter.created)}</strong>
        </p>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
        <hr />
        <Bio />
        <hr />
        <PostNav prev={prev} next={next} />
      </div>
    );
  }
}

export default BlogPost;

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
