import React from "react";
import "./sidebar.css";
import { useAuth } from '../../context/AuthContext.jsx'
import { NavLink } from "react-router-dom";

const SideBar = () => {
  const { isAuthenticated, logoutUsers } = useAuth();
  console.log(isAuthenticated, " de is");

  return (
    <div className="sidebar-container">
      <div>
        <div className="sidebar-vetical-line"></div>
        <div className="sidebar-logo__div">
          <img src="/images/MarketLogoWhite.png" alt="" />
          <div className="sidebar-menu">
            {isAuthenticated ? (
              <>
                <div class="sidebar">
                  <a href="#" class="logo">
                    <img src="./img/2.png" alt="" />
                  </a>
                  <div class="about">
                    <div class="box">
                      <h3>89</h3>
                      <span>Posts</span>
                    </div>
                    <div class="box">
                      <h3>123M</h3>
                      <span>Followers</span>
                    </div>
                    <div class="box">
                      <h3>14</h3>
                      <span>Following</span>
                    </div>
                  </div>
                  <div class="menu">
                    <NavLink to="/Start" class="Inicio">
                      <span class="icon">
                        <i class="ri-home-8-line"></i>
                      </span>
                      Start
                    </NavLink>
                    <NavLink class="active">
                      <span class="icon">
                        <i class="ri-function-line"></i>
                      </span>
                      Feed
                    </NavLink>
                    <a href="#">
                      <span class="icon">
                        <i class="ri-search-line"></i>
                      </span>
                      Explore
                    </a>
                    <a href="#">
                      <span class="icon">
                        <i class="ri-notification-4-line"></i>
                      </span>
                      Notifications
                    </a>
                    <a href="#">
                      <span class="icon">
                        <i class="ri-mail-unread-fill"></i>
                      </span>
                      Messages
                    </a>
                    <a href="#">
                      <span class="icon">
                        <i class="ri-send-plane-fill"></i>
                      </span>
                      Direct
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
                      About
                    </a>
                    <NavLink to="/profileUser">
                      <span class="icon">
                        <i class="ri-profile-line"></i>
                      </span>
                      Profile
                    </NavLink>
                    <a href="#">
                      <button onClick={logoutUsers}>
                        <span>
                          <i class="ri-logout-box-r-line"></i>
                        </span>
                        Logout
                      </button>
                    </a>
                  </div>
                </div>
              </>
            ) : (
              <>
                <a href="#" class="logo">
                  <img src="./img/2.png" alt="" />
                </a>
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
                  About
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
