import React from "react";
import "./sidebar.css";
const SideBar = () => {
  return (
    <div className="sidebar-container">
      <div className="sidebar-vetical-line"></div>
      <div className="sidebar-logo__div">
        <img src="/images/MarketLogoWhite.png" alt="" />
        <div class="sidebar-menu">
          <a href="#" class="Inicio">
            <span class="icon">
              <i class="ri-home-8-line"></i>
            </span>
            Start
          </a>
          <a href="index.html" class="active">
            <span class="icon">
              <i class="ri-function-line"></i>
            </span>
            Feed
          </a>
          <a href="#">
            <span class="icon">
              <i class="ri-search-line"></i>
            </span>
            Search
          </a>
          <a href="#">
            <span class="icon">
              <i class="ri-align-justify"></i>
            </span>
            Categories
          </a>
          <a href="#">
            <span class="icon">
              <i class="ri-settings-5-line"></i>
            </span>
            Settings
          </a>
          <a href="nosotros.html">
            <span class="icon">
              <i class="ri-profile-line"></i>
            </span>
            Nosotros
          </a>
          <a href="">
            <span>
              <i class="ri-profile-fill"></i>
            </span>
            Profile
          </a>
        </div>
      </div>
    </div >
  );
};

export default SideBar;
