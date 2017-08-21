import React from 'react';
import Link from 'gatsby-link';
import pipe from 'ramda/src/pipe';
import prop from 'ramda/src/prop';
import path from 'ramda/src/path';
import sort from 'ramda/src/sort';
import toPairs from 'ramda/src/toPairs';
import map from 'ramda/src/map';
import reduce from 'ramda/src/reduce';
import groupBy from 'ramda/src/groupBy';
import classnames from 'classnames/bind';

import s from './Posts.module.styl';
const cx = classnames.bind(s);
import { format } from '../lib/utils.js'

const formatDate = pipe(
  x => new Date(x),
  format('YYYY-MM-DD'), // Format tbd
);

// Turn a date string (string! not date) into it's string year representation
const getYear = pipe(
  x => new Date(x),
  format('YYYY')
);

const BlogPostListItem = ({ post }) => (
  <div className={cx('BlogPostListItem')}>
    <Link to={`/${post.slug}`}>
      {post.frontmatter.title}
    </Link>
  </div>
);

// Operate on date first. Need an aarray of arrays where each array represents
// all the posts for a given year. So I can group by year using date-fns and
// created.
const nodesByYear = pipe(
  groupBy(pipe(path(['frontmatter', 'created']), getYear)), // Group by year published
  toPairs, // Use tuple form
  sort(prop(0)), // Sort by year, latest first
);

const renderPosts = pipe(
  prop('edges'),
  map(prop('node')),
  nodesByYear,
  map(([ year, posts ]) => (
    <div className={cx('postsByYear')}>
      <div className={cx('year')}>{year}</div>
      <div className={cx('innerPosts')}>
        {posts.map(node => (
          <BlogPostListItem post={node} key={node.internal.contentDigest} />
        ))}
      </div>
    </div>
  ))
);

const Posts = ({ posts }) => (
  <div className={cx('Posts')}>
    {renderPosts(posts)}
  </div>
);

export default Posts;
