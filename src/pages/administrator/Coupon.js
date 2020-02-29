import React, { Component } from "react";
import DatePicker from "react-datepicker";
import SweetAlert from "react-bootstrap-sweetalert";
import Layout from "../../component/Admin";
import moment from "moment";
import { Get, Post, Delete, Put } from "../../config";

export default class Coupon extends Component {
  constructor() {
    super();
    this.state = {
      coupons: [],
      coupon_code: "",
      discount: "",
      alert: null,
      showInput: false,
      expiredIn: new Date(),
      action: null
    };
    this.handleAddCategory = this.handleAddCategory.bind(this);
  }
  componentDidMount() {
    this.getCategories();
    console.log(moment(this.state.expiredIn).format("L"));
  }

  async getCategories() {
    this.setState({
      coupons: await Get("api/coupon")
    });
  }
  handleAddCategory(event) {
    const body = {
      coupon_code: this.state.coupon_code,
      discount: this.state.discount,
      expired: moment(this.state.expiredIn).format()
    };
    Post("api/coupon", body).then(res => {
      console.log(res);
      this.setState({
        alert: this.getAlert("Category succefully added!"),
        coupon_code: "",
        discount: "",
        coupons: []
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
    const confirm = window.confirm(
      "Are you sure you wish to delete this item?"
    );
    if (confirm) {
      Delete(`api/coupon/${id}`).then(res => {
        this.setState({
          alert: this.getAlert("Category succefully deleted!"),
          categories: []
        });
        this.getCategories();
      });
    }
    this.getCategories();
  }
  render() {
    const { coupon_code, discount, expiredIn } = this.state;
    const today = moment(expiredIn).format("L");
    return (
      <Layout>
        <section className="content">
          <div className="container-fluid">
            {this.state.alert}
            {this.state.showInput ? (
              <form onSubmit={this.state.action}>
                <div className="card">
                  <div className="card-header">
                    <h1 className="card-title">Add Coupons</h1>
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
                      <div className="col-3">
                        <label htmlFor="category_name">Coupon Code</label>
                        <input
                          type="text"
                          name="coupon_code"
                          className="form-control"
                          value={coupon_code}
                          onChange={e =>
                            this.setState({ coupon_code: e.target.value })
                          }
                        ></input>
                      </div>
                      <div className="col-3">
                        <label htmlFor="inputName">Discount</label>
                        <input
                          type="number"
                          name="inputName"
                          className="form-control"
                          value={discount}
                          onChange={e =>
                            this.setState({
                              discount: e.target.value
                            })
                          }
                        ></input>
                      </div>
                      <div className="col-3">
                        <div className="form-group">
                          <label>Expired :</label>
                          <div className="input-group">
                            <div className="input-group-prepend">
                              <span className="input-group-text">
                                <i className="far fa-calendar-alt"></i>
                              </span>
                              <div className="form-control">
                                <DatePicker
                                  selected={expiredIn}
                                  onChange={date =>
                                    this.setState({ expiredIn: date })
                                  }
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-3">
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
                  New Coupon
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
                          <th>Coupon Code</th>
                          <th>Discount</th>
                          <th>Expired</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.coupons.map((item, i) => {
                          return (
                            <tr key={i}>
                              <td>{i + 1}</td>
                              <td>{item.coupon_code}</td>
                              <td>{item.discount}</td>
                              <td>
                                {moment(item.expired).format(
                                  "dddd, MMMM Do YYYY, h:mm:ss a"
                                )}
                              </td>
                              <td>
                                <button
                                  onClick={() =>
                                    this.setState({
                                      showInput: true,
                                      action: e =>
                                        this.editCategory(e, item._id),
                                      coupon_code: item.coupon_code,
                                      discount: item.discount
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
