import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.render(
  <>
    <App />
    <ToastContainer position="top-center" autoClose={5000} />
    {/* Razorpay Script for Payment Integration */}
    <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
  </>,
  document.getElementById("root")
);
