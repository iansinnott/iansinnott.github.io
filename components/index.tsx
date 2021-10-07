/* eslint-disable @next/next/no-img-element */
import React from "react";
import cx from "classnames";

/*

.ParrotTwitterLink
  text-decoration none
  font-family monospace
  display: flex
  justify-content: center
  align-items: center
  font-size 20px

  img 
    display none
    transform translate(-10px, -3px)

  &:hover
    i 
      display none
    img 
      display block

  img
  i 
    margin-right: 10px
    
*/

export const ParrotTwitterLink = () => {
  return (
    <a
      className={cx("ParrotTwitterLink flex items-center relative -top-1")}
      href="https://twitter.com/ian_sinn">
      <i className="fa fa-twitter"></i>
      <img
        className=""
        style={{ height: 22, margin: 0 }}
        src={"https://s3.us-west-001.backblazeb2.com/persistory-1/partyparrot-slow.gif"}
        alt="Slow Motion Party Parrot"
      />
      <span className="block relative top-1 ml-2">@ian_sinn</span>
    </a>
  );
};
