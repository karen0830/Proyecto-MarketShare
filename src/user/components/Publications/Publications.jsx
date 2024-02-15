import React, { useEffect, useState } from 'react'
import { useAuth } from "../../context/AuthContext";
import "./Publications.css";
import { reactionLike, getAllPublications, getProfile, getPublications } from '../../api/auth';
import { NavLink, useLocation } from 'react-router-dom';

export const Publications = () => {
    const location = useLocation();
    const [locationStart, setLocationStart] = useState(location.pathname === "/Start");
    const { user, publications, profileImage, setPublications, isAuthenticated, setProfileData, profileData } = useAuth()
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
            const updateReaction = publications.map((item, idx) => {
                if (item.url == response.data.publications.url) {
                    item.reactions.like = response.data.publications.reactions.like
                    return item;
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
            const response = await reactionLike(reaction);
            console.log(response);
            const updateReaction = allPublications.map((item) => {
                if (item.url === response.data.publications.url) {
                    console.log("igual");
                    item.reactions.like = response.data.publications.reactions.like;
                }
                // No need to return anything here for the elements that don't need updating
                return item; // Return the updated or unchanged item
            });
            setAllPublications(updateReaction)

            // Actualizar el estado con el nuevo arreglo que tiene la posición modificada
        } catch (error) {
            console.log(error);
        }

    }

    useEffect(() => {
        const publications = [];
        async function publicationsFound() {
            const response = await getAllPublications();
            console.log(response);
            response.data.publis.forEach(element => {
                element.publications.forEach(publication => {
                    publications.push(publication)
                })
            })
            setAllPublications(publications)
        }

        publicationsFound()
    }, [isAuthenticated])

    useEffect(() => {
        async function changeProfile() {
            if (profileData !== null) {
                if (location.pathname !== "/profileUser") {
                    setProfileData(null)
                    const getPublicationResponse = await getPublications();
                    setPublications(getPublicationResponse.data.publications);
                }
            }
        }
        changeProfile()
        console.log("profileadta: ", profileData);
    }, [profileData])



    const getProfileUser = async (username) => {
        console.log(username);
        const response = await getProfile(username);
        console.log(response);
        setProfileData(response)
        setPublications(response.publications)
    }


    return (
        <div className='publications'>
            {isAuthenticated === false ?
                allPublications.map((element, index) => (
                    <div key={index} className="publication">
                        <div className="nombre-usuario">
                            <div className="post-profile">
                                <div className="post-img">
                                    <img src={element.profileImage} alt="" />
                                </div>
                                <h3>{element.user}</h3>
                            </div>
                        </div>
                        <div className="contenido">{element.contenido}</div>
                        {element.type === 'video/mp4' ? (
                            <video className='video'  src={element.url} controls></video>
                        ) :
                            <img src={element.url} alt="Imagen de la publicación" className="imagen-publicacion" />
                        }
                    </div>
                ))
                :
                !locationStart ?
                    publications.map((element, index) => (
                        <div key={index} class="publication">
                            <div className="nombre-usuario">
                                <div className="post-profile">
                                    <div className="post-img">
                                        <img src={profileData ? element.profileImage : profileImage} alt="" />
                                    </div>
                                    <h3>{element.user}</h3>
                                </div>
                            </div>
                            <div className="contenido">{element.contenido}</div>
                            {element.type === 'video/mp4' ? (
                                <video className='video'  src={element.url} controls></video>
                            ) :
                                <img src={element.url} alt="Imagen de la publicación" className="imagen-publicacion" />
                            }
                            <div className="post-box">
                                <div className='div-comments'>
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
                                    <button name='Love' className='love-button' onClick={() => profileData ? increaseReactions(element.url, element.user) : increaseReactions(element.url, user.username)}>
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
                                        className='number-likes'
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
                                    }}
                                    className='love-button'
                                    >
                                        <i className="ri-chat-3-line"></i>
                                    </button>
                                    <span>{element.reactions.comments.length}</span>
                                </div>
                                <button className='' name='comments'>
                                    <i className="ri-download-cloud-2-line"></i>
                                    <span>{200000}k</span>
                                </button>
                            </div>
                        </div>
                    ))
                    :
                    /* Código adicional cuando locationStart no es verdadero */

                    allPublications.map((element, index) => (
                        <div key={index} data-key={index} className="publication">
                            <div className="nombre-usuario">
                                <div className="post-profile">
                                    <div className="post-img">
                                        <img src={element.profileImage} alt="" />
                                    </div>
                                    <NavLink onClick={() => getProfileUser(element.user)} to="/profileUser">
                                        <h3>{element.user}</h3>
                                    </NavLink>
                                </div>
                            </div>
                            <div className="contenido">{element.contenido}</div>
                            {element.type === 'video/mp4' ? (
                                <video className='video' src={element.url} controls></video>
                            ) :
                                <img src={element.url} alt="Imagen de la publicación" className="imagen-publicacion" />
                            }
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
                                    <button name='Love' className='love-button' onClick={() => increaseReactionsLocationStart(element.url, element.user)}>
                                        <i className="ri-heart-line"></i>
                                    </button>
                                    <button
                                        onClick={() => {
                                            setClosingIndex(null);
                                            setModalStates((prev) => ({ ...prev, [index]: true }));
                                        }}
                                        className='number-likes'
                                    >
                                        <span>{element.reactions.like.length}</span>
                                    </button>
                                </div>

                                <div className='div-comments'>
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
                                                        <img src={element.profileImage} alt="" />
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
                                    }}
                                    className='love-button'
                                    >
                                        <i className="ri-chat-3-line"></i>
                                    </button>
                                    <span>{element.reactions.comments.length}</span>
                                </div>
                                <button name='comments' className='comment-button'>
                                    <i className="ri-download-cloud-2-line"></i>
                                    <span>{200000}k</span>
                                </button>
                            </div>
                        </div>
                    ))
            }
        </div >
    )
}

export default Publications