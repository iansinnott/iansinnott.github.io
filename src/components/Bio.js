import React from 'react';
import classnames from 'classnames/bind';

import s from './Bio.module.styl';
const cx = classnames.bind(s);

const Bio = () => (
  <div className={cx('Bio')}>
    <h3>About me</h3>
    <p>
      I write about life as well as my mistakes and successes as I learn to
      build a business. I'm building a self-funded startup (
      <a href='https://www.pairwise.tech'>Pairwise</a>).
    </p>
    <div className={cx('links')}>
      <a href='https://twitter.com/ian_sinn'>
        <i className='fa fa-twitter'></i>
        @ian_sinn
      </a>
    </div>
  </div>
);

export default Bio;
