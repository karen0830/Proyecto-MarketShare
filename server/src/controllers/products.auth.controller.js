import { adminApp } from "../firebase.js";
import { ref, getStorage, deleteObject } from "firebase/storage";
import { IncomingForm } from "formidable";
import fs from "fs";
import User from "../models/user.models.js";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";
import mongoose from 'mongoose'
import CompanyModel from "../models/company.models.js";

export const addProduct = async (req, res) => {
    const form = new IncomingForm(); // Changed this line
    form.parse(req, (err, fields, files) => {
        const nameProduct = fields.productName[0];
        const description = fields.description[0];
        const price = fields.price[0];
        console.log("fields " ,fields);
        console.log(nameProduct, " ", description, " ", price);
        const bucket = adminApp
            .storage()
            .bucket("gs://marketshare-c5720.appspot.com");
        if (err) {
            console.error("Error al procesar el formulario:", err);
            res.status(500).send("Error al procesar el formulario");
            return;
        }

        const archivo = files.product; // Asegúrate de que el nombre coincida con el campo de tu formulario
        if (!archivo) {
            res.status(400).send("No se ha subido ningún archivo");
            return;
        }
        console.log(archivo[0]);
        const storagePath = "products/" + archivo[0].newFilename + archivo[0].originalFilename; // Ruta en Firebase Storage donde se guardará el archivo
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

                    if (token === 'null') return res.status(401).json({ message: "Unauthorized" });

                    const result = async () => {
                        const id = decodedToken.id;
                        const userFound = await CompanyModel.findOne({ _id: id });
                        console.log(userFound);
                        try {
                            await CompanyModel.updateOne(
                                { _id: decodedToken.id },
                                {
                                    $push: {
                                        products: {
                                            type: "img",
                                            url: url,
                                            nameProduct: nameProduct,
                                            description: description,
                                            price: price,
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

                    let id = decodedToken.id;
                    const userFoundM = async () => {
                        const userFound = await CompanyModel.findOne({ _id: id });

                        return res.json({
                            products: userFound.products
                        });
                    };

                    userFoundM();
                }
            });
        });
        localReadStream.pipe(stream);
    });
};

