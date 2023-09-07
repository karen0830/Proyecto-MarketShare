import React from "react";
import "./home.css";
import SideBar from "./sidebar/sidebar";
import Center from "./center/Center";
import { LoginRegister } from "./Login/LoginRegister.jsx";

const Home = () => {
  return (
    <div className="div-general">
      <SideBar />
      <Center />
      <LoginRegister />
    </div>
  );
};

export default Home;
