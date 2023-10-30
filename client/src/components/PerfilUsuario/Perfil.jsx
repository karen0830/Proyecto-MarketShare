import React, { createContext, useContext, useState, useEffect } from "react";
import "./Perfil.css";
import { getImage, getUpdateUser } from "../../api/auth";
import { useAuth } from "../../context/AuthContext";
import { sendPublications } from "../../api/auth";
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
  const [userFound, setUserFound] = useState(null)
  const [postContent, setPostContent] = useState([]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
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
        setUserFound(response.data)
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
    } catch (error) {
      console.log(error);
    }
  }

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await sendPublications(postContent);
      console.log(res);
    } catch (error) {
      console.error("Error al enviar la publicación:", error);
    }

    // Limpia el campo de texto después de enviar la publicación
    setPostContent("");
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
      <form onSubmit={handlePostSubmit}>
        <textarea
          rows="4"
          cols="50"
          placeholder="Escribe tu publicación..."
          value={postContent}
          onChange={(e) => setPostContent(postContent)}
        />
        <button type="submit" onClick={handlePostSubmit}>
          Publicar
        </button>
      </form>
    </div>
  );
};
