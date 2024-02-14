import React from "react";
import "./sidebar.css";
import { useAuth } from "../../context/AuthContext.jsx";
import { NavLink } from "react-router-dom";

const SideBar = () => {
  const { isAuthenticated, logoutUsers } = useAuth();
  console.log(isAuthenticated, " de is");

  return (
    <div
      className={`sidebar-container ${
        isAuthenticated ? "authenticated" : "unauthenticated"
      }`}
    >
      <div>
        <div
          className="sidebar-logo__div"
          style={{ marginTop: isAuthenticated ? "70px" : "20px" }}
        >
          <div className="sidebar-menu">
            <div className="sidebar-menu">
              {isAuthenticated ? (
                <>
                  <div className="sidebar">
                    <div className="menu">
                      <NavLink to="/Start" className="Inicio">
                        <span className="icon">
                          <i className="ri-home-8-line"></i>
                        </span>
                        Start
                      </NavLink>
                      <NavLink className="">
                        <span className="icon">
                          <i className="ri-function-line"></i>
                        </span>
                        Feed
                      </NavLink>
                      <a href="#">
                        <span className="icon">
                          <i className="ri-search-line"></i>
                        </span>
                        Explore
                      </a>
                      <a href="#">
                        <span className="icon">
                          <i className="ri-notification-4-line"></i>
                        </span>
                        Notifications
                      </a>
                      <a href="#">
                        <span className="icon">
                          <i className="ri-mail-unread-fill"></i>
                        </span>
                        Messages
                      </a>
                      <a href="#">
                        <span className="icon">
                          <i className="ri-send-plane-fill"></i>
                        </span>
                        Direct
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

                      <NavLink to="/about">
                        <span className="icon">
                          <i className="ri-profile-line"></i>
                        </span>
                        About
                      </NavLink>

                      <NavLink to="/profileUser">
                        <span className="icon">
                          <i class="ri-user-line"></i>
                        </span>
                        Profile
                      </NavLink>
                      <a href="#">
                        <button className="button-logout" onClick={logoutUsers}>
                          <span>
                            <i className="ri-logout-box-r-line"></i>
                          </span>
                          Logout
                        </button>
                      </a>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <a href="#" className="logo">
                    <img src="./img/2.png" alt="" />
                  </a>
                  <a href="#" className="Inicio">
                    <span className="icon">
                      <i className="ri-home-8-line"></i>
                    </span>
                    Start
                  </a>
                  
                  <a href="#" className="inactive">
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
    </div>
  );
};

export default SideBar;
