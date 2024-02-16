import React, { useState } from "react";
import "./PerfilUsuario.css";
import SideBar from "../../components/sidebar/sidebar.jsx";
import { Perfil } from "../../components/PerfilUsuario/Perfil";
import TopBar from "../../../common/TopBar/TopBar";

export const PerfilUsuario = () => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  return (
    <div
      className={`div-general ${isSidebarExpanded ? "sidebar-expanded" : ""}`}
    >
      <TopBar toggleSidebar={toggleSidebar} />
      <SideBar />
      <Perfil />
    </div>
  );
};
