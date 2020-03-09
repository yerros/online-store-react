import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { addCart } from "../actions";

function ProductList(props) {
  const data = props.data;
  return data.map((item, i) => {
    return (
      <div className="col-md-3" key={i}>
        <div className="product-single-carousell ctas text-center">
          <div className="product-carousell-img">
            <img src={item.product_image} alt="" />
            <div className="product-carousell-social">
              <Link to={`/product/${item._id}`} className="btn btn-light">
                More Detail
              </Link>
            </div>
            <span className="top-hot">New</span>
          </div>
          <div className="product-carousel-text">
            <h4>{item.product_name}</h4>
            <h5>Rp. {item.price}</h5>
            <button
              onClick={e => props.cartAdd(item)}
              className="btn btn-dark rounded-pill"
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    );
  });
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
