import CompanyModel from '../models/company.models.js'
import User from '../models/user.models.js'
import bcrypt from 'bcryptjs'
import Jwt from 'jsonwebtoken'
import { TOKEN_SECRET } from '../config.js'
import { createAcccessToken } from '../libs/jwt.js'

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
        const token = await createAcccessToken({ id: userSaved._id })

        res.cookie("token", token)
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
    const {token} = req.cookies
    if (!token) return res.status(401).json({message: "Unauthorized"})
    
    Jwt.verify(token, TOKEN_SECRET, async (err, user)=> {
        if (err) return res.status(401).json({message: "Unauthorized"})

        const userFound = await User.findById(user.id)
        if(!userFound) return res.status(401).json({message: "Unauthorized"})

        return res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email
        })
    })
}