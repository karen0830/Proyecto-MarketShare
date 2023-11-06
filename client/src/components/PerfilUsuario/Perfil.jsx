import React, { createContext, useContext, useState, useEffect } from "react";
import "./Perfil.css";
import { getImage, getUpdateUser, sendPublications } from "../../api/auth";
import { useAuth } from "../../context/AuthContext";
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
  const { user, setUser } = useAuth()
  const [image, setImage] = useState(user.imagen)
  const [postContent, setPostContent] = useState([]);
  const [imagePublication, setImagePublication] = useState(null)
  const [publication, setPublication] = useState(user.publications)

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    console.log(file);
  };

  const handleFilePublication = (e) => {
    setImagePublication(e.target.files[0]);
    console.log(file);
  };

  useEffect(() => {
    console.log("User actualizao", user);
  }, [user])

  const handleUpload = async () => {
    console.log("hola");
    try {
      const response = await getImage(file);
      if (response) {
        console.log("Response", response);
      }
      checkLogin()
    } catch (error) {
      console.error("Error:", error);
    }
  };

  async function checkLogin() {
    try {
      const res = await getUpdateUser()
      console.log("Get LOGON", res.data);
      setImage(res.data.imagen)
      setUser(res.data)
      setPublication(res.data.publications)
    } catch (error) {
      console.log(error);
    }
  }

  const handlePostSubmit = (e) => {
    setPostContent(e.target.value); // Actualiza el estado con el contenido del textarea
  };

  console.log(postContent);

  async function sendPublication() {
    try {
      const res = await sendPublications(imagePublication, postContent)
      console.log(res);
      checkLogin()
    } catch (error) {
      console.log(error);
    }
  }

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
            <img className="profileImage" src={image} alt="" />
          </div>
        </div>
        {/* Karennnnn */}
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
      <div className="contenido-destacado">
        <p>
          Aqui esta una publicacion de ejemplo. Puedes agregar texto, imagenes y
          más contenido aquí
        </p>
        <p>imagen de publicacion</p>
        <img src="" alt="" />
      </div>
      <form action="">
        <div>
          <input name="publication" type="file" onChange={handleFilePublication} />
        </div>
        <textarea name="" id="" cols="30" rows="10" onChange={handlePostSubmit} value={postContent}></textarea>
      </form>
      <button type="submit" onClick={sendPublication}>
        Publicar
      </button>
      <div>
        {publication.lenght > 0 ?
          (publication.map((element, index) => (
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
              <img src={element.url} alt="Imagen de la publicación" class="imagen-publicacion"></img>
              <div class="post-box">
                <div>
                  <i class="ri-heart-line"></i>
                  <span>${60}k</span>
                </div>
                <div>
                  <i class="ri-chat-3-line"></i>
                  <span>${200}k</span>
                </div>
                <div>
                  <i class="ri-download-cloud-2-line"></i>
                  <span>${200000}k</span>
                </div>
              </div>
            </div>
          ))) :
          null}
      </div>

    </div>
  );
};
