import React, { Component } from "react";
import Layout from "../component/Layout";
import axios from "axios";
import { BaseUrl } from "../config";
import { addCart } from "../actions";
import { connect } from "react-redux";

class ProductDetail extends Component {
  constructor() {
    super();
    this.state = {
      product: ""
    };
  }
  componentDidMount() {
    this.getSingleProduct();
  }
  getSingleProduct() {
    axios
      .get(`${BaseUrl}api/product/${this.props.match.params.id}`)
      .then(res => {
        this.setState({ product: res.data });
      });
  }
  addToCart = e => {
    this.props.addCart(this.state.product);
    e.preventDefault();
  };
  render() {
    const {
      product_name,
      product_description,
      category,
      stock,
      price,
      color,
      size,
      material,
      tags,
      product_image
    } = this.state.product;
    return this.state.product ? (
      <Layout>
        <div className="broadcamp-area">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 text-center">
                <h2>Shop Single Page</h2>
                <h4>
                  <a href="index.html">Home </a> / Shop / {product_name}
                </h4>
              </div>
            </div>
          </div>
        </div>
        <div className="single-shop-area section-padding">
          <div className="container">
            <div className="row">
              <div className="col-md-5 wow fadeInRight">
                <div className="single-shop-left">
                  <div className="single-shop-slide">
                    <div className="shop-single-slide">
                      <img src={product_image} alt="" />
                    </div>
                  </div>
                  <div className="single-shop-description">
                    <div className="single-shop-additional">
                      <h4>Addtional Information</h4>
                      <p>
                        Material :<span>{material}</span>
                      </p>
                      <p>
                        Size : <span>{size}</span>
                      </p>
                      <p>
                        In Stock : <span>{stock}</span>
                      </p>
                      <p>
                        Product Tags : <span>{tags}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 offset-md-1 wow fadeInLeft">
                <div className="single-shop-right">
                  <h2>{product_name}</h2>
                  <p>{product_description}</p>
                  <h4 className="category-cta">
                    Category : <span>{category.category_name}</span>
                  </h4>
                  <div className="filter-color">
                    <h4>Available Color </h4>
                    <div className="filter-content">
                      <span>{color}</span>
                    </div>
                  </div>
                  <h4 className="category-cta">
                    Price :<span className="font-weight-bold">Rp. {price}</span>
                  </h4>
                  <div className="single-shop-quantity">
                    <div className="quantity">
                      <input
                        type="number"
                        min={1}
                        max={100}
                        step={1}
                        defaultValue={1}
                      />
                    </div>
                    <button
                      onClick={() => this.props.cartAdd(this.state.product)}
                      className="btn btn-dark ml-2"
                      style={{ cursor: "pointer" }}
                    >
                      Add To Cart
                    </button>
                    <a href="/" className="addcart cta">
                      <i className="fa fa-heart-o" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    ) : (
      <div></div>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    cart: state.cart
  };
};

const mapDispatchToProps = dispatch => {
  return {
    cartAdd: value => dispatch(addCart(value))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
