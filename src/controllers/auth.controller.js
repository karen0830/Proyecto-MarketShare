import bcrypt from 'bcryptjs'
import { createAcccessToken } from '../libs/jwt.js'
import { auth, db, adminApp } from '../firebase.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, query, collection, where, getDocs, updateDoc } from "firebase/firestore";
import { IncomingForm } from 'formidable';;
import fs from "fs"

// Función para registrar un nuevo usuario
export const registerUser = async (req, res) => {
    const { email, username, password } = req.body;

    try {
        const hash = await bcrypt.hash(password, 10);

        // Crea un nuevo usuario con correo electrónico y contraseña
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Crea un "documento" para el usuario en Firestore
        await setDoc(doc(db, 'users', user.uid), {
            id: user.uid,
            username: username,
            email: email,
            profileImage: '/default-profile-image.jpg',
            password: hash
            // puedes agregar más campos aquí...
        });

        console.log('Usuario registrado con éxito');

        console.log(user);

        res.json({
            id: user.uid, // Utiliza el UID proporcionado por Firebase
            username: username, // Utiliza el nombre de usuario proporcionado
            email: email, // Utiliza el correo electrónico proporcionado
            // createdAt y updatedAt no son propiedades que se generen automáticamente
        });
    } catch (error) {
        res.status(500).json({ message: "Email is in use" });
    }
};


export const registerCompany = async (req, res) => {
    const { companyName, legalEntity, companyAddress, activityDescription, phoneNumber, email, taxIdentity, password } = req.body;
    try {
        const q = collection(db, "Company");
        let queryRef = q;

        const conditions = [
            { field: "email", value: email },
            { field: "companyName", value: companyName },
            { field: "legalEntity", value: legalEntity },
            { field: "phoneNumber", value: phoneNumber },
            { field: "taxIdentity", value: taxIdentity }
        ];

        for (const condition of conditions) {
            if (condition.value) {
                queryRef = query(queryRef, where(condition.field, "==", condition.value));
                const querySnapshot = await getDocs(q);
                if (querySnapshot.size > 0) return res.status(400).json({ message: "repeated fields" });
                console.log(queryRef);
            }
        }
        // Hashea la contraseña
        const hash = await bcrypt.hash(password, 10);

        // Crea un nuevo usuario con correo electrónico y contraseña
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const company = userCredential.user;

        // Crea un "documento" para el usuario en Firestore
        await setDoc(doc(db, 'Company', company.uid), {
            profileImage: '/default-profile-image.jpg',
            companyName: companyName,
            legalEntity: legalEntity,
            companyAddress: companyAddress,
            activityDescription: activityDescription,
            phoneNumber: phoneNumber,
            email: email,
            taxIdentity: taxIdentity,
            password: hash,
            id: company.uid
        });

        console.log('Usuario registrado con éxito');
        return res.json({
            id: company.id, // Utiliza el UID proporcionado por Firebase
            username: companyName, // Utiliza el nombre de usuario proporcionado
            email: email, // Utiliza el correo electrónico proporcionado
            // createdAt y updatedAt no son propiedades que se generen automáticamente
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const loginCompany = async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);
    const q = query(collection(db, "Company"), where("email", "==", email));

    try {
        const querySnapshot = await getDocs(q);
        if (querySnapshot.size > 0) {
            // El documento existe
            const company = querySnapshot.docs[0].data();
            const storedPassword = company.password; // Obtiene la contraseña almacenada

            // Ahora puedes comparar la contraseña proporcionada con la almacenada
            const isMatch = await bcrypt.compare(password, storedPassword);

            if (isMatch) {
                // Contraseña válida
                // Enviar el token en una cookie


                const tokenCompany = await createAcccessToken({ email: company.email });
                console.log(tokenCompany);
                res.cookie("tokenCompany", tokenCompany);
                return res.json({
                    id: company.id,
                    username: company.username,
                    email: company.email
                })
            } else {
                res.status(400).send("Contraseña o email incorrecto");
            }
        } else {
            // El documento no existe
            console.log("El documento no existe");
            res.status(404).send("Documento no encontrado");
        }
    } catch (error) {
        console.error("Error al consultar:", error);
        res.status(500).send("Error al consultar");
    }
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);
    const q = query(collection(db, "users"), where("email", "==", email));

    try {
        const querySnapshot = await getDocs(q);
        if (querySnapshot.size > 0) {
            // El documento existe
            const user = querySnapshot.docs[0].data();
            const storedPassword = user.password; // Obtiene la contraseña almacenada

            // Ahora puedes comparar la contraseña proporcionada con la almacenada
            const isMatch = await bcrypt.compare(password, storedPassword);

            if (isMatch) {
                // Contraseña válida
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                auth.onAuthStateChanged(function(user) {
                    if (user) {
                      console.log("Inicio sesion");
                    } else {
                      // No hay ningún usuario autenticado.
                      console.log("no Inicio sesion");
                      // Aquí puedes manejar el caso cuando no hay ningún usuario autenticado.
                    }
                  });
                const token = await userCredential.user.getIdToken();
                console.log(token);
                // Enviar el token en una cookie
                res.cookie("token", token); // MaxAge de 1 hora
                console.log("Contraseña válida");
                return res.json({
                    id: user.id,
                    username: user.username,
                    email: user.email
                })
            } else {
                res.status(400).send("Incorrect password or gmail");
            }
        } else {
            // El documento no existe
            console.log("El documento no existe");
            res.status(404).send("Incorrect password or gmail");
        }
    } catch (error) {
        console.error("Error al consultar:", error);
        res.status(500).send("Error al consultar");
    }
};

export const logoutUser = (req, res) => {
    try {
        res.cookie('token', "", {
            expires: new Date(0)
        })
        return res.sendStatus(200);
    } catch (error) {
        console.log(error);
    }
}

export const logoutCompany = (req, res) => {
    res.cookie('tokenCompany', "", {
        expires: new Date(0)
    })
    return res.sendStatus(200);
}

export const profileUser = async (req, res) => {
    console.log(req.body);
    const q = query(collection(db, "users"), where("email", "==", req.body.email));
    try {
        const querySnapshot = await getDocs(q);
        if (querySnapshot.size > 0) {
            const user = querySnapshot.docs[0].data();
            return res.json({
                id: user.id,
                username: user.username,
                email: user.email,
            });
        } else {
            return res.status(404).json({
                message: "User not found"
            });
        }
    } catch (error) {
        console.error("Error al consultar:", error);
        res.status(500).send("Error al consultar");
    }
}


export const profileCompany = async (req, res) => {
    console.log(req.body);
    console.log(req.company);
    const q = query(collection(db, "Company"), where("email", "==", req.company.email));
    try {
        const querySnapshot = await getDocs(q);
        if (querySnapshot.size > 0) {
            const company = querySnapshot.docs[0].data();
            return res.json({
                id: company.id,
                username: company.username,
                email: company.email,
            });
        } else {
            return res.status(404).json({
                message: "User not found"
            });
        }
    } catch (error) {
        console.error("Error al consultar:", error);
        res.status(500).send("Error al consultar");
    }
}

export const verifyToken = async (req, res) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    try {
        // Decodifica el token para obtener la información del usuario
        const decodedToken = await adminApp.auth().verifyIdToken(token);
        return res.json({
            id: decodedToken.uid,
            email: decodedToken.email,
            tokens: token
        });
    } catch (error) {
        console.error("Error al verificar el token:", error);
        return res.status(403).json({ message: "Invalid token" });
    }
}

