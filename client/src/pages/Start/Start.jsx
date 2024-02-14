import React from "react";
import SideBar from "../../components/sidebar/sidebar";
import { Stories } from "../../components/Start/Stories/Stories";

export const Start = () => {
  return (
    <div className="div-general">
      <SideBar />
      <Stories></Stories>
    </div>
  );
};
