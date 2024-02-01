import React, { useEffect, useState } from 'react'
import { useAuth } from "../../context/AuthContext";
import "./Publications.css";
import { reactionLike, getAllPublications } from '../../api/auth';
import { useLocation } from 'react-router-dom';

export const Publications = () => {
    const location = useLocation();
    const [locationStart, setLocationStart] = useState(location.pathname === "/Start");
    const { user, publications, profileImage, setPublications, isAuthenticated } = useAuth()
    const [allPublications, setAllPublications] = useState([])
    const [modalStates, setModalStates] = useState([]);
    const [closingIndex, setClosingIndex] = useState(null);
    const [modalCommentState, setModalComments] = useState([]);
    const [closingIndexComents, setClosingIndexComments] = useState(null);

    const handleClose = (index) => {
        setTimeout(() => {
            setModalStates((prev) => ({
                ...prev,
                [index]: false,
            }));
        }, 300);
        setClosingIndex(index);
    };

    const handleCloseModalComments = (index) => {
        setTimeout(() => {
            setModalComments((prev) => ({
                ...prev,
                [index]: false,
            }));
        }, 300);
        setClosingIndexComments(index);
    }

    const increaseReactions = async (url, userName) => {
        const reaction = {
            userName: userName,
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


    const increaseReactionsLocationStart = async (url, userName) => {
        const reaction = {
            userName: userName,
            reaction: "love",
            link: url
        }
        try {
            const response = await reactionLike(reaction)
            console.log(response.data.publications);
            const updateReaction = allPublications.map((item, idx) => {
                console.log(item.publications);
                if (item.publications.length > 0) {
                    if (item.publications[0].url == response.data.publications.url) {
                        console.log("igual");
                        item.publications[0].reactions.like = response.data.publications.reactions.like
                        return item;
                    }
                }
                return item; // Mantener los elementos que no necesitan actualización
            });

            console.log(response);

            setAllPublications(updateReaction)

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

    useEffect(() => {
        async function publicationsFound() {
            const response = await getAllPublications();
            setAllPublications(response.data.publis)
        }

        publicationsFound()
    }, [isAuthenticated])

    useEffect(() => {
        if (locationStart) {

        }
    })

    return (
        <div className='publications'>
            {isAuthenticated === false ?
                allPublications.map(element => (
                    element.publications.map((publication, index) => (
                        <div key={index} className="publication">
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
                !locationStart ?
                    publications.map((element, index) => (
                        <div key={index} class="publication">
                            <div className="nombre-usuario">
                                <div className="post-profile">
                                    <div className="post-img">
                                        <img src={profileImage} alt="" />
                                    </div>
                                    <h3>{user.username}</h3>
                                </div>
                            </div>
                            <div className="contenido">{element.contenido}</div>
                            <img src={element.url} alt="Imagen de la publicación" className="imagen-publicacion"></img>
                            <div className="post-box">
                                <div>
                                    {modalStates[index] && (
                                        <div className={`modal ${closingIndex == null ? 'open' : 'closed'}`}>
                                            <div className='modal-buttons'>
                                                <button className="modal-close" onClick={() =>
                                                    handleClose(index)
                                                }>
                                                    <i className="ri-chat-delete-line"></i>
                                                </button>
                                                <button>
                                                    <i className="ri-heart-line"></i>
                                                </button>
                                            </div>
                                            {
                                                element.reactions.like.map((userReaction, key) => (
                                                    <div key={key}>
                                                        <div className="post-img">
                                                            <img src={userReaction.imageProfile} alt="" />
                                                        </div>
                                                        <h3>{userReaction.user}</h3>
                                                    </div>
                                                ))
                                            }

                                        </div>
                                    )
                                    }
                                    <button name='Love' onClick={() => increaseReactions(element.url, user.username)}>
                                        <i className="ri-heart-line"></i>
                                    </button>

                                    <button
                                        onClick={() => {
                                            // Primera función
                                            setClosingIndex(null); // Llama a otraFuncion()
                                            setModalStates((prev) => ({
                                                ...prev,
                                                [index]: true,
                                            }));
                                            // Segunda función
                                        }}
                                        className={modalStates[index] ? 'active' : ''}
                                    >
                                        <span>{element.reactions.like.length}</span>
                                    </button>
                                </div>

                                <div>
                                    {modalCommentState[index] && (
                                        <div className={`modal ${closingIndexComents == null ? 'open' : 'closed'}`}>
                                            <div className='modal-buttons'>
                                                <button className="modal-close" onClick={() =>
                                                    handleCloseModalComments(index)
                                                }>
                                                    <i className="ri-chat-delete-line"></i>
                                                </button>
                                                <button>
                                                    <i className="ri-heart-line"></i>
                                                </button>
                                            </div>
                                            {
                                                element.reactions.comments.map((userReaction, key) => (
                                                    <div key={key}>
                                                        {/* <div className="post-img">
                                                        <img src={userImage.profileImage} alt="" />
                                                    </div> */}
                                                        <h3>{userReaction.comment}</h3>
                                                    </div>
                                                ))
                                            }

                                            <input type="text" placeholder='comment' />
                                            <button>
                                                <i class="ri-send-plane-2-fill"></i>
                                            </button>
                                        </div>
                                    )
                                    }
                                    <button onClick={() => {
                                        setClosingIndexComments(null);
                                        setModalComments((prev) => ({
                                            ...prev,
                                            [index]: true,
                                        }));
                                    }}>
                                        <i className="ri-chat-3-line"></i>
                                    </button>
                                    <span>{element.reactions.comments.length}</span>
                                </div>
                                <button name='comments'>
                                    <i className="ri-download-cloud-2-line"></i>
                                    <span>{200000}k</span>
                                </button>
                            </div>
                        </div>
                    ))
                    :
                    /* Código adicional cuando locationStart no es verdadero */
                    allPublications.map((userImage, userIndex) =>
                        userImage.publications.map((element, index) => (
                            <div key={index} data-key={index} className="publication">
                                <div className="nombre-usuario">
                                    <div className="post-profile">
                                        <div className="post-img">
                                            <img src={userImage.profileImage} alt="" />
                                        </div>
                                        <h3>{userImage.username}</h3>
                                    </div>
                                </div>
                                <div className="contenido">{element.contenido}</div>
                                <img src={element.url} alt="Imagen de la publicación" className="imagen-publicacion" />
                                <div className="post-box">
                                    <div>
                                        {modalStates[index] && (
                                            <div className={`modal ${closingIndex == null ? 'open' : 'closed'}`}>
                                                <div className='modal-buttons'>
                                                    <button className="modal-close" onClick={() => handleClose(index)}>
                                                        <i className="ri-chat-delete-line"></i>
                                                    </button>
                                                    <button>
                                                        <i className="ri-heart-line"></i>
                                                    </button>
                                                </div>
                                                {element.reactions.like.map((userReaction, key) => (
                                                    <div key={key}>
                                                        <div className="post-img">
                                                            <img src={userReaction.imageProfile} alt="" />
                                                        </div>
                                                        <h3>{userReaction.user}</h3>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                        <button name='Love' onClick={() => increaseReactionsLocationStart(element.url, userImage.username)}>
                                            <i className="ri-heart-line"></i>
                                        </button>
                                        <button
                                            onClick={() => {
                                                setClosingIndex(null);
                                                setModalStates((prev) => ({ ...prev, [index]: true }));
                                            }}
                                            className={modalStates[index] ? 'active' : ''}
                                        >
                                            <span>{element.reactions.like.length}</span>
                                        </button>
                                    </div>

                                    <div>
                                        {modalCommentState[index] && (
                                            <div className={`modal ${closingIndexComents == null ? 'open' : 'closed'}`}>
                                                <div className='modal-buttons'>
                                                    <button className="modal-close" onClick={() => handleCloseModalComments(index)}>
                                                        <i className="ri-chat-delete-line"></i>
                                                    </button>
                                                    <button>
                                                        <i className="ri-heart-line"></i>
                                                    </button>
                                                </div>
                                                {element.reactions.comments.map((userReaction, key) => (
                                                    <div key={key}>
                                                        <div className="post-img">
                                                            <img src={userImage.profileImage} alt="" />
                                                        </div>
                                                        <h3>{userReaction.comment}</h3>
                                                    </div>
                                                ))}
                                                <form action="">
                                                    <input type="text" placeholder='comment' />
                                                    <button>
                                                        <i className="ri-send-plane-2-fill"></i>
                                                    </button>
                                                </form>
                                            </div>
                                        )}
                                        <button onClick={() => {
                                            setClosingIndexComments(null);
                                            setModalComments((prev) => ({ ...prev, [index]: true }));
                                        }}>
                                            <i className="ri-chat-3-line"></i>
                                        </button>
                                        <span>{200}k</span>
                                    </div>
                                    <button name='comments'>
                                        <i className="ri-download-cloud-2-line"></i>
                                        <span>{200000}k</span>
                                    </button>
                                </div>
                            </div>
                        )))
            }
        </div >
    )
}

export default Publications