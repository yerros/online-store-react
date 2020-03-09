import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

function Header(props) {
  return (
    <div className="header-area home-2-header">
      <div className="container">
        <div className="row">
          <div className="col-md-2 col-12">
            <div className="logo">
              <a href="/">
                <img src="/assets/images/home-2-logo.png" alt="" />
              </a>
            </div>
          </div>
          <div className="col-md-7 text-center col-12">
            <div className="responsive_menu" />
            <div className="mainmenu">
              <ul id="nav">
                <li>
                  <a href="/">Home</a>
                </li>
                <li>
                  <Link to="/myaccount">My Account</Link>
                </li>
                <li>
                  <a href="/">Blog</a>
                  <ul className="submenu cta">
                    <li>
                      <a href="blog.html">Blog</a>
                    </li>
                    <li>
                      <a href="single-blog.html">Single Blog</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-3 col-12">
            <div className="header-right">
              <span className="search">
                <i className="fa fa-search" />
              </span>
              <input type="search" placeholder="Search" />
              <span className="heart">
                <i className="fa fa-heart" />
              </span>
              <Link to="/cart">
                <span className="shopping-bag">
                  <i className="fa fa-shopping-bag" />
                </span>
                <span className="cart">{props.cart.length}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
const mapStateToProps = state => {
  return {
    cart: state.cart
  };
};
export default connect(mapStateToProps)(Header);
