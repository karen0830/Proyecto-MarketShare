// SideBar.jsx

import React from "react";
import "./sidebar.css";
import { useAuth } from "../context/AuthContext.jsx";
import { NavLink, useNavigate } from "react-router-dom";

const SideBar = () => {
  const { isAuthenticated, logoutUsers, isAuthenticatedCompany, logoutCompanyData, user } = useAuth();
  return (
    <div
      className={`sidebar-container ${isAuthenticated ? "authenticated" : "unauthenticated"
        }`}
    >
      <div
        className="sidebar-logo__div"
        style={{
          marginTop: isAuthenticated || isAuthenticatedCompany ? "4.375em" : "0",
          padding: "1.57em",
        }}
      >
        <div className="sidebar-menu">
          {isAuthenticated ? (
            <>
              <div className="sidebar">
                <div className="menu">
                  <NavLink to="/start" className="Inicio">
                    <span className="icon">
                      <i className="ri-home-8-line"></i>
                    </span>
                    <span className="text">Start</span>
                  </NavLink>
                  <NavLink to="/Feed">
                    <span className="icon">
                      <i className="ri-function-line"></i>
                    </span>
                    <span className="text">Feed</span>
                  </NavLink>
                  <NavLink to="/Explore">
                    <span className="icon">
                      <i className="ri-search-line"></i>
                    </span>
                    <span className="text">Explore</span>
                  </NavLink>
                  <NavLink to="/Notifications">
                    <span className="icon">
                      <i className="ri-notification-4-line"></i>
                    </span>
                    <span className="text">Notifications</span>
                  </NavLink>
                  <NavLink to="/Messages">
                    <span className="icon">
                      <i className="ri-mail-unread-fill"></i>
                    </span>
                    <span className="text">Messages</span>
                  </NavLink>
                  <NavLink to="/Direct">
                    <span className="icon">
                      <i className="ri-send-plane-fill"></i>
                    </span>
                    <span className="text">Direct</span>
                  </NavLink>
                  <NavLink  to={`http://localhost:5173/:${user.id}`}>
                    <span className="icon">
                      <i className="ri-align-justify"></i>
                    </span>
                    <span className="text">Ecommerce</span>
                  </NavLink>
                  <NavLink to="/Settings">
                    <span className="icon">
                      <i className="ri-settings-5-line"></i>
                    </span>
                    <span className="text">Settings</span>
                  </NavLink>
                  <NavLink to="/About">
                    <span className="icon">
                      <i className="ri-profile-line"></i>
                    </span>
                    <span className="text">About</span>
                  </NavLink>
                  <NavLink to="/ProfileUser">
                    <span className="icon">
                      <i class="ri-user-line"></i>
                    </span>
                    <span className="text">Profile</span>
                  </NavLink>
                  <button className="button-logout" onClick={logoutUsers}>
                    <span>
                      <i className="ri-logout-box-r-line"></i>
                    </span>
                    <span className="text">Logout</span>
                  </button>
                </div>
              </div>
            </>
          ) : (
            isAuthenticatedCompany ? (
              <>
                <div className="sidebar">
                  <div className="menu">
                    <NavLink to="/Start" className="Inicio">
                      <span className="icon">
                        <i className="ri-home-8-line"></i>
                      </span>
                      <span className="text">Start</span>
                    </NavLink>
                    <NavLink to="/Feed">
                      <span className="icon">
                        <i className="ri-function-line"></i>
                      </span>
                      <span className="text">Feed</span>
                    </NavLink>
                    <NavLink to="/Notifications">
                      <span className="icon">
                        <i className="ri-notification-4-line"></i>
                      </span>
                      <span className="text">Notifications</span>
                    </NavLink>
                    <NavLink to="/Messages">
                      <span className="icon">
                        <i className="ri-mail-unread-fill"></i>
                      </span>
                      <span className="text">Messages</span>
                    </NavLink>
                    <NavLink to="/Direct">
                      <span className="icon">
                        <i className="ri-send-plane-fill"></i>
                      </span>
                      <span className="text">Direct</span>
                    </NavLink>
                    <NavLink to="http://localhost:5173">
                      <span className="icon">
                        <i className="ri-align-justify"></i>
                      </span>
                      <span className="text">Ecommerce</span>
                    </NavLink>
                    <NavLink to="/Settings">
                      <span className="icon">
                        <i className="ri-settings-5-line"></i>
                      </span>
                      <span className="text">Settings</span>
                    </NavLink>
                    <NavLink to="/About">
                      <span className="icon">
                        <i className="ri-profile-line"></i>
                      </span>
                      <span className="text">About</span>
                    </NavLink>
                    <NavLink to="/profileCompany">
                      <span className="icon">
                        <i class="ri-user-line"></i>
                      </span>
                      <span className="text">Profile</span>
                    </NavLink>
                    <NavLink onClick={logoutCompanyData}>
                      <span>
                        <i className="ri-logout-box-r-line"></i>
                      </span>
                      <span className="text">Logout</span>
                    </NavLink>
                  </div>
                </div>
              </>
            ) :
              <>
                <a href="#" className="logo">
                  <img src="./img/2.png" alt="" />
                </a>
                <NavLink to="/Start" className="Inicio">
                  <span className="icon">
                    <i className="ri-home-8-line"></i>
                  </span>
                  <span className="text">Start</span>
                </NavLink>
                <NavLink to="/Feed">
                  <span className="icon">
                    <i className="ri-function-line"></i>
                  </span>
                  <span className="text">Feed</span>
                </NavLink>
                <NavLink to="/Search">
                  <span className="icon">
                    <i className="ri-search-line"></i>
                  </span>
                  <span className="text">Search</span>
                </NavLink>
                <NavLink to="http://localhost:5173">
                  <span className="icon">
                    <i className="ri-align-justify"></i>
                  </span>
                  <span className="text">Ecommerce</span>
                </NavLink>
                <NavLink to="/Settings">
                  <span className="icon">
                    <i className="ri-settings-5-line"></i>
                  </span>
                  <span className="text">Settings</span>
                </NavLink>
                <NavLink to="/About">
                  <span className="icon">
                    <i className="ri-profile-line"></i>
                  </span>
                  <span className="text">About</span>
                </NavLink>
              </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SideBar;

{/* <>
              <a href="#" className="logo">
                <img src="./img/2.png" alt="" />
              </a>
              <NavLink to="/Start" className="Inicio">
                <span className="icon">
                  <i className="ri-home-8-line"></i>
                </span>
                <span className="text">Start</span>
              </NavLink>
              <NavLink to="/Feed">
                <span className="icon">
                  <i className="ri-function-line"></i>
                </span>
                <span className="text">Feed</span>
              </NavLink>
              <NavLink to="/Search">
                <span className="icon">
                  <i className="ri-search-line"></i>
                </span>
                <span className="text">Search</span>
              </NavLink>
              <NavLink to="/Categories">
                <span className="icon">
                  <i className="ri-align-justify"></i>
                </span>
                <span className="text">Categories</span>
              </NavLink>
              <NavLink to="/Settings">
                <span className="icon">
                  <i className="ri-settings-5-line"></i>
                </span>
                <span className="text">Settings</span>
              </NavLink>
              <NavLink to="/About">
                <span className="icon">
                  <i className="ri-profile-line"></i>
                </span>
                <span className="text">About</span>
              </NavLink>
            </> */}
