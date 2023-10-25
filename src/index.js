/*!

=========================================================
* BLK Design System React - v1.2.2
=========================================================

* Product Page: https://www.creative-tim.com/product/blk-design-system-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/blk-design-system-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
// import dotenv from "dotenv"

import "assets/css/nucleo-icons.css";
import "assets/scss/blk-design-system-react.scss";
import "assets/demo/demo.css";
// import '@coreui/coreui/dist/css/coreui.min.css'
// import 'bootstrap/dist/css/bootstrap.min.css'

import Index from "views/Index.js";
import LandingPage from "views/examples/LandingPage.js";
import RegisterPage from "views/examples/RegisterPage.js";
import ProfilePage from "views/examples/ProfilePage.js";
import LoginPage from "views/examples/LoginPage";
import ExpGengres from "views/examples/Exp_Genres";

const root = ReactDOM.createRoot(document.getElementById("root"));
// dotenv.config({path:''})
// eslint-disable-next-line no-lone-blocks
// {console.log(process.env.REACT_APP_KEY,"index")}
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/home-page" element={<Index />} />
      <Route path="/landing-page" element={<LandingPage />} />
      <Route path="/gen-page" element={<ExpGengres />} />
      <Route path="/register-page" element={<RegisterPage />} />
      <Route path="/login-page" element={<LoginPage />} />
      <Route path="/profile-page" element={<ProfilePage />} />
      <Route path="*" element={<Navigate to="/landing-page" replace />} />
    </Routes>
  </BrowserRouter>
);
