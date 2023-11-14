import React, { useState, useRef, useEffect } from "react";
import "./Stories.css";
import { useAuth } from "../../../context/AuthContext.jsx";
import { getUpdateStories, getUpdateUser } from "../../../api/auth";
export const Stories = () => {
  const { user, setUser } = useAuth();
  const [selectedFileVideo, setSelectedFileVideo] = useState();
  const [selectedFileImage, setSelectedFileImage] = useState();
  const [publication, setPublication] = useState(user.publications);
  const [story, setStory] = useState(user.stories);
  const imageRef = useRef();
  const handleFileInput = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type.startsWith("video/")) {
        // Es un archivo de video
        setSelectedFileVideo(e.target.files[0]);
        // Realiza acciones específicas para videos
      } else if (file.type.startsWith("image/")) {
        setSelectedFileImage(e.target.files[0]);
        const imageURL = URL.createObjectURL(file);
        imageRef.current.src = imageURL;
        // Es un archivo de imagen
        // Realiza acciones específicas para imágenes
      } else {
        // El archivo no es ni video ni imagen
        // Puedes mostrar un mensaje de error o tomar otras medidas
      }
    }
  };

  const handleUploadImage = async () => {
    console.log("hola");
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
      const res = await getUpdateUser();
      console.log("Get LOGON", res.data);
      setUser(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    setStory(user.stories);
    console.log(user);
    setPublication(user.publications);
  }, [user]);

  useEffect(() => {
    console.log("Publi " + publication.length);
  }, [publication]);

  useEffect(() => {
    console.log(story);
  }, [story]);

  return (
    <>
      <div className="Stories">
        <div className="header">
          <div className="search">
            <i className="ri-search-line"></i>
            <input type="text" placeholder="search" />
          </div>
          <div className="header-content">
            <i className="ri-notification-4-line"></i>
            <i className="ri-mail-unread-fill"></i>
            <a href="#" className="btn">
              <i className="ri-add-circle-fill"></i>
              <div className="btn-text">Add Photos</div>
            </a>
          </div>
        </div>
        <div className="stories-title">
          <a href="#" className="btn">
            <i className="ri-play-circle-line"></i>
            <div className="text">Watch all</div>
          </a>
        </div>
        <div className="stories">
          <div className="stories-img color image-container">
            <img src={user.imagen} alt="" className="image" />
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
            {/* <video ref={selectedFile} controls /> */}
          </div>
          {story.map((element) => (
            <div className="stories-img color">
              <img className="historyImageProfile" src={element.url} alt="" />
            </div>
          ))}

          <div className="stories-img color">
            <img className="historyImageProfile" ref={imageRef} alt="" />
          </div>
          <button onClick={handleUploadImage}>subir historia</button>
          {/* <div className="stories-img color">
                        <img src="img/profile-2.jpeg" alt="" />
                        <div className="add">+</div>
                    </div>
                    <div className="stories-img">
                        <img src="img/profile-1.jpeg" alt="" />
                    </div>
                    <div className="stories-img">
                        <img src="img/1.jpeg" alt="" />
                    </div>
                    <div className="stories-img">
                        <img src="img/2.jpeg" alt="" />
                    </div>
                    <div className="stories-img">
                        <img src="img/3.jpeg" alt="" />
                    </div>
                    <div className="stories-img">
                        <img src="img/4.jpeg" alt="" />
                    </div>
                    <div className="stories-img">
                        <img src="img/5.jpeg" alt="" />
                    </div>
                    <div className="stories-img">
                        <img src="img/6.jpeg" alt="" />
                    </div>
                    <div className="stories-img">
                        <img src="img/7.jpeg" alt="" />
                    </div>
                    <div className="stories-img">
                        <img src="img/8.jpeg" alt="" />
                    </div> */}
        </div>

        <div>
          {publication.length > 0
            ? publication.map((element, index) => (
                <div class="publicacion">
                  <div class="nombre-usuario">
                    <div class="post-profile">
                      <div class="post-img">
                        <img src={user.imagen} alt="" />
                      </div>
                      <h3>{user.username}</h3>
                    </div>
                  </div>
                  <div class="contenido">{element.contenido}</div>
                  <img
                    src={element.url}
                    alt="Imagen de la publicación"
                    class="imagen-publicacion"
                  ></img>
                  <div class="post-box">
                    <div>
                      <i class="ri-heart-line"></i>
                      <span>{60}k</span>
                    </div>
                    <div>
                      <i class="ri-chat-3-line"></i>
                      <span>{200}k</span>
                    </div>
                    <div>
                      <i class="ri-download-cloud-2-line"></i>
                      <span>{200000}k</span>
                    </div>
                  </div>
                </div>
              ))
            : null}
        </div>
      </div>
    </>
  );
};

// import React, { useState } from 'react';

// function App() {
//   const [selectedFile, setSelectedFile] = useState();

//   const handleFileInput = (e) => {
//     setSelectedFile(e.target.files[0]);
//   }

//   return (
//     <div>
//       <input type="file" onChange={handleFileInput} />
//       {selectedFile && <p>Archivo seleccionado: {selectedFile.name}</p>}
//     </div>
//   );
// }

// export default App;
