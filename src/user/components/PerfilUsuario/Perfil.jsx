import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  lazy,
  Suspense,
} from "react";
import "./Perfil.css";
import { useAuth } from "../../../common/context/AuthContext.jsx";
import { Link } from "react-router-dom";
import { ChangeProfile, ModalChangeProfile } from "./ChangeProfile.jsx";
import Loader from "../Loaders/Loader";
import { Modal, Publicar } from "../../../common/Publications/Publicar/Publicar.jsx";
import Publications from "../../../common/Publications/Publications.jsx";

export const sharedData = createContext();
export const useShareData = () => {
  const context = useContext(sharedData);
  if (!context) {
    throw new Error("useAuth must be ussed within an AutProvider");
  }
  return context;
};

export const Perfil = () => {
  const { user, profileImage, setProfileImage, profileData } = useAuth();
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
    <div className={"general-container"}>
      {profileData ? (
        <div className={loading ? "spinner hiddenInfo" : "profileUser"}>
          <div className="banner">
            {/* <img src="./img/banner.jpeg" alt="" />*/}
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
      ) : (
        <div className={"general-container"}>
          <div className="banner">
            {/* <img src="./img/banner.jpeg" alt="" />*/}
          </div>
          <div className="floatData">
            <div className="profile-picture">
              <img className="profileImageData" src={profileImage} alt="" />
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
                <Modal onClose={closeModal} isOpen={modalIsOpen}>
                  <Publicar />
                </Modal>
                <button>Menssage</button>
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
          <Suspense fallback={<Loader />}>
            <Publications />
          </Suspense>
        </div>
      )}
    </div>
  );
};
