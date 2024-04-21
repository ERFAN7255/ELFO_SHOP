import React from "react";
import Sidebar from "../../Components/UserPanel/Sidebar/Sidebar";
import Header from "../../Components/Header/Header";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import { Outlet } from "react-router-dom";
import EditProfile from "./EditProfile/EditProfile";
import "./IndexUserPanel.css";

export default function IndexUserPanel() {
  return (
    <>
      <Header />
      <Navbar />

      <div className="dashbord">
        <Sidebar />
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
