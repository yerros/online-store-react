import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Dashboard from "./pages/administrator/Dashboard";
import LoginPage from "./pages/administrator/LoginPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import ProductDetail from "./pages/ProductDetail";
import MyAccount from "./pages/MyAccount";
import Product from "./pages/administrator/Products";
import ProductEdit from "./pages/administrator/ProductEdit";
import ProductAdd from "./pages/administrator/ProductAdd";
import Category from "./pages/administrator/Category";
import Orders from "./pages/administrator/Order";
import Customers from "./pages/administrator/Customer";
import Coupon from "./pages/administrator/Coupon";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route path="/cart" component={CartPage} />
        <Route path="/checkout" component={CheckoutPage} />
        <Route path="/myaccount" component={MyAccount} />
        <Route path="/product/:id" component={ProductDetail} />
        <Route exact path="/admin" component={Dashboard} />
        <Route exact path="/admin/product" component={Product} />
        <Route exact path="/admin/product/add" component={ProductAdd} />
        <Route exact path="/admin/product/edit/:id" component={ProductEdit} />
        <Route path="/admin/category" component={Category} />
        <Route path="/admin/order" component={Orders} />
        <Route path="/admin/customer" component={Customers} />
        <Route path="/admin/coupon" component={Coupon} />
        <Route path="/admin/login" component={LoginPage} />
      </Switch>
    </Router>
  );
}

export default App;
