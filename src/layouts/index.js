import React from 'react';
import T from 'prop-types';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';
import classnames from 'classnames/bind';
import 'font-awesome/css/font-awesome.css';

import './index.css';
import './notion.css';
import { ParrotTwitterLink } from '../components/shared';
import faceImg from '../assets/face.png';
import s from './index.module.styl';
const cx = classnames.bind(s);

const Header = () => {
  const waves =
    'M2000,154 L2000,179 L1109,179 C1099,179 1092,179 1087,179 C1080,179 1072,178 1066,178 C1062,178 1063,180 1059,180 C1056,180 1052,178 1049,178 C1045,178 1042,179 1040,180 C1039,181 1035,178 1033,180 C1032,181 1031,181 1030,181 C1028,180 1028,179 1027,178 C1024,176 1020,179 1015,181 C1010,183 1007,176 1006,175 C1005,173 1004,173 1003,173 C1001,173 1000,173 999,175 C998,176 996,180 992,181 C985,183 981,177 978,178 C976,179 977,180 975,181 C974,181 973,181 973,180 C972,178 970,177 969,178 C968,178 967,180 965,180 C961,180 960,178 956,178 C953,177 952,179 949,179 C945,179 943,178 939,178 C933,178 925,179 918,179 C913,179 9,179 0,179 L0,154';
  const flat =
    'M2000,151 L2000,179 L1109,179 C1099,179 1092,179 1087,179 C1080,179 1072,179 1066,179 C1062,179 1063,179 1059,179 C1056,179 1052,179 1049,179 C1045,179 1042,179 1040,179 C1039,179 1035,179 1033,179 C1032,179 1031,179 1030,179 C1028,179 1028,179 1027,179 C1024,179 1020,179 1015,179 C1010,179 1007,179 1006,178 C1005,178 1004,178 1003,178 C1001,178 1000,178 999,178 C998,179 996,179 992,179 C985,179 981,179 978,179 C976,179 977,179 975,179 C974,179 973,179 973,179 C972,179 970,179 969,179 C968,179 967,179 965,179 C961,179 960,179 956,179 C953,179 952,179 949,179 C945,179 943,179 939,179 C933,179 925,179 918,179 C913,179 9,179 0,179 L0,151';

  return (
    <div
      className={cx('Header')}
      style={{
        marginBottom: '1.45rem',
      }}>
      <svg
        width='2000px'
        height='15px'
        viewBox='0 0 2000 15'
        version='1.1'
        xmlns='http://www.w3.org/2000/svg'
        xmlnsXlink='http://www.w3.org/1999/xlink'>
        <defs>
          <linearGradient x1='50%' y1='0%' x2='50%' y2='100%' id='grady'>
            <stop
              stopColor='rgb(166, 239, 239)'
              stopOpacity='1'
              offset='0%'></stop>
            <stop
              stopColor='rgb(166, 239, 239)'
              stopOpacity='0.541876093'
              offset='100%'></stop>
          </linearGradient>
        </defs>
        <g
          id='art'
          transform='translate(0.000000, -172.000000)'
          stroke='#009688'
          fill='#D7F5F6'>
          <path d={waves} id='main'>
            <animate
              attributeName='d'
              dur='0.4'
              repeatCount='indefinite'
              repeatDur='2s'
              restart='always'
              fill='freeze'
              values={`${waves};${flat};${waves}`}
            />
          </path>
        </g>
      </svg>
      <div
        style={{
          margin: '0 auto',
          maxWidth: 960,
          padding: '1.45rem 1.0875rem',
        }}>
        <div className={cx('mainHeader')}>
          <h1 style={{ margin: 0 }}>
            <Link
              to='/'
              style={{
                textDecoration: 'none',
                fontWeight: 300,
              }}>
              <img
                className={cx('face')}
                src={faceImg}
                alt='An image of my face for the website'
              />
              Ian Sinnott
            </Link>
          </h1>
          <div className={cx('links')}>
            <ParrotTwitterLink />
          </div>
        </div>
      </div>
    </div>
  );
};

const TemplateWrapper = ({ children }) => (
  <div style={{ overflow: 'hidden' }}>
    <Helmet
      title='Ian Sinnott'
      meta={[
        {
          name: 'description',
          content:
            'I write about life and my mistakes and successes in business.',
        },
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
      {children}
    </div>
  </div>
);

export default TemplateWrapper;
