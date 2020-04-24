import React from "react";
import T from "prop-types";
import Link from "gatsby-link";
import Helmet from "react-helmet";
import classnames from "classnames/bind";
import "font-awesome/css/font-awesome.css";

import "./index.css";
import faceImg from "../assets/face.png";
import s from "./index.module.styl";
const cx = classnames.bind(s);

const gradient = "linear-gradient(to right, #009688, #3F51B5)";

const Header = () => (
  <div
    className={cx("Header")}
    style={{
      background: gradient,
      marginBottom: "1.45rem",
    }}
  >
    <div
      style={{
        margin: "0 auto",
        maxWidth: 960,
        padding: "1.45rem 1.0875rem",
      }}
    >
      <div className={cx("mainHeader")}>
        <h1 style={{ margin: 0 }}>
          <Link
            to="/"
            style={{
              color: "white",
              textDecoration: "none",
              fontWeight: 300,
            }}
          >
            <img
              className={cx("face")}
              src={faceImg}
              alt="An image of my face for the website"
            />
            Ian Sinnott
          </Link>
        </h1>
        <div className={cx("links")}>
          <a href="https://twitter.com/ian_sinn">
            <i className="fa fa-twitter"></i>
          </a>
          <a href="https://github.com/iansinnott">
            <i className="fa fa-github"></i>
          </a>
        </div>
      </div>
    </div>
  </div>
);

const TemplateWrapper = ({ children }) => (
  <div>
    <Helmet
      title="Ian Sinnott"
      meta={[
        {
          name: "description",
          content: "Zealous about simplicity. Love JavaScript, UX, the web.",
        },
        { name: "keywords", content: "javascript, react, learning" },
      ]}
    />
    <Header />
    <div
      style={{
        margin: "0 auto",
        maxWidth: 960,
        padding: "0px 1.0875rem 1.45rem",
        paddingTop: 0,
      }}
    >
      {children}
    </div>
  </div>
);

export default TemplateWrapper;
