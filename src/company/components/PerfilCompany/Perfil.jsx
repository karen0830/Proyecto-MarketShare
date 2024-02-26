import React, { createContext, useContext, useState, useEffect } from "react";
import "./PerfilCompany.css";

import { useAuth } from "../../../common/context/AuthContext.jsx";
import { ChangeProfile, ModalChangeProfile } from "./ChangeProfile.jsx";
import Publications from "../../../common/Publications/Publications.jsx";
import { Publicar, Modal } from "../../../common/Publications/Publicar/Publicar.jsx";

export const sharedData = createContext();
export const useShareData = () => {
  const context = useContext(sharedData);
  if (!context) {
    throw new Error("useAuth must be ussed within an AutProvider");
  }
  return context;
};

export const Perfil = () => {
  const { companyData, profileImageCompany, setProfileImageCompany,isAuthenticatedCompany, profileData } = useAuth();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalChageProfileOpen, setModalChageProfileOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (profileData != null) {
      setLoading(false);
    }
  });

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

  return (
    <div className={"profileCompany"}>
      {profileData ? (
        <div className={loading ? "spinner hiddenInfo" : "profileUser"}>
          <div className="banner">
            <img src="./img/banner.jpeg" alt="" />
          </div>
          <div className="floatData">
            <div className="profile-picture">
              <img
                className="profileImageData"
                src={profileData.profileImage}
                alt=""
              />
            </div>
            <div className="info-usuarioData">
              <h1>{profileData ? profileData.username : companyData.userNameCompany}</h1>
              <div className="button-containerData">
                <button>Follow</button>
                <button>Message</button>
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
      ) : (
        <div className={"profileCompany"}>
          <div className="banner">
            <img src="./img/banner.jpeg" alt="" />
          </div>
          <div className="floatData">
            <div className="profile-picture">
              <img className="profileImageData" src={profileImageCompany} alt="" />
              <button
                onClick={openModalChageProfile}
                htmlFor="fileInput"
                className="file-input-label"
              >
                <i className="ri-camera-line camera-icon"></i>
              </button>
              <ModalChangeProfile
                onClose={closeModalChageProfile}
                isOpen={modalChageProfileOpen}
              >
                <ChangeProfile />
              </ModalChangeProfile>
            </div>
            <div className="info-usuarioData">
              <h1>{companyData.userNameCompany}</h1>
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
                Add photos/videos
                </button>
                <Modal onClose={closeModal} isOpen={modalIsOpen}>
                  <Publicar />
                </Modal>
                <button>Message</button>
              </div>
            </div>
          </div>
          <div className="user-actionsData">
            <div className="popularidad">
              <div>
                <h3>100</h3>
                <p>publications</p>
              </div>
              <div>
                <h3>500</h3>
                <p>Followers</p>
              </div>
              <div>
                <h3>200</h3>
                <p>Followed</p>
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
      )}
    </div>
  );
};
