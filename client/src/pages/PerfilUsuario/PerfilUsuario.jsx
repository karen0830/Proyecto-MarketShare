import React from "react";
import "./PerfilUsuario.css";
import SideBar from "../../components/sidebar/sidebar.jsx";
import UserList from "../../components/UserList/UserList.jsx";
import { Perfil } from "../../components/PerfilUsuario/Perfil";

export const PerfilUsuario = () => {
  return (
    <div className="div-general">
      <SideBar />
      <Perfil />
    </div>
  );
};

