import React from "react";
import "./home.css";
import SideBar from "../../components/sidebar/sidebar.jsx";
import Center from "../../components/center/Center.jsx";
import LoginRegister from "../../components/Home/LoginRegister.jsx";

const Home = () => {
  return (
    <div className="div-general">
      <SideBar />
      <Center />
      <LoginRegister/>
    </div>
  );
};

export default Home;
