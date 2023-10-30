import bcrypt from 'bcryptjs'
import { createAcccessToken } from '../libs/jwt.js'
import { adminApp } from '../firebase.js';
import { ref, getStorage, deleteObject } from "firebase/storage";
import { IncomingForm } from 'formidable';
import fs from "fs"
import CompanyModel from '../models/company.models.js'
import User from '../models/user.models.js'
import publicaciones from '../models/publicaciones.js';
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
    const userFound = await User.findOne({ email });

    if (userFound) {
        return res.status(400).json({ message: "Email in use" });
    }
    try {
        const hash = await bcrypt.hash(password, 10)
        const newUser = new User({
            username,
            email,
            password: hash,
            stories: []
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
            stories: userSaved.stories
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
            stories: userFound.stories,
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
        stories: userFound.stories
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

export const imageProfile = async (req, res) => {
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
            stories: userFound.stories,
            imagen: userFound.profileImage,
            username: userFound.username
        });
    } catch (error) {
        console.error("Error al verificar el token:", error);
        return res.status(403).json({ message: "Invalid token" });
    }
}

export const addStories = async (req, res) => {
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

        const storagePath = 'stories/' + archivo[0].originalFilename; // Ruta en Firebase Storage donde se guardará el archivo
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
                    const token = req.cookies.token;
                    const decodedToken = jwt.decode(token);
                    try {
                        console.log(decodedToken);
                    } catch (error) {
                        console.log(error);
                    }
                    if (!token) return res.status(401).json({ message: "Unauthorized" });
                    const fechaActual = new Date();
                    const fechaLimite = new Date(fechaActual.getTime() + (24 * 60 * 60 * 1000));
                    console.log(fechaLimite);
                    User.updateOne(
                        { _id: decodedToken.id }, // Esto es el filtro, que selecciona el documento a actualizar basado en el _id
                        {
                            $push: {
                                stories: {
                                    url: url,
                                    fecha_create: fechaActual,
                                    fecha_limit: fechaLimite
                                } // Esto agrega el nuevo campo 'nuevoCampo' con el valor 'valor'
                            }
                        },
                        (err, result) => { // Esta es la función de callback que se ejecuta después de la operación de actualización
                            if (err) {
                                console.error('Error al agregar el nuevo campo:', err);
                            } else {
                                console.log('Nuevo campo agregado correctamente:', result);
                            }
                        }
                    );
                    let email = decodedToken.email
                    const userFoundM = async () => {
                        const userFound = await User.findOne({ email });
                        console.log(userFound);
                        return res.json({
                            id: userFound._id,
                            email: userFound.email,
                            tokens: token,
                            imagen: userFound.profileImage,
                            username: userFound.username,
                            stories: userFound.stories
                        });
                    }

                    userFoundM();
                }
            });
        });
        localReadStream.pipe(stream);
    });
}

export const archivedStories = async (req, res) => {
    const token = req.cookies.token;
    const decodedToken = jwt.decode(token);
    try {
        console.log(decodedToken);
    } catch (error) {
        console.log(error);
    }

    if (!token) return res.status(401).json({ message: "Unauthorized" });

    let email = decodedToken.email
    let userFound = await User.findOne({ email });

    let stories = userFound.stories;
    console.log(stories);
    stories.forEach(element => {
        console.log(element);
        if (element.fecha_limit >= element.fecha_limit) {
            User.updateOne(
                { _id: decodedToken.id }, // Esto es el filtro, que selecciona el documento a actualizar basado en el _id
                {
                    $pull: {
                        stories: {
                            url: element.url,
                            fecha_create: element.fecha_create,
                            fecha_limit: element.fecha_limit
                        }
                    }
                },
                (err, result) => { // Esta es la función de callback que se ejecuta después de la operación de actualización
                    if (err) {
                        console.error('Error al agregar el nuevo campo:', err);
                    } else {
                        console.log('Nuevo campo agregado correctamente:', result);
                    }
                }
            );
            User.updateOne(
                { _id: decodedToken.id }, // Esto es el filtro, que selecciona el documento a actualizar basado en el _id
                {
                    $push: {
                        archivedStories: {
                            url: url
                        } // Esto agrega el nuevo campo 'nuevoCampo' con el valor 'valor'
                    }
                },
                (err, result) => { // Esta es la función de callback que se ejecuta después de la operación de actualización
                    if (err) {
                        console.error('Error al agregar el nuevo campo:', err);
                    } else {
                        console.log('Nuevo campo agregado correctamente:', result);
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
        imagen: user.profileImage,
        username: user.username,
        stories: user.stories
    });
}
export const publications = async (req, res) => {
    try {
      const nuevaPublicacion = new publicaciones({ contenido: req.body.contenido });
      await nuevaPublicacion.save();
      console.log("Publicación creada:", nuevaPublicacion);
      res.status(200).json(nuevaPublicacion);
    } catch (error) {
      console.error("Error al crear la publicación:", error);
      res.status(400).json({ error: "erro al crear la publicacion" });
    }
  };

  export const addPublications = async (req, res) => {
    const form = new IncomingForm(); // Changed this line
    form.parse(req, (err, fields, files) => {
        const contenido = fields.Hola[0]
        console.log(contenido);
        const bucket = adminApp.storage().bucket('gs://marketshare-c5720.appspot.com');
        if (err) {
            console.error('Error al procesar el formulario:', err);
            res.status(500).send('Error al procesar el formulario');
            return;
        }

        const archivo = files.publication; // Asegúrate de que el nombre coincida con el campo de tu formulario
        if (!archivo) {
            res.status(400).send('No se ha subido ningún archivo');
            return;
        }

        const storagePath = 'publications/' + archivo[0].originalFilename; // Ruta en Firebase Storage donde se guardará el archivo
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
                    const token = req.cookies.token;
                    const decodedToken = jwt.decode(token);
                    console.log(decodedToken);
                    try {
                        console.log(decodedToken);
                    } catch (error) {
                        console.log(error);
                    }
                    if (!token) return res.status(401).json({ message: "Unauthorized" });
                    User.updateOne(
                        { _id: decodedToken.id }, // Esto es el filtro, que selecciona el documento a actualizar basado en el _id
                        {
                            $push: {
                                publications: {
                                    url: url,
                                    contenido: contenido
                                } // Esto agrega el nuevo campo 'nuevoCampo' con el valor 'valor'
                            }
                        },
                        (err, result) => { // Esta es la función de callback que se ejecuta después de la operación de actualización
                            if (err) {
                                console.error('Error al agregar el nuevo campo:', err);
                            } else {
                                console.log('Nuevo campo agregado correctamente:', result);
                            }
                        }
                    );
                    let email = decodedToken.email
                    const userFoundM = async () => {
                        const userFound = await User.findOne({ email });
        
                        return res.json({
                            id: userFound._id,
                            email: userFound.email,
                            tokens: token,
                            imagen: userFound.profileImage,
                            username: userFound.username,
                            publications: userFound.publications
                        });
                    }

                    userFoundM();
                }
            });
        });
        localReadStream.pipe(stream);
    });
}