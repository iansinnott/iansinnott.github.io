import React from "react";
import Link from "gatsby-link";
import pipe from "ramda/src/pipe";
import prop from "ramda/src/prop";
import path from "ramda/src/path";
import sort from "ramda/src/sort";
import toPairs from "ramda/src/toPairs";
import map from "ramda/src/map";
import reduce from "ramda/src/reduce";
import groupBy from "ramda/src/groupBy";
import classnames from "classnames/bind";

import s from "./Posts.module.styl";
import { format } from "../lib/utils.js";
const cx = classnames.bind(s);

const formatDate = pipe(
  (x) => new Date(x),
  format("YYYY-MM-DD") // Format tbd
);

// Turn a date string (string! not date) into it's string year representation
const getYear = pipe((x) => new Date(x), format("YYYY"));

const BlogPostListItem = ({ post }) => (
  <div className={cx("BlogPostListItem")}>
    <Link to={`/${post.slug}/`}>{post.frontmatter.title}</Link>
  </div>
);

// Operate on date first. Need an array of arrays where each array represents
// all the posts for a given year. So I can group by year using date-fns and
// created.
// NOTE: Sort then reverse is not the most efficient
const nodesByYear = pipe(
  groupBy(pipe(path(["frontmatter", "created"]), getYear)), // Group by year published
  toPairs, // Use tuple form
  sort((a, b) => (a[0] < b[0] ? 1 : -1)) // Sort by string year, latest first
);

const renderPosts = pipe(
  prop("edges"),
  map(prop("node")),
  nodesByYear,
  map(([year, posts]) => (
    <div key={year} className={cx("postsByYear")}>
      <div className={cx("year")}>{year}</div>
      <div className={cx("innerPosts")}>
        {posts.map((node) => (
          <BlogPostListItem post={node} key={node.internal.contentDigest} />
        ))}
      </div>
    </div>
  ))
);

const Posts = ({ posts }) => (
  <div className={cx("Posts")}>{renderPosts(posts)}</div>
);

export default Posts;
