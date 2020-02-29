import React, { Component } from "react";
import { connect } from "react-redux";
import "./LoginPage.css";
import { Post } from "../../config";
import { adminLogin } from "../../actions";
class LoginPage extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: ""
    };
  }

  handleSignIn = e => {
    e.preventDefault();
    const data = {
      email: this.state.email,
      password: this.state.password
    };
    Post(`api/admin/login`, data)
      .then(res => {
        this.props.setAdmin(res.token);
        localStorage.setItem("secret_key", res.token);
        this.props.history.push("/admin");
      })
      .catch(err => alert("err"));
  };
  render() {
    return (
      <div className="bodyClass text-center">
        <form className="form-signin">
          <img
            className="mb-4"
            src="https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-solid.svg"
            alt=""
            width={72}
            height={72}
          />
          <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
          <label htmlFor="inputEmail" className="sr-only">
            Email address
          </label>
          <input
            type="email"
            name="email"
            className="form-control"
            placeholder="Email address"
            onChange={e => this.setState({ email: e.target.value })}
          />
          <label htmlFor="inputPassword" className="sr-only">
            Password
          </label>
          <input
            type="password"
            name="password"
            className="form-control"
            placeholder="Password"
            onChange={e => this.setState({ password: e.target.value })}
          />
          <button
            className="btn btn-lg btn-primary btn-block"
            onClick={this.handleSignIn}
            type="submit"
          >
            Sign in
          </button>
          <p className="mt-5 mb-3 text-muted">© {new Date().getFullYear()}</p>
        </form>
      </div>
    );
  }
}
const mapStateToProps = state => {
  console.log(state);

  return {
    isAdmin: state.isAdmin
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setAdmin: token => dispatch(adminLogin(token))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
