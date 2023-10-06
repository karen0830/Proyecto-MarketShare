import React from "react";
import "./sidebar.css";
const SideBar = () => {
  return (
    <div className="sidebar-container">
      <div className="sidebar-vetical-line"></div>
      <div className="sidebar-logo__div">
        <img src="/images/MarketLogoWhite.png" alt="" />
        <div className="sidebar-menu">
          <a href="#" className="Inicio">
            <span className="icon">
              <i className="ri-home-8-line"></i>
            </span>
            Start
          </a>
          <a href="index.html" className="active">
            <span className="icon">
              <i className="ri-function-line"></i>
            </span>
            Feed
          </a>
          <a href="#">
            <span className="icon">
              <i className="ri-search-line"></i>
            </span>
            Search
          </a>
          <a href="#">
            <span className="icon">
              <i className="ri-align-justify"></i>
            </span>
            Categories
          </a>
          <a href="#">
            <span className="icon">
              <i className="ri-settings-5-line"></i>
            </span>
            Settings
          </a>
          <a href="nosotros.html">
            <span className="icon">
              <i className="ri-profile-line"></i>
            </span>
            Nosotros
          </a>
          <a href="">
            <span>
              <i className="ri-profile-fill"></i>
            </span>
            Profile
          </a>
        </div>
      </div>
    </div >
  );
};

export default SideBar;
