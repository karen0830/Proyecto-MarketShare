import bcrypt from "bcryptjs";
import { createAcccessToken } from "../libs/jwt.js";
import { adminApp } from "../firebase.js";
import { ref, getStorage, deleteObject } from "firebase/storage";
import { IncomingForm } from "formidable";
import fs from "fs";
import CompanyModel from "../models/company.models.js";
import User from "../models/user.models.js";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";
import mongoose from 'mongoose'
import SHA256 from 'crypto-js/sha256.js';
import { promisify } from "util";


export const registerCompany = async (req, res) => {
    const {
        companyName,
        legalEntity,
        companyAddress,
        activityDescription,
        phoneNumber,
        email,
        taxIdentity,
        password,
    } = req.body;

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
            password: hash,
        });

        const companySaved = await newCompany.save();
        const tokenCompany = await createAcccessToken({ id: companySaved._id });
        res.cookie("tokenCompany", tokenCompany);
        res.json({
            id: companySaved._id,
            companyName: companySaved.companyName,
            legalEntity: companySaved.legalEntity,
            companyAddress: companySaved.companyAddress,
            activityDescription: companySaved.activityDescription,
            phoneNumber: companySaved.phoneNumber,
            email: companySaved.email,
            taxIdentity: companySaved.taxIdentity,
            password: companySaved.password,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const registerUser = async (req, res) => {
    const { email, username, password } = req.body;
    const userFound = await User.findOne({ email });

    if (userFound) {
        return res.status(400).json({ message: "Email in use" });
    }
    try {
        const hash = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            email,
            password: hash,
            stories: [],
            publications: [],
            archivedStory: [],
        });

        newUser.profileImage =
            "https://firebasestorage.googleapis.com/v0/b/marketshare-c5720.appspot.com/o/ImagenDefecto%2FImagenDefecto.jpg?alt=media&token=1cc881bb-a695-4c5c-ac3d-25687f9ae6a2&_gl=1*qy0x6m*_ga*MTc3NzI1MjIwOS4xNjk2ODAzNTQw*_ga_CW55HF8NVT*MTY5ODE5NjcwNy4xOC4xLjE2OTgxOTY3MzcuMzAuMC4w";
        newUser.rutaImagen =
            "gs://marketshare-c5720.appspot.com/images/ImagenDefecto.jpg";

        const userSaved = await newUser.save();
        const token = await createAcccessToken({ id: userSaved._id });

        res.cookie("token", token);
        // Ejemplo de uso
        const userID = userSaved._id;
        const hashedID = hashString(userID);

        try {
            await User.updateOne(
                { _id: userSaved._id }, // Esto es el filtro, que selecciona el documento a actualizar basado en el _id
                {
                    $push: {
                        hashedID: hashedID // Nombre del campo donde deseas almacenar los IDs hasheados
                    },
                })
        } catch (error) {
            console.log(error);
        }
        res.json({
            id: userSaved._id,
            username: userSaved.username,
            email: userSaved.email,
            imagen: userSaved.profileImage,
            ruta: userSaved.rutaImagen,
            stories: userSaved.stories,
            publi: userSaved.archivedStories,
            publications: userSaved.publications,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

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

        // res.cookie("token", token, {
        //     httpOnly: true, // Esto asegura que la cookie sólo se envía a través de HTTP(S), no accesible a través de JavaScript. Esto ayuda a prevenir ataques de cross-site scripting (XSS).
        //     secure: true, // Esto asegura que la cookie sólo se envía a través de HTTPS. Esto ayuda a prevenir ataques de interceptación de cookies.
        //     sameSite: 'none', // Esto puede ser 'strict', 'lax', 'none', o no establecerlo. Esto ayuda a prevenir ataques de cross-site request forgery (CSRF).
        // });

        console.log(token);
        res.json({
            token: token,
            username: userFound.username,
            email: userFound.email,
            profileImage: userFound.profileImage,
            stories: userFound.stories,
            publications: userFound.publications.reverse()
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const logoutUser = (req, res) => {
    return res.sendStatus(200);
};

export const logoutCompany = (req, res) => {
    res.cookie("tokenCompany", "", {
        expires: new Date(0),
    });
    return res.sendStatus(200);
};

export const profileUser = async (req, res) => {
    const token = req.cookies.token;
    const decodedToken = jwt.decode(token);
    console.log(decodedToken.id);
    let email = decodedToken.email;
    const userFound = await User.findOne({ email });

    if (!userFound)
        return res.status(400).json({
            message: "User not found",
        });

    res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
        imagen: userFound.profileImage,
        stories: userFound.stories,
        publications: userFound.publications,
    });
};

export const profileCompany = async (req, res) => {
    const companyFound = await CompanyModel.findById(req.company.id);

    if (!companyFound)
        return res.status(400).json({
            message: "User not found",
        });

    return res.json({
        id: companyFound._id,
        companyName: companyFound.companyName,
        email: companyFound.email,
        createdAt: companyFound.creatdAte,
        updatedAt: companyFound.updatedAt,
    });
};

export const imageProfile = async (req, res) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Unauthorized" });
    console.log(token);
    console.log(req.body);
    const form = new IncomingForm(); // Changed this line
    form.parse(req, (err, fields, files) => {
        const bucket = adminApp
            .storage()
            .bucket("gs://marketshare-c5720.appspot.com");
        if (err) {
            console.error("Error al procesar el formulario:", err);
            res.status(500).send("Error al procesar el formulario");
            return;
        }

        const archivo = files.miArchivo; // Asegúrate de que el nombre coincida con el campo de tu formulario
        if (!archivo) {
            res.status(400).send("No se ha subido ningún archivo");
            return;
        }
        console.log(archivo[0])
        const storagePath = "images/" + archivo[0].newFilename + archivo[0].originalFilename; // Ruta en Firebase Storage donde se guardará el archivo
        const file = bucket.file(storagePath);
        const localReadStream = fs.createReadStream(archivo[0]._writeStream.path);
        const stream = file.createWriteStream({
            metadata: {
                contentType: archivo.type,
            },
        });

        stream.on("error", (err) => {
            console.error("Error al subir el archivo a Firebase Storage:", err);
            res.status(500).send("Error al subir el archivo a Firebase Storage");
        });

        stream.on("finish", () => {
            console.log("Archivo subido exitosamente a Firebase Storage");
            const config = {
                action: "read",
                expires: "03-01-2500",
            };
            file.getSignedUrl(config, (err, url) => {
                if (err) {
                    console.error("Error al obtener el enlace de la imagen:", err);
                    res.status(500).send("Error al obtener el enlace de la imagen");
                } else {
                    // El usuario está autenticado
                    // Puedes realizar operaciones que requieran autenticación aquí
                    const decodedToken = jwt.decode(token);
                    console.log(decodedToken.id);
                    // Continúa con el proceso de actualización del documento de usuario
                    // const userDocRef = doc(db, 'users', decodedToken.uid);

                    const storage = getStorage();
                    const getUserById = async (email) => {
                        try {
                            const user = await User.findOne({ email });
                            console.log(User);
                            return user; // Devuelve el usuario encontrado
                        } catch (err) {
                            console.error("Error al buscar el usuario por ID:", err);
                            return null; // En caso de error, devuelve null o maneja el error según tus necesidades
                        }
                    };

                    console.log(decodedToken.id);
                    getUserById(decodedToken.email)
                        .then((foundUser) => {
                            if (foundUser) {
                                console.log("Usuario encontrado:", foundUser);
                                console.log("Ruta de la imagen:", foundUser.rutaImagen);
                                updateImage(foundUser);
                            } else {
                                console.log("Usuario no encontrado o error en la búsqueda.");
                            }
                        })
                        .catch((err) => {
                            console.error("Error al buscar el usuario por ID:", err);
                        });

                    async function updateImage(userFound) {
                        const fileURL = userFound.rutaImagen;
                        // Obtén la referencia al archivo a partir de la URL
                        const imageRef = ref(storage, fileURL);
                        // Borra el archivo
                        try {
                            await deleteObject(imageRef)
                                .then(() => {
                                    console.log("Archivo eliminado exitosamente");
                                })
                                .catch((error) => {
                                    console.error("Error al eliminar el archivo:", error);
                                });
                            const result = await User.updateOne(
                                { _id: userFound._id },
                                {
                                    rutaImagen: `gs://marketshare-c5720.appspot.com/${storagePath}`,
                                    profileImage: url,
                                }
                            );
                            console.log('Campo "nombre" actualizado correctamente:', result);
                        } catch (err) {
                            console.error('Error al actualizar el campo "nombre":', err);
                        }

                        let email = decodedToken.email;
                        console.log(email);
                        let userFoundMongodb = await User.findOne({ email });
                        console.log("User actualiado", userFoundMongodb);
                        res.json({
                            imagen: userFoundMongodb.profileImage
                        });
                    }
                }
            });
        });

        localReadStream.pipe(stream);
    });
};

export const getProfileImage = async (req, res) => {
    const authorizationHeader = req.headers['authorization'];
    console.log("header", req.headers);

    if (!authorizationHeader) {
        return res.status(401).json({ message: "Unauthorized 1" });
    }

    const token = authorizationHeader.split(' ')[1]; // Obtén solo el token, omitiendo 'Bearer'
    // const token = req.cookies.token;
    const decodedToken = jwt.decode(token);
    if (!token) return res.status(401).json({ message: "Unauthorized" });
    let email = decodedToken.email;
    let user = await User.findOne({ email });
    res.json({
        profileImage: user.profileImage
    })

}


export const verifyToken = async (req, res) => {
    const authorizationHeader = req.headers['authorization'];
    console.log("header", req.headers);

    if (!authorizationHeader) {
        return res.status(401).json({ message: "Unauthorized 1" });
    }

    const token = authorizationHeader.split(' ')[1]; // Obtén solo el token, omitiendo 'Bearer'
    // const token = req.cookies.token;
    // if (!token) return res.status(401).json({ message: "Unauthorized" });

    try {
        // Decodifica el token para obtener la información del usuario
        const decodedToken = jwt.decode(token);
        console.log(decodedToken);
        let email = decodedToken.email;
        const userFound = await User.findOne({ email });
        console.log(userFound);

        return res.json({
            id: userFound._id,
            email: userFound.email,
            tokens: token,
            stories: userFound.stories,
            imagen: userFound.profileImage,
            username: userFound.username,
            publications: userFound.publications,
        });
    } catch (error) {
        console.error("Error al verificar el token:", error);
        return res.status(403).json({ message: "Invalid token" });
    }
};

export const addStories = async (req, res) => {
    const form = new IncomingForm(); // Changed this line
    form.parse(req, (err, fields, files) => {
        const bucket = adminApp
            .storage()
            .bucket("gs://marketshare-c5720.appspot.com");
        if (err) {
            console.error("Error al procesar el formulario:", err);
            res.status(500).send("Error al procesar el formulario");
            return;
        }

        const archivo = files.miArchivo; // Asegúrate de que el nombre coincida con el campo de tu formulario
        if (!archivo) {
            res.status(400).send("No se ha subido ningún archivo");
            return;
        }

        const storagePath = "stories/" + archivo[0].originalFilename; // Ruta en Firebase Storage donde se guardará el archivo
        const file = bucket.file(storagePath);
        const localReadStream = fs.createReadStream(archivo[0]._writeStream.path);
        const stream = file.createWriteStream({
            metadata: {
                contentType: archivo.type,
            },
        });

        stream.on("error", (err) => {
            console.error("Error al subir el archivo a Firebase Storage:", err);
            res.status(500).send("Error al subir el archivo a Firebase Storage");
        });

        stream.on("finish", () => {
            console.log("Archivo subido exitosamente a Firebase Storage");
            const config = {
                action: "read",
                expires: "03-01-2500",
            };
            file.getSignedUrl(config, (err, url) => {
                if (err) {
                    console.error("Error al obtener el enlace de la imagen:", err);
                    res.status(500).send("Error al obtener el enlace de la imagen");
                } else {
                    const authorizationHeader = req.headers['authorization'];
                    console.log("header", req.headers);

                    if (!authorizationHeader) {
                        return res.status(401).json({ message: "Unauthorized 1" });
                    }

                    const token = authorizationHeader.split(' ')[1]; // Obtén solo el token, omitiendo 'Bearer'
                    // const token = req.cookies.token;
                    const decodedToken = jwt.decode(token);
                    if (!token) return res.status(401).json({ message: "Unauthorized" });
                    const fechaActual = new Date();
                    const fechaLimite = new Date(
                        fechaActual.getTime() + 24 * 60 * 60 * 1000
                    );
                    console.log(fechaLimite);
                    User.updateOne(
                        { _id: decodedToken.id }, // Esto es el filtro, que selecciona el documento a actualizar basado en el _id
                        {
                            $push: {
                                stories: {
                                    url: url,
                                    fecha_create: fechaActual,
                                    fecha_limit: fechaLimite,
                                }, // Esto agrega el nuevo campo 'nuevoCampo' con el valor 'valor'
                            },
                        },
                        (err, result) => {
                            // Esta es la función de callback que se ejecuta después de la operación de actualización
                            if (err) {
                                console.error("Error al agregar el nuevo campo:", err);
                            } else {
                                console.log("Nuevo campo agregado correctamente:", result);
                            }
                        }
                    );
                    let email = decodedToken.email;
                    const userFoundM = async () => {
                        const userFound = await User.findOne({ email });
                        console.log(userFound);
                        return res.json({
                            id: userFound._id,
                            email: userFound.email,
                            tokens: token,
                            imagen: userFound.profileImage,
                            username: userFound.username,
                            stories: userFound.stories,
                        });
                    };

                    userFoundM();
                }
            });
        });
        localReadStream.pipe(stream);
    });
};

export const archivedStories = async (req, res) => {
    const authorizationHeader = req.headers['authorization'];
    console.log("header", req.headers);

    if (!authorizationHeader) {
        return res.status(401).json({ message: "Unauthorized 1" });
    }

    const token = authorizationHeader.split(' ')[1]; // Obtén solo el token, omitiendo 'Bearer'
    // const token = req.cookies.token;
    const decodedToken = jwt.decode(token);
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    let email = decodedToken.email;
    let userFound = await User.findOne({ email });

    let stories = userFound.stories;
    console.log(stories);
    stories.forEach((element) => {
        console.log(element);
        if (element.fecha_create >= element.fecha_limit) {
            console.log("entro");
            User.updateOne(
                { _id: decodedToken.id }, // Esto es el filtro, que selecciona el documento a actualizar basado en el _id
                {
                    $push: {
                        archivedStory: {
                            url: element.url,
                        }, // Esto agrega el nuevo campo 'nuevoCampo' con el valor 'valor'
                    },
                    $pull: {
                        stories: {
                            url: element.url,
                            fecha_create: element.fecha_create,
                            fecha_limit: element.fecha_limit,
                        },
                    },
                },
                (err, result) => {
                    // Esta es la función de callback que se ejecuta después de la operación de actualización
                    if (err) {
                        console.error("Error al agregar el nuevo campo:", err);
                    } else {
                        console.log("Nuevo campo agregado correctamente:", result);
                    }
                }
            );
        } else console.log("Menor");
    });

    let user = await User.findOne({ email });
    return res.json({
        id: user._id,
        email: user.email,
        tokens: token,
        stories: user.stories,
        publi: user.archivedStories,
    });
};

export const deleteStories = async (req, res) => {
    const authorizationHeader = req.headers['authorization'];
    console.log("header", req.headers);

    if (!authorizationHeader) {
        return res.status(401).json({ message: "Unauthorized 1" });
    }

    const token = authorizationHeader.split(' ')[1]; // Obtén solo el token, omitiendo 'Bearer'
    // const token = req.cookies.token;
    const decodedToken = jwt.decode(token);

    if (!token) return res.status(401).json({ message: "Unauthorized" });
    let email = decodedToken.email;
    let userFound = await User.findOne({ email });

    let stories = userFound.stories;
    console.log(stories);
    stories.forEach((element) => {
        console.log(element);
        if (element.fecha_create >= element.fecha_limit) {
            console.log("entro");
            User.updateOne(
                { _id: decodedToken.id }, // Esto es el filtro, que selecciona el documento a actualizar basado en el _id
                {
                    $push: {
                        archivedStory: {
                            url: element.url,
                        }, // Esto agrega el nuevo campo 'nuevoCampo' con el valor 'valor'
                    },
                    $pull: {
                        stories: {
                            url: element.url,
                            fecha_create: element.fecha_create,
                            fecha_limit: element.fecha_limit,
                        },
                    },
                },
                (err, result) => {
                    // Esta es la función de callback que se ejecuta después de la operación de actualización
                    if (err) {
                        console.error("Error al agregar el nuevo campo:", err);
                    } else {
                        console.log("Nuevo campo agregado correctamente:", result);
                    }
                }
            );
        } else console.log("Menor");
    });

    let user = await User.findOne({ email });
    return res.json({
        id: user._id,
        email: user.email,
        tokens: token,
        stories: user.stories,
        publi: user.archivedStories,
    });
};

export const addPublications = async (req, res) => {
    const form = new IncomingForm(); // Changed this line
    form.parse(req, (err, fields, files) => {
        const contenido = fields.Hola[0];
        console.log(contenido);
        const bucket = adminApp
            .storage()
            .bucket("gs://marketshare-c5720.appspot.com");
        if (err) {
            console.error("Error al procesar el formulario:", err);
            res.status(500).send("Error al procesar el formulario");
            return;
        }

        const archivo = files.publication; // Asegúrate de que el nombre coincida con el campo de tu formulario
        if (!archivo) {
            res.status(400).send("No se ha subido ningún archivo");
            return;
        }
        console.log(archivo[0]);
        const storagePath = "publications/" + archivo[0].newFilename + archivo[0].originalFilename; // Ruta en Firebase Storage donde se guardará el archivo
        const file = bucket.file(storagePath);
        const localReadStream = fs.createReadStream(archivo[0]._writeStream.path);
        const stream = file.createWriteStream({
            metadata: {
                contentType: archivo.type,
            },
        });

        stream.on("error", (err) => {
            console.error("Error al subir el archivo a Firebase Storage:", err);
            res.status(500).send("Error al subir el archivo a Firebase Storage");
        });

        stream.on("finish", () => {
            console.log("Archivo subido exitosamente a Firebase Storage");
            const config = {
                action: "read",
                expires: "03-01-2500",
            };
            file.getSignedUrl(config, (err, url) => {
                if (err) {
                    console.error("Error al obtener el enlace de la imagen:", err);
                    res.status(500).send("Error al obtener el enlace de la imagen");
                } else {
                    const authorizationHeader = req.headers['authorization'];
                    console.log("header", req.headers);

                    if (!authorizationHeader) {
                        return res.status(401).json({ message: "Unauthorized 1" });
                    }

                    const token = authorizationHeader.split(' ')[1]; // Obtén solo el token, omitiendo 'Bearer'
                    // const token = req.cookies.token;
                    console.log(token);
                    const decodedToken = jwt.decode(token);

                    if (!token) return res.status(401).json({ message: "Unauthorized" });

                    const result = async () => {
                        const email = decodedToken.email;
                        const userFound = await User.findOne({ email });
                        console.log(userFound);
                        try {
                            await User.updateOne(
                                { _id: decodedToken.id },
                                {
                                    $push: {
                                        publications: {
                                            type: "img",
                                            url: url,
                                            contenido: contenido,
                                            profileImage: userFound.profileImage,
                                            user: userFound.username,
                                            reactions: {
                                                comments: [],
                                                share: [],
                                                like: [],
                                            },
                                        },
                                    },
                                }
                            );
                            console.log("Nuevo campo agregado correctamente:", result);
                        } catch (err) {
                            console.error("Error al agregar el nuevo campo:", err);
                        }
                    }

                    result();

                    let email = decodedToken.email;
                    const userFoundM = async () => {
                        const userFound = await User.findOne({ email });

                        return res.json({
                            publications: userFound.publications.reverse(),
                        });
                    };

                    userFoundM();
                }
            });
        });
        localReadStream.pipe(stream);
    });
};


//const path = require('path');

// Función para subir el video a Firebase Storage y obtener la URL firmada
const uploadVideoToStorage = (filePath, fileName) => {
    const bucket = adminApp.storage().bucket();

    // Subir el archivo a Firebase Storage
    return bucket.upload(filePath, {
        destination: `publications/${fileName}` // Especifica la ruta y el nombre del archivo en Firebase Storage
    })
        .then(() => {
            // Generar una URL firmada para acceder al archivo
            return bucket.file(`publications/${fileName}`).getSignedUrl({
                action: 'read',
                expires: '03-01-2500', // Fecha de expiración de la URL
            });
        })
        .then((signedUrls) => {
            // Devolver la URL firmada
            return signedUrls[0];
        })
        .catch((error) => {
            console.error('Error al subir el video a Firebase Storage:', error);
            throw error;
        });
};

// Función para procesar el formulario y subir el video a Firebase Storage
export const addPublicationsVideo = (req, res) => {
    const authorizationHeader = req.headers['authorization'];
    console.log("header", req.headers);

    if (!authorizationHeader) {
        return res.status(401).json({ message: "Unauthorized 1" });
    }

    const token = authorizationHeader.split(' ')[1]; // Obtén solo el token, omitiendo 'Bearer'
    // const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Unauthorized" });
    const decodedToken = jwt.decode(token);
    const form = new IncomingForm();

    form.parse(req, (err, fields, files) => {
        const contenido = fields.Hola[0] ? fields.Hola[0] : "";
        if (err) {
            console.error('Error al procesar el formulario:', err);
            res.status(500).send('Error al procesar el formulario');
            return;
        }
        console.log(files);
        // Obtener el nombre original del archivo de video
        const originalFileName = files.publication ? files.publication[0].originalFilename : null;
        console.log(originalFileName);
        if (!originalFileName) {
            res.status(400).send('No se ha subido ningún archivo de video');
            return;
        }

        // Renombrar el archivo para eliminar caracteres especiales
        const fileName = originalFileName.replace(/[^\w\s.-]/gi, '');

        // Obtener la ruta del archivo del campo de formulario 'video'
        const filePath = files.publication ? files.publication[0].filepath : null;
        if (!filePath) {
            res.status(400).send('No se ha subido ningún archivo de video');
            return;
        }

        // Subir el video a Firebase Storage y obtener la URL firmada
        uploadVideoToStorage(filePath, fileName)
            .then((signedUrl) => {
                // Enviar la URL firmada como respuesta
                const result = async () => {
                    const email = decodedToken.email;
                    let userFound = await User.findOne({ email });
                    console.log(userFound);
                    try {
                        await User.updateOne(
                            { _id: decodedToken.id },
                            {
                                $push: {
                                    publications: {
                                        url: signedUrl,
                                        type: "video/mp4",
                                        contenido: contenido,
                                        profileImage: userFound.profileImage,
                                        user: userFound.username,
                                        reactions: {
                                            comments: [],
                                            share: [],
                                            like: [],
                                        },
                                    },
                                },
                            }
                        );
                        console.log("Nuevo campo agregado correctamente:", result);
                        userFound = await User.findOne({ email });

                        return res.json({
                            publications: userFound.publications.reverse(),
                        });
                    } catch (err) {
                        console.error("Error al agregar el nuevo campo:", err);
                        res.status(500).send("Error al agregar el nuevo campo:", err);
                    }
                }

                result();
            })
            .catch((error) => {
                // Manejar errores
                console.error('Error al subir el video a Firebase Storage:', error);
                res.status(500).send('Error al subir el video a Firebase Storage');
            });
    });
};




export const getPublications = async (req, res) => {
    const authorizationHeader = req.headers['authorization'];
    console.log("header", req.headers);

    if (!authorizationHeader) {
        return res.status(401).json({ message: "Unauthorized 1" });
    }

    const token = authorizationHeader.split(' ')[1]; // Obtén solo el token, omitiendo 'Bearer'
    // const token = req.cookies.token;
    // if (!token) return res.status(401).json({ message: "Unauthorized" });
    const decodedToken = jwt.decode(token);
    let email = decodedToken.email;
    let user = await User.findOne({ email });
    res.json({
        publications: user.publications.reverse()
    })
}

export const reactionLove = async (req, res) => {
    const { link, userName } = req.body;
    const authorizationHeader = req.headers['authorization'];
    console.log("header", req.headers);

    if (!authorizationHeader) {
        return res.status(401).json({ message: "Unauthorized 1" });
    }

    const token = authorizationHeader.split(' ')[1]; // Obtén solo el token, omitiendo 'Bearer'
    // const token = req.cookies.token;
    const decodedToken = jwt.decode(token);
    console.log(userName);

    if (!token || !decodedToken) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const email = decodedToken.email;
    const user = await User.findOne({ email });

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    const name = user.username;
    const imageProfile = await User.findOne({ username: name }, 'profileImage');
    console.log("imagen: ", imageProfile);
    console.log(userName);
    console.log(link);

    const document = await User.findOne({
        username: userName,
        "publications.url": link
    }, { "publications.$": 1 });

    console.log("docu ", document);

    const publication = document.publications[0];

    let userExists = false;

    for (const element of publication.reactions.like) {
        if (element.user === name) {
            userExists = true;
            break;
        }
    }

    console.log(userExists);

    if (userExists) {
        await User.findOneAndUpdate(
            {
                username: userName,
                "publications.url": link,
                "publications.reactions.like.user": name,
            },
            {
                $pull: {
                    "publications.$.reactions.like": { user: name },
                },
            }
        );
    } else {
        await User.findOneAndUpdate(
            {
                username: userName,
                "publications.url": link,
            },
            {
                $push: {
                    "publications.$.reactions.like": {
                        imageProfile: imageProfile.profileImage,
                        user: name,
                        num: 1,
                    },
                },
            },
            { new: true }
        );
    }

    const publicationFound = await User.findOne(
        { username: userName, "publications.url": link },
        { "publications.$": 1 }
    );

    console.log(publicationFound.publications[0].reactions);

    return res.json({
        publications: publicationFound.publications[0]
    });
};


export const comments = async (req, res) => {
    try {
        const { comment, link } = req.body;
        const authorizationHeader = req.headers['authorization'];
        console.log("header", req.headers);

        if (!authorizationHeader) {
            return res.status(401).json({ message: "Unauthorized 1" });
        }

        const token = authorizationHeader.split(' ')[1]; // Obtén solo el token, omitiendo 'Bearer'
        // const token = req.cookies.token;
        const decodedToken = jwt.decode(token);
        let email = decodedToken.email;
        const user = await User.findOne({ email });
        await User.findOneAndUpdate(
            { email: email, "publications.url": link },
            {
                $push: {
                    "publications.$.reactions.comments": {
                        _id: new ObjectId(),
                        user: user.username,
                        comment: comment,
                    },
                },
            }
        );
        return res.json({
            id: user._id,
            email: user.email,
            reaction: user.reactions,
        });
    } catch (error) {
        console.log(error);
    }
};

export const deleteComment = async (req, res) => {
    try {
        const { comment, link, idUser } = req.body;
        const authorizationHeader = req.headers['authorization'];
        console.log("header", req.headers);

        if (!authorizationHeader) {
            return res.status(401).json({ message: "Unauthorized 1" });
        }

        const token = authorizationHeader.split(' ')[1]; // Obtén solo el token, omitiendo 'Bearer'
        // const token = req.cookies.token;if (!token) return res.status(401).json({ message: "Unauthorized" });
        const decodedToken = jwt.decode(token);
        let email = decodedToken.email;
        const user = await User.findOne({ email });
        console.log(user);
        const result = await User.findOneAndUpdate(
            { email: email, "publications.url": link },
            {
                $pull: {
                    "publications.$[pub].reactions.comments": {
                        _id: mongoose.Types.ObjectId(idUser) // Cambia 'id' a '_id' para utilizar el identificador único (_id)
                    }
                }
            },
            {
                arrayFilters: [
                    { "pub.url": link }
                ]
            }
        );


        return res.json(user);
    } catch (error) {
        console.log(error);
    }
};

// Endpoint para refrescar tokens
export const refreshToken = async (req, res) => {
    const authorizationHeader = req.headers['authorization'];

    if (!authorizationHeader) {
        return res.status(401).json({ message: "Unauthorized 1" });
    }

    const refreshToken = authorizationHeader.split(' ')[1]; // Obtén solo el token, omitiendo 'Bearer'
    // const token = req.cookies.token;
   

    try {
        const currentTime = Math.floor(Date.now() / 1000);
        const decodedToken = jwt.decode(refreshToken);
        if (decodedToken.exp < currentTime) {
            console.log("El token de actualización ha expirado");
            const email = decodedToken.email;
            const user = await User.findOne({ email });

            if (!user) {
                return res.status(404).json({ message: "Usuario no encontrado" });
            }

            const newAccessToken = await createAcccessToken(user); // Generar un nuevo token de acceso
            // actualización
            res.clearCookie("token"); // Eliminar el token de actualización antiguo
            res.cookie("token", newAccessToken); // Establecer el nuevo token de acceso como cookie
            const newTokenVerify = jwt.verify(newAccessToken, TOKEN_SECRET); // Verificar el token de
            console.log(newTokenVerify);
            return res.status(200).json({ accessToken: newAccessToken }); // Enviar el nuevo token de acceso al cliente
        } else {
            return res.status(200).json({ message: "Token de actualización válido" });
        }
    } catch (error) {
        console.log(error);
        return res
            .status(403)
            .json({ message: "Error al verificar el token de actualización" });
    }
};


export const getAllPublications = async (req, res) => {
    const authorizationHeader = req.headers['authorization'];
    console.log("header", req.headers);
    const token = authorizationHeader.split(' ')[1]; // Obtén solo el token, omitiendo 'Bearer'
    // const token = req.cookies.token;
    const decodedToken = jwt.decode(token);
    let publications;
    if (!token) {
        publications = await User.find({}, 'publications');
        return res.json({
            publis: publications
        })
    }
    publications = await User.find({ username: { $ne: decodedToken.name } }, 'publications');
    console.log(publications);
    res.json({
        publis: publications
    })
}

export const followPerson = async (req, res) => {
    const { token } = req.cookies;
    const { seguir } = req.body;
    if (!token) return res.status(401).json({ message: "Unauthorized" });
    res.json({
        seguir: seguir
    })
}

export const getProfile = async (req, res) => {
    const authorizationHeader = req.headers['authorization'];
    console.log("header", req.headers);

    if (!authorizationHeader) {
        return res.status(401).json({ message: "Unauthorized 1" });
    }

    const token = authorizationHeader.split(' ')[1]; // Obtén solo el token, omitiendo 'Bearer'
    // const token = req.cookies.token;
    // if (!token) return res.status(401).json({ message: "Unauthorized" });

    // Obtén el username desde req.params o req.query dependiendo de cómo estás pasando el parámetro
    const { username } = req.body; // o req.query según sea necesario

    try {
        const userFound = await User.findOne({ username: username });
        console.log(userFound);

        if (userFound !== null) {
            res.json({
                id: userFound.hashedID,
                username: userFound.username,
                publications: userFound.publications,
                profileImage: userFound.profileImage
            });
        } else {
            return res.status(404).json({ message: "User not found" }); // Cambié el código de estado a 404 para indicar que no se encontró el usuario
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

function hashString(input) {
    return SHA256(input).toString();
}

export const postMessage = async (req, res) => {
    const authorizationHeader = req.headers['authorization'];
    console.log("header", req.headers);

    if (!authorizationHeader) {
        return res.status(401).json({ message: "Unauthorized 1" });
    }

    const token = authorizationHeader.split(' ')[1]; // Obtén solo el token, omitiendo 'Bearer'
    // const token = req.cookies.token;
    const decodedToken = jwt.decode(token);
    console.log(token);
    if (!token) return res.status(401).json({ message: "Unauthorized" });
    try {
        const username = decodedToken.name;
        const { from, message } = req.body;
        console.log(req.body);

        const chatUsers = {
            "userOne": from,
            "userTwo": username
        };

        // Crea un nuevo mensaje
        const newMessage = {
            "from": from,
            "to": username,
            message: message
        };

        const { messages } = await User.findOne({ username: from }, { messages: 1 });

        let chatMessage = false;
        console.log(username);

        // ...

        for (const element of messages) {
            const chatUsersElement = element.ChatUsers;

            // Verifica si ya existe una conversación entre 'from' y 'to'
            if ((chatUsersElement.userOne === from && chatUsersElement.userTwo === username) ||
                (chatUsersElement.userOne === username && chatUsersElement.userTwo === from)) {
                chatMessage = true;

                // Asegúrate de que element.message sea un array antes de intentar agregar
                if (!Array.isArray(element.message)) {
                    element.message = [];
                }

                // Agrega el nuevo mensaje a la conversación existente
                element.message.push(newMessage);

                // Guarda los cambios en el documento de usuario
                await User.findOneAndUpdate(
                    { username: from, 'messages.ChatUsers.userOne': chatUsersElement.userOne, 'messages.ChatUsers.userTwo': chatUsersElement.userTwo },
                    {
                        $set: {
                            'messages.$.message': element.message
                        },
                    }
                );

                await User.findOneAndUpdate(
                    { username: username, 'messages.ChatUsers.userOne': chatUsersElement.userOne, 'messages.ChatUsers.userTwo': chatUsersElement.userTwo },
                    {
                        $set: {
                            'messages.$.message': element.message
                        },
                    }
                );

                break; // Puedes salir del bucle una vez que encuentras una coincidencia
            }
        }

        // ...


        // Si no hay conversación existente, crea una nueva
        if (!chatMessage) {
            const verifyUserFrom = await User.findOne({ username: from });
            const verifyUserTo = await User.findOne({ username: username });
            if (!verifyUserFrom || !verifyUserTo) return res.status(404).json({ message: "User not found" }); // Cambié el código de estado a 404 para indicar que no se encontró el usuario

            await User.findOneAndUpdate(
                { username: from },
                {
                    $push: {
                        messages: {
                            message: [newMessage],
                            ChatUsers: chatUsers
                        }
                    },
                }
            );

            await User.findOneAndUpdate(
                { username: username },
                {
                    $push: {
                        messages: {
                            message: [newMessage],
                            ChatUsers: chatUsers
                        }
                    },
                }
            );
        }

        console.log(decodedToken);
        const user = await User.findOne({ username: from });
        console.log(user);
        res.json({
            user: user
        });
    } catch (error) {
        console.error(error);
        res.status(500).json("Internal Server Error");
    }
};


export const getMessage = async (req, res) => {
    const authorizationHeader = req.headers['authorization'];
    console.log("header", req.headers);

    if (!authorizationHeader) {
        return res.status(401).json({ message: "Unauthorized 1" });
    }

    const token = authorizationHeader.split(' ')[1]; // Obtén solo el token, omitiendo 'Bearer'
    // const token = req.cookies.token;
    const decodedToken = jwt.decode(token);
    console.log(token);
    if (!token) return res.status(401).json({ message: "Unauthorized" });
    try {
        const username = decodedToken.name;
        const { user } = req.body;
        console.log(req.body);

        const { messages } = await User.findOne({ username: user }, { messages: 1 });

        let chatMessage = false;
        console.log(username);

        let getMessagesUser = "";

        // ...

        for (const element of messages) {
            const chatUsersElement = element.ChatUsers;

            // Verifica si ya existe una conversación entre 'from' y 'to'
            if ((chatUsersElement.userOne === user && chatUsersElement.userTwo === username) ||
                (chatUsersElement.userOne === username && chatUsersElement.userTwo === user)) {
                chatMessage = true;

                // Asegúrate de que element.message sea un array antes de intentar agregar
                if (!Array.isArray(element.message)) {
                    element.message = [];
                }

                getMessagesUser = element;

                break; // Puedes salir del bucle una vez que encuentras una coincidencia
            }
        }
        res.json(getMessagesUser);
    } catch (error) {
        console.error(error);
        res.status(500).json("Internal Server Error");
    }
};




