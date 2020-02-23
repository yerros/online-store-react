import React, { Component } from 'react'
import Header from '../component/Header'
import Slider from '../component/Slider'
import HomeCategory from '../component/HomeCategory'
import ProductList from '../component/ProductList'
import Footer from '../component/Footer'

const data = [
  {
    title: "Sepatu keren",
    img: "/assets/images/prod_1.jpg",
    price: 46
  },
  {
    title: "Sepatu keren",
    img: "/assets/images/prod_2.jpg",
    price: 46
  },
  {
    title: "Sepatu keren",
    img: "/assets/images/prod_3.jpg",
    price: 46
  },
  {
    title: "Sepatu keren",
    img: "/assets/images/prod_4.jpg",
    price: 46
  },
]
export default class Homepage extends Component {
  render() {
    return (
      <div>
        <Header />
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
                  <ProductList data={data} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}
