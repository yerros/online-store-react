import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import Layout from "../component/Layout";
import { loginUser, signOut, totalCart, removeAllCart } from "../actions";
import { BaseUrl } from "../config";

import { PayPalButton } from "react-paypal-button-v2";

class CheckoutPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
      courier: [{ name: "jne" }, { name: "tiki" }, { name: "pos" }],
      selectedcourier: "",
      firstname: '',
      lastname: '',
      email: "",
      password: "",
      show_paypal: false,
      user: props.user,
      shipping_cost: 0,
      shipping_method: "",
      payment_method: "",
      ro_province: [],
      show_login: true,
      ro_city: []
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.getProvince();
    this.getCity();
  }
  handleChange = e => {
    const name = e.target.name;
    const target = e.target.value;
    this.setState(oldstate => ({
      ...oldstate,
      user: {
        ...oldstate.user,
        [name]: target
      }
    }));
  };
  handleShipping = e => {
    this.setState({ selectedcourier: e.target.value });
    const kurir = e.target.value;
    const { city } = this.state.user;
    axios
      .get(
        `${BaseUrl}api/rajaongkir/cost?origin=501&destination=${city}&weight=1700&courier=${kurir}`
      )
      .then(res => {
        this.setState({
          shipping_method: res.data.rajaongkir.results[0].costs
        });
      });
  };
  handleCost = e => {
    this.setState({ shipping_cost: e.target.value });
    const ship = this.props.total + Number(e.target.value);
    this.props.sumTotal(ship);
  };
  handleLogin = e => {
    e.preventDefault();
    const data = {
      email: this.state.email,
      password: this.state.password
    };
    axios.post(`${BaseUrl}api/user/login`, data).then(res => {
      this.setState({
        user: res.data.user
      });
      this.props.loginUser(res.data.user);
    });
  };

  // Register
  handleRegister = e => {
    e.preventDefault();
    const data = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      email: this.state.email,
      password: this.state.password
    };
    axios.post(`${BaseUrl}api/user/register`, data).then(res => {
      this.setState({
        user: res.data.user
      });
      this.props.loginUser(res.data.user);
    });
  };

  // get rajaongkir
  getProvince() {
    const getProv = axios.get(`${BaseUrl}api/rajaongkir/provinsi`);
    getProv.then(res => {
      this.setState({
        ro_province: res.data.rajaongkir.results
      });
    });
  }
  getCity() {
    const city = axios.get(`${BaseUrl}api/rajaongkir/kota`);
    city.then(res => {
      this.setState({
        ro_city: res.data.rajaongkir.results
      });
    });
  }

  submitOrder = () => {
    const dataOrder = {
      items: this.props.cart,
      customer: this.state.user,
      total_price: this.props.total,
      payment_method: this.state.payment_method,
      shipping_method: this.state.selectedcourier
    };
    const makeOrder = axios.post(`${BaseUrl}api/order`, dataOrder);
    makeOrder.then(res => {
      this.props.history.push("/myaccount");
      this.props.removeAll();
    });
  };

  render() {
    const {
      firstname,
      lastname,
      email,
      company,
      street,
      city,
      state,
      zip,
      phone
    } = this.state.user;
    return (
      <Layout>
        <div className="broadcamp-area">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 text-center">
                <h2>Checkout</h2>
                <h4>
                  <a href="/">Home </a> / Shop / Checkout
                </h4>
              </div>
            </div>
          </div>
        </div>
        <div className="checkout-top-area wow fadeInUp">
          <div className="container">
            {this.props.isLogin ? (
              <div className="row">
                <div className="col-md-7">
                  <div className="billing-details">
                    <h3>Billing Details</h3>
                    <form action="contact.php">
                      <div className="row">
                        <div className="col-md-6">
                          <label htmlFor="firstname">First Name *</label>
                          <input
                            type="text"
                            name="firstname"
                            value={firstname}
                            onChange={this.handleChange}
                          />
                        </div>
                        <div className="col-md-6">
                          <label htmlFor="lastname">Last Name *</label>
                          <input
                            type="text"
                            name="lastname"
                            value={lastname}
                            onChange={this.handleChange}
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          <label htmlFor="company">Compnay Name</label>
                          <input
                            type="text"
                            name="company"
                            value={company}
                            onChange={this.handleChange}
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <label htmlFor="item6">Email Address *</label>
                          <input
                            type="text"
                            name="email"
                            value={email}
                            onChange={this.handleChange}
                          />
                        </div>
                        <div className="col-md-6">
                          <label htmlFor="item11">Phone *</label>
                          <input
                            type="text"
                            name="phone"
                            value={phone || 0}
                            onChange={this.handleChange}
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          <label htmlFor="select">Country*</label>
                          <span className="select-country">
                            <select name="select" id="select">
                              <option value>Indonesia</option>
                            </select>
                          </span>
                          <label htmlFor="item7">Address*</label>
                          <input
                            type="text"
                            placeholder="Street Address"
                            name="street"
                            value={street}
                            onChange={this.handleChange}
                          />
                          <label htmlFor="item8">Town / City *</label>
                          <span className="select-country">
                            <select
                              name="city"
                              value={city}
                              onChange={this.handleChange}
                            >
                              {this.state.ro_city.map(item => {
                                return (
                                  <option
                                    key={item.city_id}
                                    value={item.city_id}
                                  >
                                    {item.city_name}
                                  </option>
                                );
                              })}
                            </select>
                          </span>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <label htmlFor="select2">State *</label>
                          <span className="select-country">
                            <select
                              name="state"
                              value={state}
                              onChange={this.handleChange}
                            >
                              {this.state.ro_province.map(item => {
                                return (
                                  <option
                                    key={item.province_id}
                                    value={item.province_id}
                                  >
                                    {item.province}
                                  </option>
                                );
                              })}
                            </select>
                          </span>
                        </div>
                        <div className="col-md-6">
                          <label htmlFor="item9">Zip Code *</label>
                          <input
                            type="text"
                            name="zip"
                            value={zip}
                            onChange={this.handleChange}
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="textfield-area">
                            <h3>Additional Information</h3>
                            <p>Order Notes</p>
                            <textarea
                              placeholder="Notes about your order.."
                              defaultValue={""}
                            />
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="col-lg-4 offset-lg-1 col-md-5">
                  <div className="checkout-right">
                    <h3>Your order</h3>
                    <ul>
                      <li>
                        Product <span>Total</span>
                      </li>
                      {this.props.cart.map((item, i) => {
                        return (
                          <li key={i}>
                            {item.product_name} <span>Rp. {item.price}</span>
                          </li>
                        );
                      })}
                      <li className="font-weight-bold">Pengiriman:</li>
                      <li>
                        <select
                          name="selectedcourier"
                          value={this.state.selectedcourier}
                          onChange={this.handleShipping}
                        >
                          <option>Select One</option>
                          {this.state.courier.map((item, i) => {
                            return (
                              <option key={i} value={item.name}>
                                {item.name.toUpperCase()}
                              </option>
                            );
                          })}
                        </select>
                      </li>
                      <li>
                        {this.state.shipping_method ? (
                          <div>
                            <select
                              value={this.state.shipping_cost}
                              onChange={this.handleCost}
                            >
                              <option>Select One</option>
                              {this.state.shipping_method.map((item, i) => {
                                return (
                                  <option key={i} value={item.cost[0].value}>
                                    {item.description}
                                  </option>
                                );
                              })}
                            </select>
                            <span>Rp. {this.state.shipping_cost}</span>
                          </div>
                        ) : (
                            <div></div>
                          )}
                      </li>
                      <li className="border-cta"></li>
                      <li>
                        Total <span>Rp. {this.props.total}</span>
                      </li>
                    </ul>
                    <div className="check-payment">
                      <span className="check_box453">
                        <input
                          type="radio"
                          name="payment_method"
                          onChange={e =>
                            this.setState({
                              payment_method: "doku",
                              show_paypal: false
                            })
                          }
                        />
                        <label htmlFor={45}>DOKU </label>
                        <br />
                        Pay with Midtrans
                      </span>
                      <br />
                      <span className="check_box453">
                        <input
                          type="radio"
                          name="payment_method"
                          onChange={e =>
                            this.setState({
                              payment_method: "paypal",
                              show_paypal: true
                            })
                          }
                        />
                        <label htmlFor={65}>Paypal </label>
                        <br />
                        Pay via PayPal; you can pay with your credit card if you
                        don’t have a PayPal account.
                      </span>
                    </div>
                    <div className="payment-cart">
                      {this.state.show_paypal ? (
                        <div className="mt-5">
                          <PayPalButton
                            className="mt-4"
                            amount="0.1"
                            onSuccess={(details, data) => {
                              alert(
                                "Transaction completed by " +
                                details.payer.name.given_name
                              );
                              return axios
                                .get(
                                  `${BaseUrl}/api/order?orderId=${this.props.user._id}`
                                )
                                .then(res => {
                                  console.log(res.data);
                                });
                            }}
                            options={{
                              clientId:
                                "AUJaq9Xu591_Emm6cpUksuGUVoZzCl5sBMbUpWXcA0gMdE1zAat8ItNYSOjBBh8KJzM-I9cPMfHUdSkz"
                            }}
                          />
                        </div>
                      ) : (
                          <button
                            onClick={this.submitOrder}
                            className="btn btn-dark mb2"
                          >
                            Place Order
                        </button>
                        )}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
                <div className="row">
                  <div className="col-md-12">
                    <div className="checkout-header">
                      <h4>
                        <i className="fa fa-users" /> New customer?
                      <button className="btn btn-link" onClick={e => this.setState({ show_login: !this.state.show_login })}>Click here to Register</button>
                      </h4>
                    </div>
                    {this.state.show_login ? (<div className="checkout-content">
                      <p>
                        If you have shopped with us before, please enter your
                        details in the boxes below.
                      <br /> If you are a new customer, please proceed to the
                                                        Billing &amp; Shipping section.
                    </p>
                      <div className="checkout-top-form">
                        <form>
                          <div className="row">
                            <div className="col-md-6">
                              <label htmlFor="ccds">Username or email *</label>
                              <input
                                type="email"
                                name="email"
                                value={this.state.email}
                                onChange={e =>
                                  this.setState({ email: e.target.value })
                                }
                              />
                            </div>
                            <div className="col-md-6">
                              <label htmlFor="item2">Password *</label>
                              <input
                                type="password"
                                name="password"
                                value={this.state.password}
                                onChange={e =>
                                  this.setState({ password: e.target.value })
                                }
                              />
                            </div>
                          </div>
                          <button
                            onClick={this.handleLogin}
                            className="btn btn-dark mr-2"
                          >
                            Login
                        </button>
                        </form>
                      </div>
                    </div>
                    ) : (<div className='checkout-content'><div className="checkout-top-form">
                      <form>
                        <div className="row">
                          <div className="col-md-6">
                            <label htmlFor="ccds">First Name *</label>
                            <input
                              type="email"
                              name="firstname"
                              value={this.state.firstname}
                              onChange={e =>
                                this.setState({ firstname: e.target.value })
                              }
                            />
                          </div>
                          <div className="col-md-6">
                            <label htmlFor="ccds">Last Name *</label>
                            <input
                              type="email"
                              name="lastname"
                              value={this.state.lastname}
                              onChange={e =>
                                this.setState({ lastname: e.target.value })
                              }
                            />
                          </div>
                          <div className="col-md-6">
                            <label htmlFor="ccds">Username or email *</label>
                            <input
                              type="email"
                              name="email"
                              value={this.state.email}
                              onChange={e =>
                                this.setState({ email: e.target.value })
                              }
                            />
                          </div>
                          <div className="col-md-6">
                            <label htmlFor="item2">Password *</label>
                            <input
                              type="password"
                              name="password"
                              value={this.state.password}
                              onChange={e =>
                                this.setState({ password: e.target.value })
                              }
                            />
                          </div>
                        </div>
                        <button
                          onClick={this.handleRegister}
                          className="btn btn-dark mr-2"
                        >
                          Register
                    </button>
                      </form>
                    </div>
                    </div>)}
                  </div>
                </div>
              )}
          </div>
        </div>
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    total: state.total,
    cart: state.cart,
    user: state.user,
    isLogin: state.isLogin
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loginUser: user => dispatch(loginUser(user)),
    userSignout: () => dispatch(signOut()),
    sumTotal: value => dispatch(totalCart(value)),
    removeAll: () => dispatch(removeAllCart())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CheckoutPage);
