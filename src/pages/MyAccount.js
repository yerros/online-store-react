import React, { Component } from "react";
import { connect } from "react-redux";
import Layout from "../component/Layout";
import axios from "axios";
import { BaseUrl, Get } from "../config";

class MyAccount extends Component {
  constructor() {
    super();
    this.state = {
      order: []
    };
  }

  componentDidMount() {
    this.getOrder();
  }
  getOrder() {
    const userID = this.props.user._id;
    axios.get(`${BaseUrl}api/user/${userID}`).then(res => {
      this.setState({
        order: res.data.orders
      });
    });
  }

  handlePay = (id, amount) => {
    console.log(id);
    Get(`api/order/token?id=${id}&amount=${amount}`).then(res => {
      console.log(res);
      window.location = res.redirect;
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
                  <a href="index.html">Home </a> / My Account
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
                          Date
                        </th>
                        <th className="cart-products-image responsive-display product-cart">
                          Total Product
                        </th>
                        <th className="cart-product-margin" />
                        <th className="cart-products-product product-cart" />
                        <th className="cart-products-price product-cart">
                          Status
                        </th>
                        <th className="cart-products-quantiry product-cart">
                          Payment
                        </th>
                        <th className="cart-products-total product-cart">
                          TOTAL
                        </th>
                        <th className="cart-products-total product-cart"></th>
                      </tr>
                      {this.state.order.map(item => {
                        return (
                          <tr className="product-margin" key={item._id}>
                            <td className="cart-product-text cta">
                              <h4>{item.create_at}</h4>
                            </td>
                            <td className="cart-product-text cta">
                              <h4>{item.items.length}</h4>
                            </td>
                            <td className="cart-product-text cta"></td>
                            <td className="cart-product-text cta"></td>
                            <td className="cart-product-text">
                              <h4>{item.status}</h4>
                            </td>
                            <td className="cart-product-text">
                              <h4>{item.payment_method}</h4>
                            </td>
                            <td className="cart-product-text">
                              <h4>Rp. {item.total_price}</h4>
                            </td>
                            <td className="cart-product-text">
                              <button
                                className="btn btn-dark btn-small"
                                onClick={() =>
                                  this.handlePay(item._id, item.total_price)
                                }
                              >
                                Pay Now
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
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
    user: state.user
  };
};

export default connect(mapStateToProps)(MyAccount);
