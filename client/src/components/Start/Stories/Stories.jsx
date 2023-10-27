import React, { useState, useRef, useEffect } from 'react'
import "./Stories.css"
import { useAuth } from "../../../context/AuthContext.jsx";
import { getUpdateStories, getUpdateUser } from '../../../api/auth';
export const Stories = () => {
    const { user, setUser } = useAuth();
    const [selectedFileVideo, setSelectedFileVideo] = useState();
    const [selectedFileImage, setSelectedFileImage] = useState();
    const [story, setStory] = useState(user.stories)
    console.log(user);
    const imageRef = useRef();
    const handleFileInput = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.type.startsWith('video/')) {
                // Es un archivo de video
                setSelectedFileVideo(e.target.files[0]);
                // Realiza acciones específicas para videos
            } else if (file.type.startsWith('image/')) {
                setSelectedFileImage(e.target.files[0])
                const imageURL = URL.createObjectURL(file);
                imageRef.current.src = imageURL
                // Es un archivo de imagen
                // Realiza acciones específicas para imágenes
            } else {
                // El archivo no es ni video ni imagen
                // Puedes mostrar un mensaje de error o tomar otras medidas
            }
        }

    }

    const handleUploadImage = async () => {
        console.log("hola");
        try {
            const response = await getUpdateStories(selectedFileImage);
            if (response) {
                console.log("Response", response);
            }
            checkLogin()
        } catch (error) {
            console.error("Error:", error);
        }
    };

    async function checkLogin() {
        try {
            const res = await getUpdateUser()
            console.log("Get LOGON", res.data);
            setUser(res.data)
            setStory(response.data.stories)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        console.log(story);
    }, [story])

    return (
        <>
            <div className='Stories'>
                <div class="header">
                    <div class="search">
                        <i class="ri-search-line"></i>
                        <input type="text" placeholder="search" />
                    </div>
                    <div class="header-content">
                        <i class="ri-notification-4-line"></i>
                        <i class="ri-mail-unread-fill"></i>
                        <a href="#" class="btn">
                            <i class="ri-add-circle-fill"></i>
                            <div class="btn-text">Add Photos</div>

                        </a>
                    </div>
                </div>
                <div class="stories-title">
                    <h1>Stories</h1>
                    <a href="#" class="btn">
                        <i class="ri-play-circle-line"></i>
                        <div class="text">Watch all</div>
                    </a>
                </div>
                <div class="stories">
                    <div class="stories-img color image-container">
                        <img src={user.imagen} alt="" className='image' />
                        <div class="overlay">
                            <label className="custom-file-input">
                                <input name="miArchivo" type="file" accept="image/*" onChange={handleFileInput} />
                            </label>
                        </div>
                        {/* <video ref={selectedFile} controls /> */}
                    </div>
                    {story.map((element) => (
                        <div class="stories-img color">
                            <img className='historyImageProfile' src={element.url} alt="" />
                        </div>
                    ))}

                    <div class="stories-img color">
                        <img className='historyImageProfile' ref={imageRef} alt="" />
                    </div>
                    <button onClick={handleUploadImage}>subir historia</button>
                    {/* <div class="stories-img color">
                        <img src="img/profile-2.jpeg" alt="" />
                        <div class="add">+</div>
                    </div>
                    <div class="stories-img">
                        <img src="img/profile-1.jpeg" alt="" />
                    </div>
                    <div class="stories-img">
                        <img src="img/1.jpeg" alt="" />
                    </div>
                    <div class="stories-img">
                        <img src="img/2.jpeg" alt="" />
                    </div>
                    <div class="stories-img">
                        <img src="img/3.jpeg" alt="" />
                    </div>
                    <div class="stories-img">
                        <img src="img/4.jpeg" alt="" />
                    </div>
                    <div class="stories-img">
                        <img src="img/5.jpeg" alt="" />
                    </div>
                    <div class="stories-img">
                        <img src="img/6.jpeg" alt="" />
                    </div>
                    <div class="stories-img">
                        <img src="img/7.jpeg" alt="" />
                    </div>
                    <div class="stories-img">
                        <img src="img/8.jpeg" alt="" />
                    </div> */}
                </div>
            </div>
        </>
    )
}

// import React, { useState } from 'react';

// function App() {
//   const [selectedFile, setSelectedFile] = useState();

//   const handleFileInput = (e) => {
//     setSelectedFile(e.target.files[0]);
//   }

//   return (
//     <div>
//       <input type="file" onChange={handleFileInput} />
//       {selectedFile && <p>Archivo seleccionado: {selectedFile.name}</p>}
//     </div>
//   );
// }

// export default App;
