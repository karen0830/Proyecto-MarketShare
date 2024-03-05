import React, { useState, lazy, Suspense } from "react";
import "./PerfilCompany.css";
import SideBar from "../../../common/sidebar/sidebar.jsx";
import { Perfil } from "../../components/PerfilCompany/Perfil.jsx";
import TopBar from "../../../common/TopBar/TopBar.jsx";

export const PerfilCompany = () => {
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
