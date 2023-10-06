import CompanyModel from '../models/company.models.js'
import bcrypt from 'bcryptjs'
import multer from 'multer'
import Jwt from 'jsonwebtoken'
import { TOKEN_SECRET } from '../config.js'
import { createAcccessToken } from '../libs/jwt.js'
import path from 'path';
import { fetchSignInMethodsForEmail } from 'firebase/auth';
import { auth, db } from '../firebase.js';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc, query, collection, where, getDocs } from "firebase/firestore";

// Función para registrar un nuevo usuario
export const registerUser = async (req, res) => {
    const { email, username, password } = req.body;
    try {
        // Hashea la contraseña
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
        res.status(500).json({ message: error.message });
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

                // Generar un token JWT
                const token = Jwt.sign({ email: user.email }, TOKEN_SECRET, { expiresIn: '1h' });

                // Enviar el token en una cookie
                res.cookie("token", token, { httpOnly: true, maxAge: 3600000 }); // MaxAge de 1 hora
                console.log("Contraseña válida");
                console.log(querySnapshot.docs)
                return res.json({
                    id: user.id,
                    username: user.username,
                    email: user.email
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



// export const login = async (req, res) => {
//     console.log(req.body);
//     const { email, password } = req.body;
//     try {
//        fetchSignInMethodsForEmail(auth, email)
//   .then((signInMethods) => {
//     // Si signInMethods.length > 0, entonces el correo electrónico ya está en uso
//     if (signInMethods.length > 0) {
//       console.log(`El correo electrónico ${email} ya está en uso`);
//     } else {
//       console.log(`El correo electrónico ${email} no está en uso`);
//     }
//   })
//   .catch((error) => {
//     console.error(error);
//   });
//         // const userFound = await User.findOne({ email });

//         // if (!userFound) {
//         //     return res.status(400).json({ message: "User not found" });
//         // }

//         // const isMatch = await bcrypt.compare(password, userFound.password);
//         // if (!isMatch) {
//         //     return res.status(400).json({ message: "User or password incorrect" });
//         // }

//         // const token = await createAcccessToken({ id: userFound._id });

//         // res.cookie("token", token);
//         // console.log(token);
//         // res.json({
//         //     id: userFound._id,
//         //     username: userFound.username,
//         //     email: userFound.email,
//         //     createdAt: userFound.createdAt,
//         //     updatedAt: userFound.updatedAt
//         // });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

export const logout = (req, res) => {
    res.cookie('token', "", {
        expires: new Date(0)
    })
    return res.sendStatus(200);
}

export const logoutC = (req, res) => {
    res.cookie('tokenCompany', "", {
        expires: new Date(0)
    })
    return res.sendStatus(200);
}

export const profileUser = async (req, res) => {
    console.log(req.user);
    const q = query(collection(db, "users"), where("email", "==", req.user.email));
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
    const { token } = req.cookies
    if (!token) return res.status(401).json({ message: "Unauthorized" })

    Jwt.verify(token, TOKEN_SECRET, async (err, user) => {
        if (err) return res.status(401).json({ message: "Unauthorized" })

        const userFound = await User.findById(user.id)
        if (!userFound) return res.status(401).json({ message: "Unauthorized" })

        return res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email
        })
    })
}


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'src/uploads/'); // Directorio donde se guardarán los archivos
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const extension = path.extname(file.originalname); // Obtiene la extensión del archivo original
        const fileName = 'profile-' + uniqueSuffix + extension;
        cb(null, fileName);
    },
});

export const upload = multer({ storage: storage });

// export const profileUpload = async (req, res) => {
//     // const userFound = await User.findById(req.user.id)
//     console.log(req.body);
//     // if (!userFound) return res.status(400).json({
//     //     message: "User not found"
//     // })

//     // try {
//     //     console.log(req.body);
//     //     const userFound = await User.findById(req.body.id)
//     //     console.log(userFound);
//     //     if (!userFound) {
//     //         return res.status(400).json({
//     //             message: "User not found"
//     //         });
//     //     }

//     //     // Verifica si se ha enviado un archivo
//     //     if (!req.file) {
//     //         return res.status(400).json({
//     //             message: "No file uploaded"
//     //         });
//     //     }

//     //     // Actualiza el campo profileImage con la URL del archivo cargado
//     //     userFound.profileImage = req.file.path;

//     //     // Guarda el usuario actualizado en la base de datos
//     //     await userFound.save();

//     //     // Responde con un mensaje de éxito
//     //     res.json({ message: 'Archivo subido con éxito' });
//     // } catch (error) {
//     //     console.log(error);
//     //     res.status(500).json({ message: error.message });
//     // }
// };

// Función profileUpload para obtener el ID del usuario
export const profileUpload = async (req, res) => {
    const { token } = req.cookies;
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    try {
        const decoded = Jwt.verify(token, TOKEN_SECRET);
        const userFound = await User.findById(decoded.id);
        console.log(decoded);
        if (!userFound) return res.status(401).json({ message: "Unauthorized" });
        // Accede a los datos enviados en el cuerpo de la solicitud
        const imagePath = req.file.path;
        console.log(imagePath);
        // Si llegamos aquí, la autenticación fue exitosa y tenemos los datos del usuario.
        return res.json({
            id: userFound._id, // Devuelve el ID del usuario junto con otros datos.
            username: userFound.username,
            email: userFound.email,
        });
    } catch (err) {
        // Si hay un error en la verificación del token, devolvemos una respuesta de Unauthorized.
        return res.status(401).json({ message: "Unauthorized" });
    }
};