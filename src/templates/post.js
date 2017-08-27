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

const Comments = ({ disqusId, pageURL }) => {
  const disqus = `
<div id='disqus_thread'></div>
<script>
  var disqus_config = function () {
    ${pageURL ? `this.page.url = "${pageURL}"` : ''}
    ${disqusId ? `this.page.identifier = "${disqusId}"` : ''}
  };
  (function() { // DON'T EDIT BELOW THIS LINE
    var d = document, s = d.createElement('script');
    s.src = 'https://EXAMPLE.disqus.com/embed.js';
    s.setAttribute('data-timestamp', +new Date());
    (d.head || d.body).appendChild(s);
  })();
</script>
<noscript>Please enable JavaScript to view the <a href="https://disqus.com/?ref_noscript">comments powered by Disqus.</a></noscript>
`.trim();
  return (
    <div className={cx('Comments')} dangerouslySetInnerHTML={{ __html: disqus }} />
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
      <div className={cx('Post')}>
        <Helmet title={`${post.frontmatter.title} | Ian Sinnott`} />
        <h1>
          {post.frontmatter.title}
        </h1>
        <div className={cx('meta')}>
          <p className={cx('date')}>
            <i style={{ marginRight: 10 }} className='fa fa-calendar-check-o'></i>
            Published: <strong>{formatDate(post.frontmatter.created)}</strong>
          </p>
          <p className={cx('middot')} style={{ margin: '0 1em'}}>•</p>
          <p className={cx('timeToRead')}>
            <strong>{post.timeToRead}</strong> min read
          </p>
        </div>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
        <hr />
        <Bio />
        <hr />
        <PostNav prev={prev} next={next} />
        <hr style={{ marginTop: '2rem' }} />
        <Comments disqusId={post.frontmatter.disqusId} pageURL={post.canonicalURL} />
      </div>
    );
  }
}

export default BlogPost;

// NOTE: The $id var is passed in via context in gatsby-node
export const pageQuery = graphql`
  query PostById($id: String!) {
  	post: markdownRemark(id: { eq: $id }) {
      timeToRead
      canonicalURL
      html
      frontmatter {
        created
        title
        disqusId: dsq_thread_id
      }
  	}
  }
`;