export const imagen = async (req, res) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Unauthorized" });
    const decodedToken = await adminApp.auth().verifyIdToken(token);

    const form = new IncomingForm(); // Changed this line
    form.parse(req, (err, fields, files) => {
        const bucket = adminApp.storage().bucket('gs://marketshare-c5720.appspot.com');
        if (err) {
            console.error('Error al procesar el formulario:', err);
            res.status(500).send('Error al procesar el formulario');
            return;
        }

        const archivo = files.miArchivo; // Asegúrate de que el nombre coincida con el campo de tu formulario
        console.log("archivo: ", archivo);
        if (!archivo) {
            res.status(400).send('No se ha subido ningún archivo');
            return;
        }

        const storagePath = 'images/' + archivo[0].originalFilename; // Ruta en Firebase Storage donde se guardará el archivo
        const file = bucket.file(storagePath);
        console.log("file: ", file);
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
                    const user = auth.currentUser;
                    console.log(user);
                    if (user) {
                        // El usuario está autenticado
                        // Puedes realizar operaciones que requieran autenticación aquí
                        console.log('El usuario está autenticado. UID:', user.uid);

                        // Continúa con el proceso de actualización del documento de usuario
                        const userDocRef = doc(db, 'users', decodedToken.uid);

                        const actualizar = async () => {
                            await updateDoc(userDocRef, {
                                profileImage: url
                            });
                        }

                        actualizar();

                        res.json({
                            user: decodedToken.email,
                            imagen: url
                        });
                    } else {
                        // El usuario no está autenticado
                        // Puedes redirigirlo a la página de inicio de sesión u tomar otras medidas
                        console.log('El usuario no está autenticado. Redirige a la página de inicio de sesión.');
                        res.status(401).json({ message: "Unauthorized" });
                    }
                }
            });
        });


        localReadStream.pipe(stream);
    });
};