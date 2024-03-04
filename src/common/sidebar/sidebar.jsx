import React from "react";
import "./sidebar.css";
import { useAuth } from "../context/AuthContext.jsx";
import { NavLink } from "react-router-dom";

const SideBar = () => {
  const { isAuthenticated, logoutUsers, isAuthenticatedCompany, logoutCompanyData, user } = useAuth();
  return (
    <div
      className={`sidebar-container ${isAuthenticated ? "autenticado" : "no-autenticado"
        }`}
    >
      <div
        className="sidebar-logo__div"
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
                    <span className="text">Inicio</span>
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
                    <span className="text">Notificaciones</span>
                  </NavLink>
                  <NavLink to="/Messages">
                    <span className="icon">
                      <i className="ri-mail-unread-fill"></i>
                    </span>
                    <span className="text">Mensajes</span>
                  </NavLink>
                  <NavLink to="/Direct">
                    <span className="icon">
                      <i className="ri-send-plane-fill"></i>
                    </span>
                    <span className="text">Directo</span>
                  </NavLink>
                  <NavLink  to={`https://main--marketshare-ecommerce.netlify.app/login`}>
                    <span className="icon">
                      <i className="ri-align-justify"></i>
                    </span>
                    <span className="text">Ecommerce</span>
                  </NavLink>
                  <NavLink to="/Settings">
                    <span className="icon">
                      <i className="ri-settings-5-line"></i>
                    </span>
                    <span className="text">Configuración</span>
                  </NavLink>
                  <NavLink to="/About">
                    <span className="icon">
                      <i className="ri-profile-line"></i>
                    </span>
                    <span className="text">Acerca de</span>
                  </NavLink>
                  <NavLink to="/ProfileUser">
                    <span className="icon">
                      <i class="ri-user-line"></i>
                    </span>
                    <span className="text">Perfil</span>
                  </NavLink>
                  <button className="button-logout" onClick={logoutUsers}>
                    <span>
                      <i className="ri-logout-box-r-line"></i>
                    </span>
                    <span className="text">Cerrar sesión</span>
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
                      <span className="text">Inicio</span>
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
                      <span className="text">Notificaciones</span>
                    </NavLink>
                    <NavLink to="/Messages">
                      <span className="icon">
                        <i className="ri-mail-unread-fill"></i>
                      </span>
                      <span className="text">Mensajes</span>
                    </NavLink>
                    {/* <NavLink to="/Direct">
                      <span className="icon">
                        <i className="ri-send-plane-fill"></i>
                      </span>
                      <span className="text">Directo</span>
                    </NavLink> */}
                    <NavLink to="https://main--marketshare-ecommerce.netlify.app/login">
                      <span className="icon">
                        <i className="ri-align-justify"></i>
                      </span>
                      <span className="text">Ecommerce</span>
                    </NavLink>
                    <NavLink to="/Settings">
                      <span className="icon">
                        <i className="ri-settings-5-line"></i>
                      </span>
                      <span className="text">Configuración</span>
                    </NavLink>
                    <NavLink to="/About">
                      <span className="icon">
                        <i className="ri-profile-line"></i>
                      </span>
                      <span className="text">Acerca de</span>
                    </NavLink>
                    <NavLink to="/profileCompany">
                      <span className="icon">
                        <i class="ri-user-line"></i>
                      </span>
                      <span className="text">Perfil</span>
                    </NavLink>
                    <NavLink onClick={logoutCompanyData}>
                      <span>
                        <i className="ri-logout-box-r-line"></i>
                      </span>
                      <span className="text">Cerrar sesión</span>
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
                  <span className="text">Inicio</span>
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
                  <span className="text">Buscar</span>
                </NavLink>
                <NavLink to="https://main--marketshare-ecommerce.netlify.app/login">
                  <span className="icon">
                    <i className="ri-align-justify"></i>
                  </span>
                  <span className="text">Ecommerce</span>
                </NavLink>
                <NavLink to="/Settings">
                  <span className="icon">
                    <i className="ri-settings-5-line"></i>
                  </span>
                  <span className="text">Configuración</span>
                </NavLink>
                <NavLink to="/About">
                  <span className="icon">
                    <i className="ri-profile-line"></i>
                  </span>
                  <span className="text">Acerca de</span>
                </NavLink>
              </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
