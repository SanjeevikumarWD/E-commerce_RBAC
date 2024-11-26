// App.js
import React from "react";
import Home from "./components/home/Home";
import About from "./components/about/About";
import Shop from "./components/shop/Shop.jsx";
import LoginRegister from "./components/login_register/LoginRegister.jsx";
import Register from "./components/login_register/Register.jsx";
import Users from "./components/admin/users/Users.jsx";
import Order from "./components/admin/orders/Order.jsx";
import Stocks from "./components/admin/stocks/Stocks.jsx";
import Sales from "./components/admin/sales/Sales.jsx"

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import StaffHomePage from "./components/staff/StaffHomePage.jsx";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/login" element={<LoginRegister />} />
        <Route path="/register" element={<Register />} />
        {/* admin */}
        <Route path="/admin/user" element={<Users />} />
        <Route path="/admin/order" element={<Order />} />
        <Route path="/admin/sale" element={<Sales />} />
        <Route path="/admin/stock" element={<Stocks />} />
        <Route path="/admin/register" element={<Register />} />
        {/* staff */}
        <Route path="/staff/store" element={<StaffHomePage />} />

      </Routes>
    </Router>
  );
};

export default App;