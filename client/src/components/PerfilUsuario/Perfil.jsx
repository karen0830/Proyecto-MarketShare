import React, { createContext, useContext, useState, useEffect } from "react";
import "./Perfil.css";
import { getImage, getPublications, getUpdateUser, sendPublications } from "../../api/auth";
import { useAuth } from "../../context/AuthContext";
import Publications from "../Publications/Publications";
import { Link } from "react-router-dom";
import { Publicar } from "../Publications/Publicar/Publicar.jsx";
import { Modal } from "../Publications/Publicar/Publicar.jsx";

export const sharedData = createContext()
export const useShareData = () => {
  const context = useContext(sharedData);
  if (!context) {
    throw new Error("useAuth must be ussed within an AutProvider")
  }
  return context;
}
export const Perfil = () => {
  const [file, setFile] = useState(null);
  const { user, profileImage, setProfileImage } = useAuth()
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    console.log(file);
  };

  const handleUpload = async () => {
    console.log("hola");
    try {
      const response = await getImage(file);
      if (response) {
        console.log("Response", response);
        setProfileImage(response.data.imagen)
      }

    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="general-container">
      <div className="info-usuario">
        <h1>{user.username}</h1>
        <div className="form-container">
          <form
            action="/perfil"
            method="post"
            encType="multipart/form-data"
          ></form>
          <input type="file" name="avatar" className="input-button" />
          <div>
            <input name="miArchivo" type="file" onChange={handleFileChange} />
            <button className="button-avatar" onClick={handleUpload}>
              Cambiar Imagen de perfil
            </button>
            <img className="profileImage" src={profileImage} alt="" />
          </div>
        </div>
        <h2>Descripcion del usuario</h2>
        <h2>pivle vys</h2>
        <div className="popularidad">
          <div>
            <h3>100</h3>
            <p>publicaciones</p>
          </div>
          <div>
            <h3>500</h3>
            <p>seguidores</p>
          </div>
          <div>
            <h3>200</h3>
            <p>seguidos</p>
          </div>
        </div>
        <div className="button-container">
          <button>Seguir</button>
          <button>Mensaje</button>
        </div>
      </div>
      <button type="submit" onClick={openModal}>
        Publicar
      </button>
      <div>
      </div>
      <Modal onClose={closeModal} isOpen={modalIsOpen}>
        <Publicar />
      </Modal>
      <Publications />
    </div >
  );
};
