import bcrypt from 'bcryptjs'
import { createAcccessToken } from '../libs/jwt.js'
import { auth, db, adminApp } from '../firebase.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, setPersistence, browserLocalPersistence } from "firebase/auth";
import { doc, setDoc, query, collection, where, getDocs, updateDoc } from "firebase/firestore";
import { ref, getStorage, deleteObject } from "firebase/storage";
import { IncomingForm } from 'formidable';
import fs from "fs"
import CompanyModel from '../models/company.models.js'
import User from '../models/user.models.js'
import jwt from 'jsonwebtoken'

export const registerCompany = async (req, res) => {
    const { companyName, legalEntity, companyAddress, activityDescription, phoneNumber, email, taxIdentity, password } = req.body;

    try {
        const hash = await bcrypt.hash(password, 10);
        const newCompany = new CompanyModel({
            companyName,
            legalEntity,
            companyAddress,
            activityDescription,
            phoneNumber,
            email,
            taxIdentity,
            password: hash
        })

        const companySaved = await newCompany.save()
        const tokenCompany = await createAcccessToken({ id: companySaved._id })
        res.cookie("tokenCompany", tokenCompany)
        res.json({
            id: companySaved._id,
            companyName: companySaved.companyName,
            legalEntity: companySaved.legalEntity,
            companyAddress: companySaved.companyAddress,
            activityDescription: companySaved.activityDescription,
            phoneNumber: companySaved.phoneNumber,
            email: companySaved.email,
            taxIdentity: companySaved.taxIdentity,
            password: companySaved.password
        })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const registerUser = async (req, res) => {
    const { email, username, password } = req.body;
    const companyFound = await CompanyModel.findOne({ email });

    if (companyFound) {
        return res.status(400).json({ message: "Email in use" });
    }
    try {
        const hash = await bcrypt.hash(password, 10)
        const newUser = new User({
            username,
            email,
            password: hash,
        })

        newUser.profileImage = 'https://firebasestorage.googleapis.com/v0/b/marketshare-c5720.appspot.com/o/ImagenDefecto%2FImagenDefecto.jpg?alt=media&token=1cc881bb-a695-4c5c-ac3d-25687f9ae6a2&_gl=1*qy0x6m*_ga*MTc3NzI1MjIwOS4xNjk2ODAzNTQw*_ga_CW55HF8NVT*MTY5ODE5NjcwNy4xOC4xLjE2OTgxOTY3MzcuMzAuMC4w'
        newUser.rutaImagen = "gs://marketshare-c5720.appspot.com/images/ImagenDefecto.jpg"

        const userSaved = await newUser.save();
        const token = await createAcccessToken({ id: userSaved._id })

        res.cookie("token", token)
        res.json({
            id: userSaved._id,
            username: userSaved.username,
            email: userSaved.email,
            imagen: userSaved.profileImage,
            ruta: userSaved.rutaImagen,
            createdAt: userSaved.createdAt,
            updatedAt: userSaved.updatedAt
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


export const loginCompany = async (req, res) => {
    const { email, password } = req.body;
    try {
        const companyFound = await CompanyModel.findOne({ email });

        if (!companyFound) {
            return res.status(400).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, companyFound.password);
        if (!isMatch) {
            return res.status(400).json({ message: "User or password incorrect" });
        }

        const tokenCompany = await createAcccessToken({ id: companyFound._id });
        console.log(tokenCompany);
        res.cookie("tokenCompany", tokenCompany);
        res.json({
            id: companyFound._id,
            companyName: companyFound.companyName,
            email: companyFound.email,
            createdAt: companyFound.createdAt,
            updatedAt: companyFound.updatedAt
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const userFound = await User.findOne({ email });

        if (!userFound) {
            return res.status(400).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, userFound.password);
        if (!isMatch) {
            return res.status(400).json({ message: "User or password incorrect" });
        }

        const token = await createAcccessToken(userFound);

        res.cookie("token", token);
        console.log(token);
        res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            imagen: userFound.profileImage,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const logoutUser = (req, res) => {
    res.cookie('token', "", {
        expires: new Date(0)
    })
    return res.sendStatus(200);
}

export const logoutCompany = (req, res) => {
    res.cookie('tokenCompany', "", {
        expires: new Date(0)
    })
    return res.sendStatus(200);
}

export const profileUser = async (req, res) => {
    const token = req.cookies.token
    const decodedToken = jwt.decode(token);
    console.log(decodedToken.id);
    let email = decodedToken.email
    const userFound = await User.findOne({ email })

    if (!userFound) return res.status(400).json({
        message: "User not found"
    })

    res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
        imagen: userFound.profileImage,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt
    });
}

export const profileCompany = async (req, res) => {
    const companyFound = await CompanyModel.findById(req.company.id);

    if (!companyFound) return res.status(400).json({
        message: "User not found"
    })

    return res.json({
        id: companyFound._id,
        companyName: companyFound.companyName,
        email: companyFound.email,
        createdAt: companyFound.creatdAte,
        updatedAt: companyFound.updatedAt,
    })
}

export const imagen = async (req, res) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Unauthorized" });
    console.log(token);
    console.log(req.body);
    const form = new IncomingForm(); // Changed this line
    form.parse(req, (err, fields, files) => {
        const bucket = adminApp.storage().bucket('gs://marketshare-c5720.appspot.com');
        if (err) {
            console.error('Error al procesar el formulario:', err);
            res.status(500).send('Error al procesar el formulario');
            return;
        }

        const archivo = files.miArchivo; // Asegúrate de que el nombre coincida con el campo de tu formulario
        if (!archivo) {
            res.status(400).send('No se ha subido ningún archivo');
            return;
        }

        const storagePath = 'images/' + archivo[0].originalFilename; // Ruta en Firebase Storage donde se guardará el archivo
        const file = bucket.file(storagePath);
        const localReadStream = fs.createReadStream(archivo[0]._writeStream.path);



        const stream = file.createWriteStream({
            metadata: {
                contentType: archivo.type
            }
        });

        stream.on('error', (err) => {
            console.error('Error al subir el archivo a Firebase Storage:', err);
            res.status(500).send('Error al subir el archivo a Firebase Storage');
        });

        stream.on('finish', () => {
            console.log('Archivo subido exitosamente a Firebase Storage');
            const config = {
                action: 'read',
                expires: '03-01-2500'
            };
            file.getSignedUrl(config, (err, url) => {
                if (err) {
                    console.error('Error al obtener el enlace de la imagen:', err);
                    res.status(500).send('Error al obtener el enlace de la imagen');
                } else {
                    // El usuario está autenticado
                    // Puedes realizar operaciones que requieran autenticación aquí
                    const decodedToken = jwt.decode(token);
                    console.log(decodedToken.id);
                    // Continúa con el proceso de actualización del documento de usuario
                    // const userDocRef = doc(db, 'users', decodedToken.uid);

                    const storage = getStorage()
                    const getUserById = async (email) => {
                        try {
                            const user = await User.findOne({ email });
                            console.log(User);
                            return user; // Devuelve el usuario encontrado
                        } catch (err) {
                            console.error('Error al buscar el usuario por ID:', err);
                            return null; // En caso de error, devuelve null o maneja el error según tus necesidades
                        }
                    };


                    console.log(decodedToken.id);
                    getUserById(decodedToken.email)
                        .then(foundUser => {
                            if (foundUser) {
                                console.log('Usuario encontrado:', foundUser);
                                console.log('Ruta de la imagen:', foundUser.rutaImagen);
                                updateImage(foundUser)
                            } else {
                                console.log('Usuario no encontrado o error en la búsqueda.');
                            }
                        })
                        .catch(err => {
                            console.error('Error al buscar el usuario por ID:', err);
                        });


                    async function updateImage(userFound) {
                        const fileURL = userFound.rutaImagen
                        // Obtén la referencia al archivo a partir de la URL
                        const imageRef = ref(storage, fileURL);
                        // Borra el archivo
                        deleteObject(imageRef)
                            .then(() => {
                                console.log('Archivo eliminado exitosamente');
                            })
                            .catch((error) => {
                                console.error('Error al eliminar el archivo:', error);
                            });


                        User.updateOne({ _id: userFound._id }, { rutaImagen: `gs://marketshare-c5720.appspot.com/${storagePath}`, profileImage: url }, (err, result) => {
                            if (err) {
                                console.error('Error al actualizar el campo "nombre":', err);
                            } else {
                                console.log('Campo "nombre" actualizado correctamente:', result);
                            }
                        });
                        let email = decodedToken.email
                        console.log(email);
                        let userFoundMongodb = await User.findOne({ email });
                        console.log("User actualiado", userFoundMongodb);
                        res.json({
                            id: userFoundMongodb._id,
                            username: userFoundMongodb.username,
                            email: userFoundMongodb.email,
                            imagen: userFoundMongodb.profileImage,
                            createdAt: userFoundMongodb.createdAt,
                            updatedAt: userFoundMongodb.updatedAt
                        });
                    }

                }
            });
        });


        localReadStream.pipe(stream);
    });
};

export const verifyToken = async (req, res) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    try {
        // Decodifica el token para obtener la información del usuario
        const decodedToken = jwt.decode(token);
        console.log(decodedToken);
        let email = decodedToken.email
        const userFound = await User.findOne({ email });
        console.log(userFound);

        return res.json({
            id: userFound._id,
            email: userFound.email,
            tokens: token,
            imagen: userFound.profileImage,
            username: userFound.username
        });
    } catch (error) {
        console.error("Error al verificar el token:", error);
        return res.status(403).json({ message: "Invalid token" });
    }
}

// // Función para registrar un nuevo usuario
// export const registerUser = async (req, res) => {
//     const { email, username, password } = req.body;
//     const q = query(collection(db, "users"), where("email", "==", email));
//     try {

//         const querySnapshot = await getDocs(q);
//         if (querySnapshot.size <= 0) {
//             const hash = await bcrypt.hash(password, 10);

//             // Crea un nuevo usuario con correo electrónico y contraseña
//             const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//             const user = userCredential.user;

//             // Crea un "documento" para el usuario en Firestore
//             await setDoc(doc(db, 'users', user.uid), {
//                 id: user.uid,
//                 username: username,
//                 email: email,
//                 profileImage: 'https://firebasestorage.googleapis.com/v0/b/marketshare-c5720.appspot.com/o/images%2FImagenDefecto.jpg?alt=media&token=ab01c88e-3c26-416c-bc7c-4fd4ea0641dc&_gl=1*bt1yd2*_ga*MTM4NjQ4NjMxMC4xNjk3NTY2OTc5*_ga_CW55HF8NVT*MTY5NzU2Njk4MC4xLjEuMTY5NzU2Nzc3Ni41MC4wLjA.',
//                 password: hash,
//                 rutaImagen: "gs://marketshare-c5720.appspot.com/images/ImagenDefecto.jpg"
//                 // puedes agregar más campos aquí...
//             });

//             console.log('Usuario registrado con éxito');

//             console.log(user);

//             return res.json({
//                 id: user.uid, // Utiliza el UID proporcionado por Firebase
//                 username: username, // Utiliza el nombre de usuario proporcionado
//                 email: email, // Utiliza el correo electrónico proporcionado
//                 imagen: user.profileImage
//                 // createdAt y updatedAt no son propiedades que se generen automáticamente
//             });
//         } else return res.status(409).json({ message: "Email is in use" });
//     } catch (error) {
//         res.status(500).json({ message: error });
//     }
// };


// export const registerCompany = async (req, res) => {
//     const { companyName, legalEntity, companyAddress, activityDescription, phoneNumber, email, taxIdentity, password } = req.body;
//     try {
//         const q = collection(db, "Company");
//         let queryRef = q;

//         const conditions = [
//             { field: "email", value: email },
//             { field: "companyName", value: companyName },
//             { field: "legalEntity", value: legalEntity },
//             { field: "phoneNumber", value: phoneNumber },
//             { field: "taxIdentity", value: taxIdentity }
//         ];

//         for (const condition of conditions) {
//             if (condition.value) {
//                 queryRef = query(queryRef, where(condition.field, "==", condition.value));
//                 const querySnapshot = await getDocs(q);
//                 if (querySnapshot.size > 0) return res.status(400).json({ message: "repeated fields" });
//                 console.log(queryRef);
//             }
//         }
//         // Hashea la contraseña
//         const hash = await bcrypt.hash(password, 10);

//         // Crea un nuevo usuario con correo electrónico y contraseña
//         const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//         const company = userCredential.user;

//         // Crea un "documento" para el usuario en Firestore
//         await setDoc(doc(db, 'Company', company.uid), {
//             profileImage: '/default-profile-image.jpg',
//             companyName: companyName,
//             legalEntity: legalEntity,
//             companyAddress: companyAddress,
//             activityDescription: activityDescription,
//             phoneNumber: phoneNumber,
//             email: email,
//             taxIdentity: taxIdentity,
//             password: hash,
//             id: company.uid
//         });

//         console.log('Usuario registrado con éxito');
//         return res.json({
//             id: company.id, // Utiliza el UID proporcionado por Firebase
//             username: companyName, // Utiliza el nombre de usuario proporcionado
//             email: email, // Utiliza el correo electrónico proporcionado
//             // createdAt y updatedAt no son propiedades que se generen automáticamente
//         });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// export const loginCompany = async (req, res) => {
//     const { email, password } = req.body;
//     console.log(req.body);
//     const q = query(collection(db, "Company"), where("email", "==", email));

//     try {
//         const querySnapshot = await getDocs(q);
//         if (querySnapshot.size > 0) {
//             // El documento existe
//             const company = querySnapshot.docs[0].data();
//             const storedPassword = company.password; // Obtiene la contraseña almacenada

//             // Ahora puedes comparar la contraseña proporcionada con la almacenada
//             const isMatch = await bcrypt.compare(password, storedPassword);

//             if (isMatch) {
//                 // Contraseña válida
//                 // Enviar el token en una cookie


//                 const tokenCompany = await createAcccessToken({ email: company.email });
//                 console.log(tokenCompany);
//                 res.cookie("tokenCompany", tokenCompany);
//                 return res.json({
//                     id: company.id,
//                     username: company.username,
//                     email: company.email
//                 })
//             } else {
//                 res.status(400).send("Contraseña o email incorrecto");
//             }
//         } else {
//             // El documento no existe
//             console.log("El documento no existe");
//             res.status(404).send("Documento no encontrado");
//         }
//     } catch (error) {
//         console.error("Error al consultar:", error);
//         res.status(500).send("Error al consultar");
//     }
// };

// export const loginUser = async (req, res) => {
//     const { email, password } = req.body;
//     console.log(req.body);
//     const q = query(collection(db, "users"), where("email", "==", email));

//     try {
//         const querySnapshot = await getDocs(q);
//         if (querySnapshot.size > 0) {
//             // El documento existe
//             const user = querySnapshot.docs[0].data();
//             const storedPassword = user.password; // Obtiene la contraseña almacenada

//             // Ahora puedes comparar la contraseña proporcionada con la almacenada
//             const isMatch = await bcrypt.compare(password, storedPassword);

//             if (isMatch) {
//                 // Contraseña válida
//                 const userCredential = await setPersistence(auth, browserLocalPersistence)
//                     .then(() => {
//                         return signInWithEmailAndPassword(auth, email, password);
//                     })
//                     .catch((error) => {
//                         // Handle Errors here.
//                         const errorCode = error.code;
//                         const errorMessage = error.message;
//                         console.log(errorMessage);
//                     });
//                 auth.onAuthStateChanged(function (user) {
//                     if (user) {
//                         console.log("Inicio sesion");
//                     } else {
//                         // No hay ningún usuario autenticado.
//                         console.log("no Inicio sesion");
//                         // Aquí puedes manejar el caso cuando no hay ningún usuario autenticado.
//                     }
//                 });

//                 console.log(userCredential);
//                 const tokenOptions = {
//                     expiresIn: '7d', // Establece la duración del token en 7 días (por ejemplo)
//                 };

//                 // Genera el token con opciones de duración
//                 const token = await userCredential.user.getIdToken(/* forceRefresh */ true,
//                     tokenOptions);
//                 console.log(token);
//                 function getTokenString(idToken) {
//                     return idToken.toString();
//                 }
//                 // Enviar el token en una cookie
//                 res.cookie("token", getTokenString(token)); // MaxAge de 1 hora
//                 console.log("Contraseña válida");
//                 return res.json({
//                     id: user.id,
//                     username: user.username,
//                     email: user.email,
//                     imagen: user.profileImage
//                 })
//             } else {
//                 res.status(400).send("Incorrect password or gmail");
//             }
//         } else {
//             // El documento no existe
//             console.log("El documento no existe");
//             res.status(404).send("Incorrect password or gmail");
//         }
//     } catch (error) {
//         console.error("Error al consultar:", error);
//         res.status(500).send("Error al consultar");
//     }
// };

// export const logoutUser = (req, res) => {
//     try {
//         res.cookie('token', "", {
//             expires: new Date(0)
//         })
//         return res.sendStatus(200);
//     } catch (error) {
//         console.log(error);
//     }
// }

// export const logoutCompany = (req, res) => {
//     res.cookie('tokenCompany', "", {
//         expires: new Date(0)
//     })
//     return res.sendStatus(200);
// }

// export const profileUser = async (req, res) => {
//     const token = req.cookies.token; // Asegúrate de que estás obteniendo el token de las cookies correctas
//     try {
//         const decodedToken = await adminApp.auth().verifyIdToken(token);
//         // El token es válido, y `decodedToken` contendrá la información del usuario.
//         console.log('Token válido:', decodedToken);
//         return res.json({
//             id: decodedToken.uid
//         });
//     } catch (error) {
//         // El token no es válido o ha expirado.
//         console.error('Token no válido:', error);
//         res.status(500).send("Error al consultar");
//     }
// }


// export const profileCompany = async (req, res) => {
//     console.log(req.body);
//     console.log(req.company);
//     const q = query(collection(db, "Company"), where("email", "==", req.company.email));
//     try {
//         const querySnapshot = await getDocs(q);
//         if (querySnapshot.size > 0) {
//             const company = querySnapshot.docs[0].data();
//             return res.json({
//                 id: company.id,
//                 username: company.username,
//                 email: company.email,
//             });
//         } else {
//             return res.status(404).json({
//                 message: "User not found"
//             });
//         }
//     } catch (error) {
//         console.error("Error al consultar:", error);
//         res.status(500).send("Error al consultar");
//     }
// }






