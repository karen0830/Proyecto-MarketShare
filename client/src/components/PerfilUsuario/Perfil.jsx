import React, { useState } from "react";
import "./Perfil.css";

const Perfil = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = () => {};

  return (
    <div className="general-container">
      <div className="info-usuario">
        <h1>"Nombre del Usuario"</h1>
        <div className="form-container">
          <form
            action="/perfil"
            method="post"
            encType="multipart/form-data"
          ></form>
          <input type="file" name="avatar" className="input-button" />
          <div>
            <button className="button-avatar" onClick={handleFileChange}>
              Cambiar Imagen de perfil
            </button>
          </div>
        </div>
        <h2>Descripcion del usuario</h2>
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
    </div>
  );
};

export default Perfil;
