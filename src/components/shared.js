import React from 'react';
import classnames from 'classnames/bind';

import s from './shared.module.styl';
const cx = classnames.bind(s);

export const ParrotTwitterLink = () => {
  return (
    <a className={cx('ParrotTwitterLink')} href='https://twitter.com/ian_sinn'>
      <i className='fa fa-twitter'></i>
      <img
        style={{ height: 22, margin: 0 }}
        src={require('./partyparrot.gif')}
        alt='Party Parrot'
      />
      @ian_sinn
    </a>
  );
};
