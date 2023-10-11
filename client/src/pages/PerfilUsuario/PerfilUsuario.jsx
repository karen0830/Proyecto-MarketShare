import React from "react";
import "./PerfilUsuario.css";
import SideBar from "../../components/sidebar/sidebar.jsx";
import Center from "../../components/center/Center";
import Perfil from "../../components/PerfilUsuario/Perfil";
import UserList from "../../components/UserList/UserList.jsx";

export const PerfilUsuario = () => {
  return (
    <div className="div-general">
      <SideBar />
      <Perfil />
    </div>
  );
};

