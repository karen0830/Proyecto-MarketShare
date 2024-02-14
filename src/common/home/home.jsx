import React from "react";
import "./home.css";
import SideBar from "../../user/components/sidebar/sidebar.jsx";
import Publications from "../../user/components/Publications/Publications.jsx";
import LoginRegister from "../../common/LoginRegister/LoginRegister.jsx";

const Home = () => {
  return (
    <div className="div-general">
      <SideBar />
      <Publications />
      <LoginRegister />
    </div>
  );
};

export default Home;
