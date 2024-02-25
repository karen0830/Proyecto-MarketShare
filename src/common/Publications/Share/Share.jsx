import "./Share.css";
import {
  sendPublications,
  getPublicationsCompany,
  addPublicationsVideo,
} from "../../api/auth.company";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPublications, getShareData, shareData } from "../../api/auth";

export const ModalShare = ({ isOpen, onClose, children }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="closeModalChangeProfile">
          <h4>Share</h4>
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

export const Share = ({ link, type }) => {
  console.log(link);
  const { setPublications, isAuthenticatedCompany, isAuthenticated } = useAuth();
  const [postContent, setPostContent] = useState([]);
  const [imagePublication, setImagePublication] = useState(link);
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
    navigate("/ProfileUser");
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

  async function sendPublicationShare() {
    try {
      const res = await shareData(postContent, link);
      const getShares = await getShareData();
      console.log("gahgdjshgf", getShares);
      setPublications(getShares.data.shares.reverse())
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="publicar">
      <form action="">
        <div className="input-publication">
          <label htmlFor="">Product Comment:</label>
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

        {/* <input
              name="publication"
              accept="video/*,image/*"
              type="file"
              onChange={handleFilePublication}
            /> */}
        {/* {imagePublication && (
          <img
            src={previewImage}
            alt="Vista Previa"
            className="preview-image"
          />
        )}
        {videoPublication && (
          <video src={previewImage} controls className="preview-image" />
        )} */}
        {
          type === "video/mp4" ? (
            <video className="video" src={link} controls></video>
          ) : <img src={link} alt="" />
        }
      </form>
      {imagePublication || videoPublication ?
        <div className="button-container">
          <button className="button-publication" onClick={function () {
            sendPublicationShare(postContent, link)
            goBack()
          }}>
            Share
          </button>
        </div> : null
      }
    </div>
  );
};