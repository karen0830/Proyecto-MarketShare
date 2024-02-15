import React from "react";
import "./TopBar.css";
import { NavLink } from "react-router-dom";
import SearchBar from "../../user/components/searchBar/SearchBar.jsx";
import { Icon } from "@iconify/react";
const TopBar = ({ toggleSidebar }) => {
  return (
    <div className="top-bar">
      <NavLink to="/profileUser">
        <img src="./img/2.png" alt="" className="img-top-bar" />
      </NavLink>

      <SearchBar></SearchBar>
      <button className="hide-sidebar-button" onClick={toggleSidebar}>
        <Icon icon="vaadin:lines" width="1.2em" height="1.2em" />
      </button>
    </div>
  );
};

export default TopBar;
