import "./About.css";
import Carousel from "../../components/Carousel/Carousel";
import TopBar from "../../../common/TopBar/TopBar.jsx";
import Footer from "../../components/Footer/Footer";

const About = () => {
  return (
    <div className="about-container">
      <TopBar></TopBar>
      <Carousel></Carousel>
      <Footer></Footer>
    </div>
  );
};

export default About;
