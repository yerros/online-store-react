import React, { Component } from "react";
import moment from "moment";
import SweetAlert from "react-bootstrap-sweetalert";
import Layout from "../../component/Admin";
import { Get, Post, Delete, Put } from "../../config";

export default class Orders extends Component {
  constructor() {
    super();
    this.state = {
      orders: [],
      category_name: "",
      category_description: "",
      alert: null,
      showInput: false,
      action: null
    };
    this.handleAddCategory = this.handleAddCategory.bind(this);
  }
  componentDidMount() {
    this.getCategories();
  }

  async getCategories() {
    this.setState({
      orders: await Get("api/order")
    });
  }
  handleAddCategory(event) {
    const body = {
      category_name: this.state.category_name,
      category_description: this.state.category_description
    };
    Post("api/category", body).then(res => {
      this.setState({
        alert: this.getAlert("Category succefully added!"),
        category_name: "",
        category_description: "",
        categories: []
      });
      this.getCategories();
    });
    event.preventDefault();
  }
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
  editCategory(e, id) {
    const body = {
      category_name: this.state.category_name,
      category_description: this.state.category_description
    };
    Put(`api/category/${id}`, body).then(res => {
      this.setState({
        alert: this.getAlert("Category succefully Update!"),
        category_name: "",
        category_description: "",
        categories: [],
        showInput: false
      });
      this.getCategories();
    });
    e.preventDefault();
  }
  deleteCategory(id) {
    Delete(`api/category/${id}`).then(res => {
      this.setState({
        alert: this.getAlert("Category succefully deleted!"),
        categories: []
      });
      this.getCategories();
    });
    this.getCategories();
  }
  render() {
    const { category_name, category_description } = this.state;
    return (
      <Layout>
        <section className="content">
          <div className="container-fluid">
            {this.state.alert}
            {this.state.showInput ? (
              <form onSubmit={this.state.action}>
                <div className="card">
                  <div className="card-header">
                    <h1 className="card-title">Add Category</h1>
                    <div className="card-tools">
                      <button
                        onClick={() => this.setState({ showInput: false })}
                        type="button"
                        className="btn btn-tool"
                      >
                        <i className="fas fa-window-close"></i>
                      </button>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-5">
                        <label htmlFor="category_name">Category Name</label>
                        <input
                          type="text"
                          name="category_name"
                          className="form-control"
                          value={category_name}
                          onChange={e =>
                            this.setState({ category_name: e.target.value })
                          }
                        ></input>
                      </div>
                      <div className="col-5">
                        <label htmlFor="inputName">Category Description</label>
                        <input
                          type="text"
                          name="inputName"
                          className="form-control"
                          value={category_description}
                          onChange={e =>
                            this.setState({
                              category_description: e.target.value
                            })
                          }
                        ></input>
                      </div>
                      <div className="col-2">
                        <button
                          onClick={this.state.action}
                          style={{ marginTop: 30 }}
                          className="btn btn-info mr-2"
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            ) : (
              <div className="mb-3">
                <button
                  onClick={() =>
                    this.setState({
                      showInput: true,
                      action: this.handleAddCategory
                    })
                  }
                  className="btn btn-primary"
                >
                  New Category
                </button>
              </div>
            )}
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">List of All Categories</h3>
                  </div>
                  <div className="card-body table-responsive p-0">
                    <table className="table table-hover text-nowrap">
                      <thead>
                        <tr>
                          <th>No.</th>
                          <th>Order Date</th>
                          <th>Customer</th>
                          <th>Total Item</th>
                          <th>Status</th>
                          <th>Payment Method</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.orders.map((item, i) => {
                          return (
                            <tr key={i}>
                              <td>{i + 1}</td>
                              <td>
                                {moment(item.create_at).format(
                                  "dddd, MMMM Do YYYY, h:mm:ss a"
                                )}
                              </td>
                              <td>
                                {item.customer.firstname +
                                  " " +
                                  item.customer.lastname}
                              </td>
                              <td>{item.items.length}</td>
                              <td>{item.status.toUpperCase()}</td>
                              <td>{item.payment_method.toUpperCase()}</td>
                              <td>
                                <button
                                  onClick={() =>
                                    this.setState({
                                      showInput: true,
                                      action: e =>
                                        this.editCategory(e, item._id),
                                      category_name: item.category_name,
                                      category_description:
                                        item.category_description
                                    })
                                  }
                                  className="btn btn-primary btn-sm mr-2"
                                >
                                  <i className="fas fa-edit"></i>
                                </button>
                                <button
                                  onClick={() => this.deleteCategory(item._id)}
                                  className="btn btn-danger btn-sm"
                                >
                                  <i className="fas fa-trash"></i>
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                  {/* /.card-body */}
                </div>
                {/* /.card */}
              </div>
            </div>
          </div>
        </section>
      </Layout>
    );
  }
}
