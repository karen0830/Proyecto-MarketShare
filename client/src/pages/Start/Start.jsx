import React, { useState } from "react";
import SideBar from "../../components/sidebar/sidebar";
import { Stories } from "../../components/Start/Stories/Stories";
import TopBar from "../../components/TopBar/TopBar";

export const Start = () => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };
  return (
    <div className="div-general">
      <TopBar toggleSidebar={toggleSidebar} />
      <SideBar />
      <Stories></Stories>
    </div>
  );
};
