/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { connect } from "react-redux";
import { signOut } from "../../actions";

function Sidebar(props) {
  const signOut = () => {
    const confirm = window.confirm("Are you want to Logout?");
    if (confirm) {
      localStorage.removeItem("secret_key");
      props.signOut();
      window.location = "/admin";
    }
  };
  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      <a href="index3.html" className="brand-link">
        <img
          src="https://adminlte.io/themes/v3/dist/img/AdminLTELogo.png"
          alt="AdminLTE Logo"
          className="brand-image img-circle elevation-3"
          style={{ opacity: ".8" }}
        />
        <span className="brand-text font-weight-light">everSick.co</span>
      </a>
      <div className="sidebar">
        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
          <div className="image">
            <img
              src="https://adminlte.io/themes/v3/dist/img/user2-160x160.jpg"
              className="img-circle elevation-2"
              alt="User"
            />
          </div>
          <div className="info">
            <a href="#" className="d-block">
              Administrator
            </a>
          </div>
        </div>
        <nav className="mt-2">
          <ul
            className="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            role="menu"
            data-accordion="false"
          >
            <li className="nav-item">
              <a href="/admin" className="nav-link">
                <i className="nav-icon fas fa-tachometer-alt" />
                <p>Dashboard</p>
              </a>
            </li>
            <li className="nav-item has-treeview">
              <a href="#" className="nav-link">
                <i className="nav-icon fas fa-th" />
                <p>
                  Products
                  <i className="right fas fa-angle-left" />
                </p>
              </a>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <a href="/admin/product/add" className="nav-link">
                    <i className="far fa-circle nav-icon" />
                    <p>Add Product</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="/admin/product" className="nav-link">
                    <i className="far fa-circle nav-icon" />
                    <p>List Product</p>
                  </a>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <a href="/admin/category" className="nav-link">
                <i className="nav-icon fas fa-project-diagram" />
                <p>Category</p>
              </a>
            </li>
            <li className="nav-item">
              <a href="/admin/order" className="nav-link">
                <i className="nav-icon fas fa-shopping-cart" />
                <p>Orders</p>
              </a>
            </li>
            <li className="nav-item">
              <a href="/admin/customer" className="nav-link">
                <i className="nav-icon fas fa-users" />
                <p>Customers</p>
              </a>
            </li>
            <li className="nav-item">
              <a href="/admin/coupon" className="nav-link">
                <i className="nav-icon fas fa-credit-card" />
                <p>Coupons</p>
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">
                <i className="nav-icon fas fa-cogs" />
                <p>
                  Setting
                  <span className="right badge badge-danger">New</span>
                </p>
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link" onClick={signOut}>
                <i className="nav-icon fas fa-sign-out-alt" />
                <p>Logout</p>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
}

const mapStateToProps = state => {
  return {
    isAdmin: state.isAdmin
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signOut: () => dispatch(signOut())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
