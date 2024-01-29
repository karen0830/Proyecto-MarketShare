import React from "react";
import "./home.css";
import SideBar from "../../components/sidebar/sidebar.jsx";
import Publications from "../../components/Publications/Publications.jsx";
import LoginRegister from "../../components/Home/LoginRegister.jsx";

const Home = () => {
  return (
    <div className="div-general">
      <SideBar />
      <Publications />
      <LoginRegister/>
    </div>
  );
};

export default Home;
