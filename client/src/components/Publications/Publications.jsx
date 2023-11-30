import React, { useEffect, useState } from 'react'
import { useAuth } from "../../context/AuthContext";
import "./Publications.css"
import { reactionLike, getAllPublications } from '../../api/auth';
export const Publications = () => {
    const { user, publications, profileImage, setPublications, isAuthenticated } = useAuth()
    const [allPublications, setAllPublications] = useState([])
    const increaseReactions = async (url) => {
        const reaction = {
            reaction: "love",
            link: url
        }
        try {
            const response = await reactionLike(reaction)
            console.log(response);
            const updateReaction = publications.map((item, idx) => {
                if (item.url == response.data.publications.url) {
                    item.reactions.like = response.data.publications.reactions.like
                    return item;
                    console.log(item);
                }
                return item; // Mantener los elementos que no necesitan actualización
            });

            setPublications(updateReaction)

            // Actualizar el estado con el nuevo arreglo que tiene la posición modificada
        } catch (error) {
            console.log(error);
        }

    }

    useEffect(() => {
        async function publicationsFound() {
            const response = await getAllPublications();
            setAllPublications(response.data.publis)
        }

        publicationsFound()
    }, [isAuthenticated])
    return (
        <div className='publications'>
            {isAuthenticated === false ?
                allPublications.map(element => (
                    element.publications.map((publication, index) => (
                        <div key={index} className="publicacion">
                            <div className="nombre-usuario">
                                <div className="post-profile">
                                    <div className="post-img">
                                        <img src={element.profileImage} alt="" />
                                    </div>
                                    <h3>{element.username}</h3>
                                </div>
                            </div>
                            <div className="contenido">{publication.contenido}</div>
                            <img src={publication.url} alt="Imagen de la publicación" className="imagen-publicacion" />
                        </div>
                    ))
                ))
                :
                publications.map((element, index) => (
                    <div key={index} class="publicacion">
                        <div class="nombre-usuario">
                            <div class="post-profile">
                                <div class="post-img">
                                    <img src={profileImage} alt="" />
                                </div>
                                <h3>{user.username}</h3>
                            </div>
                        </div>
                        <div class="contenido">{element.contenido}</div>
                        <img src={element.url} alt="Imagen de la publicación" class="imagen-publicacion"></img>
                        <div class="post-box">
                            <button name='Love' onClick={() => increaseReactions(element.url)}>
                                <i class="ri-heart-line"></i>
                                <span>{element.reactions.like.length}</span>
                            </button>
                            <div>
                                <i class="ri-chat-3-line"></i>
                                <span>{200}k</span>
                            </div>
                            <button name='comments'>
                                <i class="ri-download-cloud-2-line"></i>
                                <span>{200000}k</span>
                            </button>
                        </div>
                    </div>
                ))
            }

        </div>
    )
}

export default Publications