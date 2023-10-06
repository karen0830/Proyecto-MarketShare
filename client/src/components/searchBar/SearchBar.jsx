import "./searchBar.css";
import React from "react";
import { Icon } from "@iconify/react";

export const SearchBar = () => {
  return (
    <div className="main-home">
      <div className="header">
        <div className="search">
          <Icon icon="zondicons:search" width="20" height="20" />
          <input type="text" placeholder="search" />
        </div>
      </div>
    </div>
  );
};
