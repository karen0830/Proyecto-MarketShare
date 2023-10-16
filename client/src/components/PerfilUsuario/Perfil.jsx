import React, { useEffect, useState } from "react";
import "./Perfil.css";
import { getImage } from "../../api/auth";

const Perfil = () => {
  const [file, setFile] = useState(null);
  const [image, setImage] = useState('')

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    console.log(file);
  };

  useEffect(() => {
    const handleUpload = async () => {
      try {
        const response = await getImage(file);
        if (response) {
          console.log(response);
          setImage(response.data.imagen)
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    handleUpload();
  },[file])

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
            <h2>Subir Archivo</h2>
            <input name="miArchivo" type="file" onChange={handleFileChange} />
            <button className="button-avatar">
              Cambiar Imagen de perfil
            </button>
            <img src={image} alt="" />
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
