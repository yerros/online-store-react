import React from 'react'

export default function ProductList(props) {
  const data = props.data
  return (
    data.map((item, i) => {
      return <div className="col-md-3" key={i}>
        <div className="product-single-carousell ctas text-center">
          <div className="product-carousell-img">
            <img src={item.img} alt="" />
            <div className="product-carousell-social">
              <a href="img/product-carousell-img-1.jpg" className="search-plus mfp-with-zoom">
                <span><i className="fa fa-search-plus"></i></span>
              </a>
              <span><i className="fa fa-heart"></i></span>
              <span><i className="fa fa-shopping-bag"></i></span>
            </div>
            <span className="top-hot">New</span>
          </div>
          <div className="product-carousel-text">
            <h4>{item.title}</h4>
            <h5>Rp. 320.000</h5>
            <button href="#" className="btn btn-dark rounded-pill">Add To Cart</button>
          </div>
        </div>
      </div>
    })
  )
}
