import React, { Component } from "react";
import axios from "axios";
import Slider from "../component/Slider";
import HomeCategory from "../component/HomeCategory";
import ProductList from "../component/ProductList";
import Layout from "../component/Layout";
import { BaseUrl } from "../config";

export default class Homepage extends Component {
  constructor() {
    super();
    this.state = {
      products: []
    };
  }

  componentDidMount() {
    this.getProduct();
  }
  getProduct() {
    axios.get(`${BaseUrl}api/product`).then(res => {
      this.setState({ products: res.data });
    });
  }
  render() {
    return (
      <Layout>
        <Slider />
        <HomeCategory />
        <div className="product-area cta padding-bottom-100 wow fadeInUp">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="section-title cta">
                  <h3>Popular Products</h3>
                </div>
              </div>
            </div>
            <div className="shop-area">
              <div className="container">
                <div className="row wow fadeInRight">
                  <ProductList data={this.state.products} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}
