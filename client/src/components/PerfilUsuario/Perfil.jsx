import React, { useEffect, useState } from "react";
import "./Perfil.css";
import { useAuth } from '../../context/AuthContext.jsx'
import { handleUpload } from "../../api/auth";
const Perfil = () => {
  const { user, isAuthenticated } = useAuth()
  const [selectedFile, setSelectedFile] = useState(null);
  // Crear un objeto FormData que contendrá la imagen y otros datos
  const formData = new FormData();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    setSelectedFile(file);
    formData.append('image', file); // 'file' es la imagen que deseas enviar
    formData.append('description', 'Perfil foto'); // Puedes agregar otros campos aquí
  };


  useEffect(() => {
    function cambio() {
      console.log("issss", isAuthenticated);
      if (isAuthenticated == true) {
        console.log("date", selectedFile);
        handleUpload(formData)
      }
    }

    cambio()
  }, [selectedFile]);

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
          <div className='h-full'>
            <h1>Cargar Imagen</h1>
            <input type="file" onChange={handleFileChange} />
            {selectedFile && (
              <div>
                <h2>Imagen Seleccionada:</h2>
                <img src={URL.createObjectURL(selectedFile)} alt="Imagen seleccionada" />
              </div>
            )}
          </div>
          <div>
            <button className="button-avatar">
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

