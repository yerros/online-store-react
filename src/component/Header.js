import React from 'react'

export default function Header() {
  return (
    <div className="header-area home-2-header">
      <div className="container">
        <div className="row">
          <div className="col-md-2 col-12">
            <div className="logo">
              <a href="index.html">
                <img src="/assets/images/home-2-logo.png" alt="" />
              </a>
            </div>
          </div>
          <div className="col-md-7 text-center col-12">
            <div className="responsive_menu" />
            <div className="mainmenu">
              <ul id="nav">
                <li><a href="/">Home</a></li>
                <li><a href="/">Shop</a></li>
                <li><a href="/">Blog</a>
                  <ul className="submenu cta">
                    <li><a href="blog.html">Blog</a></li>
                    <li><a href="single-blog.html">Single Blog</a></li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-3 col-12">
            <div className="header-right">
              <span className="search"><i className="fa fa-search" /></span>
              <input type="search" placeholder="Search" />
              <span className="heart"><i className="fa fa-heart" /></span>
              <a href="cart.html"><span className="shopping-bag"><i className="fa fa-shopping-bag" /></span></a>
              <a href="cart.html"><span className="cart">3</span></a>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}
