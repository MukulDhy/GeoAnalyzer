import React from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Header from "./Component/Header";
import Home from "./FrontPage";

const Rock = () => {
  return (
    // <BrowserRouter>
    <div className="bg-transparent">
      <div className="Navbar">
        <Header></Header>
      </div>
      <Home></Home>
    </div>
    // </BrowserRouter>
  );
};

export default Rock;
