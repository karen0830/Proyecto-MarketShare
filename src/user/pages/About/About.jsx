import "./About.css";
import React, { lazy, Suspense } from "react";
import Loader from "../../components/Loaders/Loader.jsx";

const TopBar = lazy(() => import("../../../common/TopBar/TopBar.jsx"));
const Carousel = lazy(() => import("../../components/Carousel/Carousel.jsx"));
const Footer = lazy(() => import("../../components/Footer/Footer.jsx"));
const About = () => {
  return (
    <div className="about-container">
      <Suspense fallback={<Loader />}>
        <TopBar></TopBar>
        <Carousel></Carousel>
        <Footer></Footer>
      </Suspense>
    </div>
  );
};

export default About;
