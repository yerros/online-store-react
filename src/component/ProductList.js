import React from "react";
export default function ProductList(props) {
  const data = props.data;
  return data.map((item, i) => {
    return (
      <div className="col-md-3" key={i}>
        <div className="product-single-carousell ctas text-center">
          <div className="product-carousell-img">
            <img src={item.product_image} alt="" />
            <div className="product-carousell-social">
              <a href={`/product/${item._id}`} className="btn btn-light">
                More Detail
              </a>
            </div>
            <span className="top-hot">New</span>
          </div>
          <div className="product-carousel-text">
            <h4>{item.product_name}</h4>
            <h5>Rp. {item.price}</h5>
            <button href="#" className="btn btn-dark rounded-pill">
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    );
  });
}
