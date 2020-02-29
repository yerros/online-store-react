import React, { Component } from "react";
import Layout from "../../component/Admin";
import { Get } from "../../config";

export default class extends Component {
  constructor() {
    super();
    this.state = {
      products: []
    };
  }

  componentDidMount() {
    Get("api/product").then(res => {
      this.setState({ products: res });
    });
  }
  render() {
    return (
      <Layout>
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">List of All Products</h3>
                    <div className="card-tools">
                      <div
                        className="input-group input-group-sm"
                        style={{ width: "150px" }}
                      >
                        <input
                          type="text"
                          name="table_search"
                          className="form-control float-right"
                          placeholder="Search"
                        />
                        <div className="input-group-append">
                          <button type="submit" className="btn btn-default">
                            <i className="fas fa-search" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card-body table-responsive p-0">
                    <table className="table table-hover text-nowrap">
                      <thead>
                        <tr>
                          <th>Picture</th>
                          <th>Title</th>
                          <th>Category</th>
                          <th>Stock</th>
                          <th>Code</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.products.map(item => {
                          return (
                            <tr key={item._id}>
                              <td>
                                <img
                                  style={{ width: 100 }}
                                  src={item.product_image}
                                  alt=""
                                />
                              </td>
                              <td>{item.product_name}</td>
                              <td>{item.category.category_name}</td>
                              <td>
                                <span className="tag tag-success">
                                  {item.stock}
                                </span>
                              </td>
                              <td>{item.code}</td>
                              <td>
                                <button
                                  onClick={() =>
                                    (window.location = `/admin/product/edit/${item._id}`)
                                  }
                                  className="btn btn-primary btn-sm mr-2"
                                >
                                  <i className="fas fa-edit"></i>
                                </button>
                                <button className="btn btn-danger btn-sm">
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
