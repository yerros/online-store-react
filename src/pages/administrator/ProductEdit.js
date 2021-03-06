/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import Layout from "../../component/Admin";
import SweetAlert from "react-bootstrap-sweetalert";
import { Get, Post, Put } from "../../config";

export default class ProductEdit extends Component {
  constructor() {
    super();
    this.state = {
      product_name: "",
      product_description: "",
      selectedCategory: "",
      categories: [],
      stock: 0,
      price: 0,
      weight: 0,
      color: [],
      size: [],
      material: "",
      tags: [],
      isLoading: false,
      product_image: "",
      alert: null
    };
  }

  componentDidMount() {
    this.getCategory();
    this.getSingleProduct();
  }
  getCategory() {
    Get("api/category").then(res => this.setState({ categories: res }));
  }
  getSingleProduct() {
    Get(`api/product/${this.props.match.params.id}`).then(res => {
      this.setState(res);
    });
  }
  changeInput = e => {
    const name = e.target.name;
    this.setState({
      [name]: e.target.value
    });
  };
  changeInputArray = e => {
    const name = e.target.name;
    const target = e.target.value;
    this.setState({
      [name]: [...[name], target]
    });
  };
  getAlert = message => (
    <SweetAlert success title="Sukses" onConfirm={() => this.hideAlert()}>
      {message}
    </SweetAlert>
  );
  hideAlert() {
    this.setState({
      alert: null
    });
  }
  changeImg = e => {
    e.preventDefault();
    this.setState({ isLoading: true })
    const img = e.target.files[0];
    const formData = new FormData();
    formData.append("products", img);
    Post("api/product/img-upload", formData).then(res => {
      console.log(res)
      this.setState({
        product_image: res.remote,
        isLoading: false
      });
    });
  };
  submitProduct = e => {
    e.preventDefault();
    const data = {
      product_name: this.state.product_name,
      product_description: this.state.product_description,
      category: this.state.category,
      stock: this.state.stock,
      price: this.state.price,
      weight: this.state.weight,
      color: this.state.color,
      size: this.state.size,
      material: this.state.material,
      tags: this.state.tags,
      product_image: this.state.product_image
    };
    Put(`api/product/${this.props.match.params.id}`, data).then(res => {
      this.setState({
        alert: this.getAlert("Product succefully Update!")
      });
      this.getSingleProduct();
    });
  };
  render() {
    const {
      product_name,
      product_description,
      stock,
      price,
      weight,
      color,
      size,
      material,
      tags,
      product_image, isLoading
    } = this.state;
    return (
      <Layout>
        {this.state.alert}
        <section className="content">
          <div className="row">
            <div className="col-md-6">
              <div className="card card-primary">
                <div className="card-header">
                  <h3 className="card-title">New Product</h3>
                  <div className="card-tools">
                    <button
                      type="button"
                      className="btn btn-tool"
                      data-card-widget="collapse"
                      data-toggle="tooltip"
                      title="Collapse"
                    >
                      <i className="fas fa-minus" />
                    </button>
                  </div>
                </div>
                <div className="card-body">
                  <div className="form-group">
                    <label htmlFor="inputName">Product Name</label>
                    <input
                      value={product_name}
                      onChange={this.changeInput}
                      type="text"
                      name="product_name"
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="inputDescription">
                      Product Description
                    </label>
                    <textarea
                      name="product_description"
                      className="form-control"
                      rows={4}
                      value={product_description}
                      onChange={this.changeInput}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="inputClientCompany">Stocks</label>
                    <input
                      type="number"
                      name="stock"
                      value={stock}
                      onChange={this.changeInput}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="inputProjectLeader">Price</label>
                    <input
                      type="number"
                      name="price"
                      className="form-control"
                      value={price}
                      onChange={this.changeInput}
                    />
                  </div>
                </div>
                {/* /.card-body */}
              </div>
              {/* /.card */}
            </div>
            <div className="col-md-6">
              <div className="card card-secondary">
                <div className="card-header">
                  <h3 className="card-title">Variant</h3>
                  <div className="card-tools">
                    <button
                      type="button"
                      className="btn btn-tool"
                      data-card-widget="collapse"
                      data-toggle="tooltip"
                      title="Collapse"
                    >
                      <i className="fas fa-minus" />
                    </button>
                  </div>
                </div>
                <div className="card-body">
                  <div className="form-group">
                    <label htmlFor="inputEstimatedBudget">Weight</label>
                    <input
                      type="number"
                      name="weight"
                      value={weight}
                      onChange={this.changeInput}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="inputSpentBudget">Color</label>
                    <input
                      type="text"
                      name="color"
                      value={color}
                      onChange={this.changeInput}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="inputEstimatedDuration">Size</label>
                    <input
                      type="text"
                      name="size"
                      value={size}
                      onChange={this.changeInput}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="inputEstimatedDuration">Material</label>
                    <input
                      type="text"
                      name="material"
                      value={material}
                      onChange={this.changeInput}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="inputEstimatedDuration">Tags</label>
                    <input
                      type="text"
                      name="tags"
                      value={tags}
                      onChange={this.changeInput}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="inputEstimatedDuration">
                      Product Image
                    </label>
                    <br />
                    {isLoading ? (
                      <div className="spinner-border text-center" role="status">
                        <span className="sr-only">Loading...</span>
                      </div>
                    ) : (

                        <img
                          className="mb-2 img-fluid img-thumbnail no-border"
                          src={product_image}
                          alt=""
                        />
                      )}
                    <div className="custom-file">
                      <input
                        type="file"
                        className="custom-file-input"
                        name="product_image"
                        onChange={this.changeImg}
                      />
                      <label className="custom-file-label" htmlFor="customFile">
                        Choose file
                      </label>
                    </div>
                  </div>
                </div>
                {/* /.card-body */}
              </div>
              {/* /.card */}
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <a href="#" className="btn btn-secondary">
                Cancel
              </a>
              <button
                type="submit"
                onClick={this.submitProduct}
                className="btn btn-success float-right mb-5"
              >
                Submit
              </button>
            </div>
          </div>
        </section>
      </Layout>
    );
  }
}
