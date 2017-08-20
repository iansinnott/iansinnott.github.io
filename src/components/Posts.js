import React from 'react';
import Link from 'gatsby-link';
import _format from 'date-fns/format';
import pipe from 'ramda/src/pipe';
import classnames from 'classnames/bind';

import s from './Posts.module.styl';
const cx = classnames.bind(s);

// Flip curry
const format = (fmt) => (date) => _format(date, fmt);

const formatDate = pipe(
  x => new Date(x),
  format('YYYY-MM-DD'), // Format tbd
);

const BlogPostListItem = ({ post }) => (
  <div className={cx('BlogPostListItem')}>
    <Link to={`/${post.slug}`}>
      {post.frontmatter.title}{' '}
      <span className={cx('date')}>({formatDate(post.frontmatter.created)})</span>
    </Link>
  </div>
);

const Posts = ({ posts }) => (
  <div className={cx('Posts')}>
    {posts.edges.map(({ node }) =>
      <BlogPostListItem post={node} key={node.internal.contentDigest} />
    )}
  </div>
);

export default Posts;
