import React, { useState, useRef } from 'react'
import "./Stories.css"
import { useAuth } from "../../../context/AuthContext.jsx";
export const Stories = () => {
    const { user } = useAuth();
    const [selectedFileVideo, setSelectedFileVideo] = useState();
    const [selectedFileImage, setSelectedFileImage] = useState();
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
                                <input type="file" accept="image/*" onChange={handleFileInput} />
                            </label>
                        </div>
                        {/* <video ref={selectedFile} controls /> */}
                    </div>
                    <div class="stories-img color">
                        <img className='historyImageProfile' ref={imageRef} alt="" />
                    </div>
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
