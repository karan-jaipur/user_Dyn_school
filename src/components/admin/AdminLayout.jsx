import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../website/Navbar";
import Footer from "../website/Footer";
  
const Layout = () => {
  return (
    <>
      <Navbar/>
      
      <Outlet />

      <Footer />
    </>
  );
};

export default Layout;