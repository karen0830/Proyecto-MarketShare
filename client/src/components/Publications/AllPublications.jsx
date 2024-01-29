import React, { useEffect, useState, useRef } from 'react'
import { useAuth } from "../../context/AuthContext";
import "./Publications.css"
import { reactionLike, getAllPublications } from '../../api/auth';

export const AllPublication = () => {
    const { user, publications, setPublications, isAuthenticated } = useAuth()
    const [allPublications, setAllPublications] = useState([])
    const [modalStates, setModalStates] = useState([]);
    const [modalCommentState, setModalComments] = useState([]);
    const [closingIndexComents, setClosingIndexComments] = useState(null);
    const [closingIndex, setClosingIndex] = useState(null);
    const postRef = useRef(null);

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

    const increaseReactions = async (url, userImage, userLike) => {
        const reaction = {
            userName: userImage,
            reaction: "love",
            link: url
        }

        console.log(allPublications.length);
        try {
            const response = await reactionLike(reaction)
            console.log(response);
            const updateReaction = allPublications.map((item, idx) => {
                item.publications.map((publication, i) => {
                    if (publication.url == url) {
                        publication.reactions.like = response.data.publications.reactions.like
                        return publication;
                    }
                    return publication; // Mantener los elementos que no necesitan actualización
                })
            });

            console.log(updateReaction);

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

    useEffect(() => {
        console.log(modalStates);
        console.log(closingIndex);
    }, [modalStates])

    useEffect(() => {
        console.log("allP ", allPublications);
    }, [allPublications])

    useEffect(() => {
        // if (performance.navigation.type === performance.navigation.TYPE_RELOAD) {

        console.log('La página ha sido recargada');
        // } else {
        //     console.log('La página ha sido cargada inicialmente');
        // }

    })

    // Visits

    return (
        <div ref={postRef} className='publications'>
            {isAuthenticated === true ?
                allPublications.map(userImage => (
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
                                    <button name='Love' onClick={() => increaseReactions(element.url, userImage.username)}>
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
                                                        <div className="post-img">
                                                            <img src={userImage.profileImage} alt="" />
                                                        </div>
                                                        <h3>{userReaction.comment}</h3>
                                                    </div>
                                                ))
                                            }
                                            <form action="">
                                                <input type="text" placeholder='comment' />
                                                <button>
                                                    <i class="ri-send-plane-2-fill"></i>
                                                </button>
                                            </form>
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
                                    <span>{200}k</span>
                                </div>
                                <button name='comments'>
                                    <i className="ri-download-cloud-2-line"></i>
                                    <span>{200000}k</span>
                                </button>
                            </div>
                        </div>
                    ))
                ))
                :
                null
            }

        </div >
    )
}

export default AllPublication;