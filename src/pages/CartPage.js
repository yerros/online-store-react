import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Layout from "../component/Layout";
import { connect } from "react-redux";
import { removeCart, totalCart } from "../actions";
import { BaseUrl, Get, Post } from "../config";

class CartPage extends Component {
  constructor() {
    super();
    this.state = {
      total: 0,
      coupon: "",
      cart: [],
      message: "",
      alert: ""
    };
  }
  async componentDidMount() {
    this.totalHarga();
  }

  async totalHarga() {
    await this.setCart();
    const totals = this.state.cart.reduce((a, b) => {
      return a + b.price;
    }, 0);
    this.setState({ total: totals });
    this.props.sumTotal(totals);
  }
  async setCart() {
    this.setState({
      cart: this.props.cart
    });
  }
  async handleRemove(value) {
    await this.props.cartRemove(value);
    this.totalHarga();
  }

  submitCoupon = async () => {
    Post(`api/coupon/${this.state.coupon}`).then(res => {
      console.log(res);
      if (res.msg === "expired") {
        return this.setState({ message: "Coupon not work", alert: "danger" });
      }
      const afterDiscount =
        this.state.total - (this.state.total * res.discount) / 100;
      this.setState({
        discount: res.discount,
        total: afterDiscount,
        message: "Coupon Works!",
        alert: "success"
      });
      this.props.sumTotal(afterDiscount);
    });
  };
  render() {
    return (
      <Layout>
        <div className="broadcamp-area">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 text-center">
                <h2>Cart Page</h2>
                <h4>
                  <a href="index.html">Home </a> / Cart Page
                </h4>
              </div>
            </div>
          </div>
        </div>
        <div className="cart-page-area section-padding">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="cart-page-content">
                  <table className="cart-products">
                    <tbody>
                      <tr className="cart-menu">
                        <th className="cart-products-cross responsive-display product-cart">
                          Remove
                        </th>
                        <th className="cart-products-image responsive-display product-cart">
                          Proaduct
                        </th>
                        <th className="cart-product-margin" />
                        <th className="cart-products-product product-cart" />
                        <th className="cart-products-price product-cart">
                          Price
                        </th>
                        <th className="cart-products-quantiry product-cart">
                          QUANTITY
                        </th>
                        <th className="cart-products-total product-cart">
                          TOTAL
                        </th>
                      </tr>
                      {this.props.cart.map((item, i) => {
                        return (
                          <tr className="product-margin" key={i}>
                            <td className="cart-products-cross">
                              <i
                                onClick={() => this.handleRemove(item)}
                                className="fa fa-close"
                              />
                            </td>
                            <td className="cart-products-image">
                              <img
                                src={item.product_image}
                                style={{ width: 100 }}
                                alt=""
                              />
                            </td>
                            <td className="cart-product-text cta"></td>
                            <td className="cart-product-text cta"></td>
                            <td className="cart-product-text">
                              <h4>Rp. {item.price}</h4>
                            </td>
                            <td className="cart-product-text">
                              <h4>1</h4>
                            </td>
                            <td className="cart-product-text">
                              <h4>Rp. {item.price}</h4>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-8">
                <div
                  style={{
                    paddingTop: 40,
                    paddingBottom: 50,
                    paddingLeft: 50
                  }}
                >
                  <form action="/" _lpchecked="1">
                    <label className="font-weight-bold">
                      Enter your Coupon here!
                    </label>
                    <br />
                    {this.state.message ? (
                      <div
                        className={`alert alert-${this.state.alert}`}
                        role="alert"
                      >
                        {this.state.message}
                      </div>
                    ) : (
                      <div></div>
                    )}
                    <input
                      type="text"
                      name="coupon"
                      onChange={e => this.setState({ coupon: e.target.value })}
                      placeholder="Coupon Code"
                    />
                    <button
                      className="btn btn-dark ml-2"
                      style={{ cursor: "pointer" }}
                      type="button"
                      onClick={this.submitCoupon}
                    >
                      Sumbit
                    </button>
                  </form>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="cart-submit-area">
                  <button className="btn btn-outline-dark mr-2">
                    Update Cart
                  </button>
                  <Link
                    to="/checkout"
                    style={{ color: "white" }}
                    className="btn btn-dark"
                  >
                    Checkout
                  </Link>
                  <ul>
                    <li>
                      Total Cost :<span>{this.state.total}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}
const mapStateToProps = state => {
  return {
    cart: state.cart
  };
};

const mapDispatchToProps = dispatch => {
  return {
    cartRemove: value => dispatch(removeCart(value)),
    sumTotal: value => dispatch(totalCart(value))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartPage);
