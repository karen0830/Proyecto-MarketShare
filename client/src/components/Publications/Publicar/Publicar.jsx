import SideBar from "../../sidebar/sidebar"
import "./publicar.css";
import { sendPublications, getPublications } from "../../../api/auth";
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
                <button className="modal-close" onClick={onClose}>
                    Cerrar
                </button>
                {children}
            </div>
        </div>
    );
};

export const Publicar = () => {
    const { setPublications } = useAuth()
    const [postContent, setPostContent] = useState([]);
    const [imagePublication, setImagePublication] = useState(null)
    const navigate = useNavigate();

    const goBack = () => {
        // Navegar a la ruta '/otra-pagina'
        navigate('/profileUser');
    };

    const handleFilePublication = (e) => {
        setImagePublication(e.target.files[0]);
    };

    const handlePostSubmit = (e) => {
        setPostContent(e.target.value); // Actualiza el estado con el contenido del textarea
    };

    console.log(postContent);

    async function sendPublication() {
        try {
            const res = await sendPublications(imagePublication, postContent)
            console.log(res);
            const getPublicationResponse = await getPublications();
            setPublications(getPublicationResponse.data.publications);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="div-general">
            <div className="publicar">
                <form action="">
                    <div>
                        <input name="publication" type="file" onChange={handleFilePublication} />
                    </div>
                    <textarea name="" id="" cols="30" rows="10" onChange={handlePostSubmit} value={postContent}></textarea>
                </form>
                <button type="submit" onClick={function () {
                    sendPublication();
                    goBack()
                }}>
                    Publicar
                </button>
            </div>
        </div>
    )
}
