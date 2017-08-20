import React from 'react';
import classnames from 'classnames/bind';

import s from './Bio.module.styl';
const cx = classnames.bind(s);

const Bio = () => (
  <div className={cx('Bio')}>
    <h3>About me</h3>
    <p>
      I'm Ian. I'm a software engineer and I'm all about javascript, funcitonal
      programming and building simple systems. If you want to chat you can find me on Twitter and GitHub.
    </p>
    <div className={cx('links')}>
      <a href='https://twitter.com/ian_sinn'>@ian_sinn</a>
      <a href='https://github.com/iansinnott'>gitub.com/iansinnott</a>
    </div>
  </div>
);

export default Bio;
