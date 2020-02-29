import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import "./adminlte.min.css";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

function Layout(props) {
  return props.isAdmin ? (
    <div className="wrapper">
      <Header />
      <Sidebar />
      <div className="content-wrapper">
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0 text-dark">Dashboard</h1>
              </div>
            </div>
          </div>
        </div>
        {props.children}
      </div>
      <Footer />
    </div>
  ) : (
    <Redirect to="/admin/login" />
  );
}

const mapStateToProps = state => {
  return {
    isAdmin: state.isAdmin
  };
};
export default connect(mapStateToProps)(Layout);
