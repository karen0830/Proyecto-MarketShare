import "./publicar.css";
import {
  sendPublications,
  getPublications,
  addPublicationsVideo,
} from "../../../api/auth";
import { useAuth } from "../../../context/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="closeModalChangeProfile">
          <h4>Crear Publicación</h4>
          <button className="modal-close" onClick={onClose}>
            <i className="ri-chat-delete-line"></i>
          </button>
        </div>
        <hr className="line-divider" />
        {children}
      </div>
    </div>
  );
};

export const Publicar = () => {
  const { setPublications } = useAuth();
  const [postContent, setPostContent] = useState([]);
  const [imagePublication, setImagePublication] = useState(null);
  const [videoPublication, setVideoPublication] = useState(null);
  const navigate = useNavigate();
  const [previewImage, setPreviewImage] = useState(null);

  const handleFileChangeAndPreview = (event) => {
    const file = event.target.files[0];
    setFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
    }
  };

  const goBack = () => {
    // Navegar a la ruta '/otra-pagina'
    navigate("/profileUser");
  };

  const handleFilePublication = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      if (selectedFile.type.startsWith("image/")) {
        console.log("Es una imagen");
        setImagePublication(selectedFile); // Asignar el archivo de imagen
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewImage(reader.result);
        };
        reader.readAsDataURL(selectedFile);
        setVideoPublication(null);
      } else if (selectedFile.type.startsWith("video/")) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewImage(reader.result);
        };
        reader.readAsDataURL(selectedFile);
        console.log("Es un video");
        setVideoPublication(selectedFile); // Asignar el archivo de video
        setImagePublication(null);
      } else {
        console.log("Tipo de archivo no válido");
        setPreviewImage(null);
        // Manejar otros tipos de archivo
      }
    }
  };

  const handlePostSubmit = (e) => {
    setPostContent(e.target.value); // Actualiza el estado con el contenido del textarea
  };

  console.log(postContent);

  async function sendPublication() {
    try {
      if (videoPublication) {
        const res = await addPublicationsVideo(videoPublication, postContent);
        console.log(res);
        const getPublicationResponse = await getPublications();
        setPublications(getPublicationResponse.data.publications);
      } else {
        const res = await sendPublications(imagePublication, postContent);
        console.log(res);
        const getPublicationResponse = await getPublications();
        setPublications(getPublicationResponse.data.publications);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="publicar">
      <form action="">
        <div className="input-publication">
          <label htmlFor="">Describe tu producto:</label>
          <input
          placeholder="Describe tu producto"
            type="text"
            name="postContent"
            className="text-publication"
            cols="30"
            rows="10"
            onChange={handlePostSubmit}
            value={postContent}
          />
        </div>
        <div className="file-input-container">
          <label htmlFor="publication" className="file-publication">
            <span>
              <i className="ri-add-line"></i>
              Agregar fotos/videos
            </span>
            <input id="publication" name="miArchivo" type="file" onChange={handleFilePublication} />
          </label>
        </div>

        {/* <input
              name="publication"
              accept="video/*,image/*"
              type="file"
              onChange={handleFilePublication}
            /> */}
        {imagePublication && (
          <img
            src={previewImage}
            alt="Vista Previa"
            className="preview-image"
          />
        )}
        {videoPublication && (
          <video src={previewImage} controls className="preview-image" />
        )}
      </form>
      {imagePublication || videoPublication ?
        <div className="button-container">
          <button className="button-publication" onClick={function () {
            sendPublication();
            goBack();
          }}>
            Publicar
          </button>
        </div> : null
      }
    </div>
  );
};