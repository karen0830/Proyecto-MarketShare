import React, { useState, useRef, useEffect } from "react";
import "./Stories.css";
import { useAuth } from "../../../../common/context/AuthContext.jsx";
import { Link } from "react-router-dom";
import { Modal, Publicar } from "../../../../common/Publications/Publicar/Publicar.jsx";
import Publications from "../../../../common/Publications/Publications.jsx";
import { getUpdateCompany, getUpdateStories } from "../../../../common/api/auth.company.js";

export const Stories = () => {
  const { companyData, setCompanyData, profileImageCompany } = useAuth();
  const [selectedFileVideo, setSelectedFileVideo] = useState();
  const [selectedFileImage, setSelectedFileImage] = useState();
  const [story, setStory] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const imageRef = useRef();
  const handleFileInput = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type.startsWith("video/")) {
        setSelectedFileVideo(e.target.files[0]);
      } else if (file.type.startsWith("image/")) {
        setSelectedFileImage(e.target.files[0]);
        const imageURL = URL.createObjectURL(file);
        imageRef.current.src = imageURL;
      } else {
        // El archivo no es ni video ni imagen
      }
    }
  };

  const handleUploadImage = async () => {
    try {
      const response = await getUpdateStories(selectedFileImage);
      if (response) {
        console.log("Response", response);
      }
      checkLogin();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  async function checkLogin() {
    try {
      const res = await getUpdateCompany();
      setCompanyData(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (companyData && companyData.stories) {
      setStory(companyData.stories);
    }
  }, [companyData]);
  
  return (
    <>
      <div className="Stories">
        <div className="margin-top"></div>
        <div className="header">
          <div className="stories-title">
            <a href="#" className="btn">
              <i className="ri-play-circle-line"></i>
              <div className="text">Ver todo</div>
            </a>
          </div>
          <div className="header-content">
            <a href="#" className="btn" onClick={openModal}>
              <i className="ri-add-circle-fill"></i>
              <div className="btn-text">Agregar Fotos</div>
            </a>
          </div>
        </div>
        <div className="stories">
          <div className="stories-img color image-container">
            <img src={profileImageCompany} alt="" className="image" />
            <div className="overlay">
              <label className="custom-file-input">
                <input
                  name="miArchivo"
                  type="file"
                  accept="image/*"
                  onChange={handleFileInput}
                />
              </label>
            </div>
          </div>
          {
            story.map((element, index) => (
              <div key={index} className="stories-img color">
                <img className="historyImageProfile" src={element.url} alt="" />
              </div>
            ))
          }
          <div className="stories-img color">
            <img className="historyImageProfile" ref={imageRef} alt="" />
          </div>
          <button className="subir-historias" onClick={handleUploadImage}>
            Subir historias
          </button>
        </div>
        <Modal onClose={closeModal} isOpen={modalIsOpen}>
          <Publicar />
        </Modal>
        <Publications />
      </div>
    </>
  );
};
