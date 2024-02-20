import bcrypt from "bcryptjs";
import { createAcccessTokenCompany } from "../libs/jwt.js";
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
        userNameCompany,
        email,
        typeCompany,
        phoneNumber,
        password,
        passwordC
    } = req.body;

    try {
        // Verificar si ya existe una compañía con el mismo nombre de usuario
        const existingCompanyByUsername = await CompanyModel.findOne({ userNameCompany });
        if (existingCompanyByUsername) {
            return res.status(400).json({ message: "El nombre de usuario de la compañía ya está en uso." });
        }

        // Verificar si ya existe una compañía con el mismo nombre de compañía
        const existingCompanyByName = await CompanyModel.findOne({ companyName });
        if (existingCompanyByName) {
            return res.status(400).json({ message: "El nombre de la compañía ya está en uso." });
        }

        // Verificar si ya existe una compañía con el mismo correo electrónico
        const existingCompanyByEmail = await CompanyModel.findOne({ email });
        if (existingCompanyByEmail) {
            return res.status(400).json({ message: "El correo electrónico ya está registrado." });
        }

        // Hash de la contraseña
        const hash = await bcrypt.hash(password, 10);

        // Crear nueva compañía
        const newCompany = new CompanyModel({
            companyName,
            userNameCompany,
            email,
            typeCompany,
            phoneNumber,
            password: hash,
            profileImage: 'https://firebasestorage.googleapis.com/v0/b/marketshare-c5720.appspot.com/o/ImagenDefecto%2Fimagen_2024-01-30_210342187.png?alt=media&token=d605a2b0-61fd-4e57-9dc0-0b96efa743e2',
            rutaImage: 'gs://marketshare-c5720.appspot.com/images/ImagenDefecto%2Fimagen_2024-01-30_210342187.png'
        });

        // Guardar la nueva compañía en la base de datos
        const companySaved = await newCompany.save();

        // Respuesta exitosa
        res.json({
            companyName: companySaved.companyName,
            companyAddress: companySaved.companyAddress,
            phoneNumber: companySaved.phoneNumber,
            email: companySaved.email,
            taxIdentity: companySaved.typeCompany,
        });
    } catch (error) {
        // Manejo de errores
        res.status(500).json({ message: error.message });
    }
};

export const loginCompany = async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);
    try {
        const companyFound = await CompanyModel.findOne({ email });
        console.log(companyFound);
        if (!companyFound) {
            return res.status(400).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, companyFound.password);
        if (!isMatch) {
            return res.status(400).json({ message: "User or password incorrect" });
        }

        const tokenCompany = await createAcccessTokenCompany(companyFound._id );
        res.json({
            token: tokenCompany,
            companyName: companyFound.companyName,
            phoneNumber: companyFound.phoneNumber,
            email: companyFound.email,
            typeCompany: companyFound.typeCompany,
            profileImage: companyFound.profileImage
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const logoutCompany = (req, res) => {
    // res.cookie("tokenCompany", "", {
    //     expires: new Date(0),
    // });
    return res.sendStatus(200);
};

export const verifyTokenCompany = async (req, res) => {
    const authorizationHeader = req.headers['authorization'];
    console.log("headerVerryfy token company", req.headers);
    const token = authorizationHeader.split(' ')[1]; // Obtén solo el token, omitiendo 'Bearer'
    // const token = req.cookies.token;

    if (token === 'null') {
        return res.status(401).json({ message: "Unauthorized 1" });
    }


    // if (!token) return res.status(401).json({ message: "Unauthorized" });

    try {
        // Decodifica el token para obtener la información del usuario
        const decodedToken = jwt.decode(token);
        console.log(decodedToken);
        let id = decodedToken.id;
        const companyFound = await CompanyModel.findById({ _id: id });
        console.log(companyFound );

        return res.json({
            companyName: companyFound.companyName,
            phoneNumber: companyFound.phoneNumber,
            email: companyFound.email,
            typeCompany: companyFound.typeCompany,
            profileImage: companyFound.profileImage
        });
    } catch (error) {
        console.error("Error al verificar el token:", error);
        return res.status(403).json({ message: "Invalid token" });
    }
};