import React, { Component } from "react";
import SweetAlert from "react-bootstrap-sweetalert";
import Layout from "../../component/Admin";
import { Get, Post, Delete, Put } from "../../config";

export default class Customers extends Component {
  constructor() {
    super();
    this.state = {
      customers: [],
      category_name: "",
      category_description: "",
      alert: null,
      showInput: false,
      action: null
    };
    this.handleAddCategory = this.handleAddCategory.bind(this);
  }
  componentDidMount() {
    this.getCustomers();
  }

  async getCustomers() {
    this.setState({
      customers: await Get("api/user")
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
    return (
      <Layout>
        <section className="content">
          <div className="container-fluid">
            {this.state.alert}
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
                          <th>First Name</th>
                          <th>Last Name</th>
                          <th>Total Order</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.customers.map((item, i) => {
                          return (
                            <tr key={i}>
                              <td>{i + 1}</td>
                              <td>{item.firstname}</td>
                              <td>{item.lastname}</td>
                              <td>{item.orders.length}</td>
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
                                  className="btn btn-success btn-sm mr-2"
                                >
                                  <i className="fas fa-eye"></i>
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
