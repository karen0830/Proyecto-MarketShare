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
        email,
        typeCompany,
        phoneNumber,
        password,
        passwordC
    } = req.body;

    try {
        const hash = await bcrypt.hash(password, 10);
        const newCompany = new CompanyModel({
            companyName,
            email,
            typeCompany,
            phoneNumber,
            password: hash,
        });

        const companySaved = await newCompany.save();
        res.json({
            companyName: companySaved.companyName,
            companyAddress: companySaved.companyAddress,
            phoneNumber: companySaved.phoneNumber,
            email: companySaved.email,
            taxIdentity: companySaved.typeCompany,
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

        const tokenCompany = await createAcccessTokenCompany(companySaved._id );
        console.log(tokenCompany);
        res.cookie("tokenCompany", tokenCompany);
        res.json({
            companyName: companyFound.companyName,
            companyAddress: companyFound.companyAddress,
            phoneNumber: companyFound.phoneNumber,
            email: companyFound.email,
            taxIdentity: companyFound.typeCompany,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
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

export const logoutCompany = (req, res) => {
    res.cookie("tokenCompany", "", {
        expires: new Date(0),
    });
    return res.sendStatus(200);
};