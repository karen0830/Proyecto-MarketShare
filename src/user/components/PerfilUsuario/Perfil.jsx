import React, { createContext, useContext, useState, useEffect } from "react";
import "./Perfil.css";
import { getImage, getPublications, getUpdateUser, sendPublications } from "../../api/auth";
import { useAuth } from "../../context/AuthContext";
import Publications from "../Publications/Publications";
import { Link } from "react-router-dom";
import { Publicar } from "../Publications/Publicar/Publicar.jsx";
import { Modal } from "../Publications/Publicar/Publicar.jsx";
import { ChangeProfile, ModalChangeProfile } from "./ChangeProfile.jsx";

export const sharedData = createContext()
export const useShareData = () => {
  const context = useContext(sharedData);
  if (!context) {
    throw new Error("useAuth must be ussed within an AutProvider")
  }
  return context;
}
export const Perfil = () => {
  const { user, profileImage, setProfileImage, profileData } = useAuth()
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalChageProfileOpen, setModalChageProfileOpen] = useState(false)

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };


  const closeModalChageProfile = () => {
    setModalChageProfileOpen(false);
  };

  const openModalChageProfile = () => {
    setModalChageProfileOpen(true);
  };

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (profileData != null) {
      setLoading(false)
    }
  })

  return (
    <div className={"general-container"}>
      {profileData ? (
        <div className={loading ? "spinner hiddenInfo" : "profileUser"}>
          <div className="banner">
            <img src="./img/banner.jpeg" alt="" />
          </div>
          <div className="floatData">
            <div className="profile-picture">
              {/* <Icon
              className="change-image"
              icon="solar:camera-outline"
              width="1.5em"
              height="1.5em"
              onClick={handleUpload}
            /> */}
              <img className="profileImageData" src={profileData.profileImage} alt="" />
            </div>
            <div className="info-usuarioData">
              <h1>{profileData ? profileData.username : user.username}</h1>
              <div className="button-containerData">
                <button>Seguir</button>
                <button>Mensaje</button>
              </div>
            </div>
          </div>
          <div className="user-actionsData">
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
            <div className="form-container">
              <form
                action="/perfil"
                method="post"
                encType="multipart/form-data"
              ></form>
              <div></div>
            </div>
          </div>
          <Publications />
        </div>
      ) :
        <div className={"general-container"}>
          <div className="banner">
            <img src="./img/banner.jpeg" alt="" />
          </div>
          <div className="floatData">
            <div className="profile-picture">
              <img className="profileImageData" src={profileImage} alt="" />
              <button onClick={openModalChageProfile} htmlFor="fileInput" className="file-input-label">
                {/* <input
                  type="file"
                  id="fileInput"
                  className="file-input"
                  onChange={handleFileChange}
                  onClick={openModalChageProfile}
                /> */}
                <i className="ri-camera-line camera-icon"></i>
              </button>
              <ModalChangeProfile onClose={closeModalChageProfile} isOpen={modalChageProfileOpen} title='Elegir foto de perfil'>
                <ChangeProfile />
              </ModalChangeProfile>
            </div>
            <div className="info-usuarioData">
              <h1>{user.username}</h1>
              <div className="button-containerData">
                <div className="form-container">
                  <form
                    action="/perfil"
                    method="post"
                    encType="multipart/form-data"
                  ></form>
                  <input type="file" name="avatar" className="input-button" />
                </div>
                <button type="submit" onClick={openModal}>
                  Publicar
                </button>
                <Modal onClose={closeModal} isOpen={modalIsOpen}>
                  <Publicar />
                </Modal>
                <button>Mensaje</button>
              </div>
            </div>
          </div>
          <div className="user-actionsData">
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
            <div className="form-container">
              <form
                action="/perfil"
                method="post"
                encType="multipart/form-data"
              ></form>
              <div></div>
            </div>
          </div>
          <Publications />
        </div>
      }
    </div >

  );
};



{/* <div>
          <div className="info-usuario">
            <div className="banner">
              <img src="./img/banner.jpg" alt="" />
            </div>
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
          <Publications />
        </div>
      }
    </div> */}