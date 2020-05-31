import React from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import Link from 'gatsby-link';
import pipe from 'ramda/src/pipe';
import path from 'ramda/src/path';
import classnames from 'classnames/bind';
import 'prismjs/themes/prism.css';

import s from './post.module.styl';
import { format } from '../lib/utils.js';
import Bio from '../components/Bio.js';
import Layout from '../layouts/index.js';

const cx = classnames.bind(s);

const formatDate = pipe(
  (x) => new Date(x),
  format('YYYY-MM-DD'), // What's a pretty format??
);

const getPost = path(['data', 'post']);
const getContext = path(['pageContext']);

const Comments = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <em>
        Thoughts? Let's chat on{' '}
        <a href='https://twitter.com/ian_sinn'>Twitter</a> or via Email :)
      </em>
    </div>
  );
};

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
      <Layout>
        <div className={cx('Post')}>
          <Helmet title={`${post.properties.title} | Ian Sinnott`} />
          <h1>{post.properties.title}</h1>
          <div className={cx('meta')}>
            <p className={cx('date')}>
              <i
                style={{ marginRight: 10 }}
                className='fa fa-calendar-check-o'
              />
              Published: <strong>{formatDate(post.properties.created)}</strong>
            </p>
            <p className={cx('middot')} style={{ margin: '0 1em' }}>
              •
            </p>
            {/* TODO: Where was this data coming from? The markdown plugin? I could calculate myself once I add a plain text or markdown renderer */}
            {/* <p className={cx("timeToRead")}> */}
            {/*   <strong>{post.timeToRead}</strong> min read */}
            {/* </p> */}
          </div>
          <div dangerouslySetInnerHTML={{ __html: post.content_html }} />
          <hr />
          <Bio />
          <hr />
          <PostNav prev={prev} next={next} />
          <hr style={{ marginTop: '2rem' }} />
          <Comments />
        </div>
      </Layout>
    );
  }
}

export default BlogPost;

// NOTE: The $id var is passed in via context in gatsby-node
export const query = graphql`
  query PostById($id: String!) {
    post: notionCollectionPosts(id: { eq: $id }) {
      canonicalURL
      content_html
      properties {
        tags
        created
        title
        disqusId: dsq_thread_id
      }
    }
  }
`;
