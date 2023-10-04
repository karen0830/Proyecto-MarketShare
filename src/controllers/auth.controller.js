import CompanyModel from '../models/company.models.js'
import User from '../models/user.models.js'
import bcrypt from 'bcryptjs'
import multer from 'multer'
import Jwt from 'jsonwebtoken'
import { TOKEN_SECRET } from '../config.js'
import { createAcccessToken } from '../libs/jwt.js'
import path from 'path';

export const registerCompany = async (req, res) => {
    const { companyName, legalEntity, companyAddress, activityDescription, phoneNumber, email, taxIdentity, password } = req.body;

    const queries = [];
    if (email) queries.push({ email });
    if (companyName) queries.push({ companyName });
    if (legalEntity) queries.push({ legalEntity });
    if (phoneNumber) queries.push({ phoneNumber });
    if (taxIdentity) queries.push({ taxIdentity });

    if (queries.length === 0) {
        // Ningún campo válido proporcionado en la solicitud
        return res.status(400).json(['No valid fields provided']);
    }

    console.log(queries);
    // Realiza las consultas solo para los campos válidos
    const results = await Promise.all(queries.map(query => CompanyModel.findOne(query)));

    // Verifica los resultados y envía una respuesta apropiada
    if (results.some(result => result)) {
        return res.status(400).json(['One or more fields are already in use']);
    }

    // Si no se encontraron coincidencias, continúa con la lógica deseada
    // ...

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
export const register = async (req, res) => {
    const { email, username, password } = req.body;
    try {

        const userFound = await User.findOne({ email })
        if (userFound) return res.status(400).json(
            ['The email is already in use']
        )

        const hash = await bcrypt.hash(password, 10)
        const newUser = new User({
            username,
            email,
            password: hash,
        })

        const userSaved = await newUser.save();
        // const token = await createAcccessToken({ id: userSaved._id })

        // res.cookie("token", token)
        res.json({
            id: userSaved._id,
            username: userSaved.username,
            email: userSaved.email,
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

export const login = async (req, res) => {
    console.log(req.body);
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

        const token = await createAcccessToken({ id: userFound._id });

        res.cookie("token", token);
        console.log(token);
        res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

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

export const profile = async (req, res) => {
    const userFound = await User.findById(req.user.id)

    if (!userFound) return res.status(400).json({
        message: "User not found"
    })

    return res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
        createdAt: userFound.creatdAte,
        updatedAt: userFound.updatedAt,
    })
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