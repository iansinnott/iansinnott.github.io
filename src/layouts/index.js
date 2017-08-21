import React from 'react';
import T from 'prop-types';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';
import classnames from 'classnames/bind';
import 'font-awesome/css/font-awesome.css'

import s from './index.module.styl';
const cx = classnames.bind(s);

import './index.css';
import faceImg from '../assets/face.png';

const gradient = 'linear-gradient(to right, #009688, #3F51B5)';

const Header = () => (
  <div
    style={{
      background: gradient,
      marginBottom: '1.45rem',
    }}>
    <div
      style={{
        margin: '0 auto',
        maxWidth: 960,
        padding: '1.45rem 1.0875rem',
      }}>
      <h1 className={cx('mainHeader')} style={{ margin: 0 }}>
        <Link
          to='/'
          style={{
            color: 'white',
            textDecoration: 'none',
          }}>
          <img className={cx('face')} src={faceImg} alt='An image of my face for the website' />
          Ian Sinnott
        </Link>
      </h1>
    </div>
  </div>
);

const TemplateWrapper = ({ children }) => (
  <div>
    <Helmet
      title='Gatsby Default Starter'
      meta={[
        { name: 'description', content: 'Sample' },
        { name: 'keywords', content: 'sample, something' },
      ]}
    />
    <Header />
    <div
      style={{
        margin: '0 auto',
        maxWidth: 960,
        padding: '0px 1.0875rem 1.45rem',
        paddingTop: 0,
      }}>
      {children()}
    </div>
  </div>
);

TemplateWrapper.propTypes = {
  children: T.func,
};

export default TemplateWrapper;
