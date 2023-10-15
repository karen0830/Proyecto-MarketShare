import express from 'express';
import admin from 'firebase-admin';
import fs from 'fs';
import firebaseConfigservice from './firebase_service_account/marketshare-c5720-firebase-adminsdk-ajunu-baec284c29.json' assert { type: 'json' };

admin.initializeApp({
    credential: admin.credential.cert(firebaseConfigservice),
    storageBucket: 'gs://marketshare-c5720.appspot.com' // Reemplaza con la URL de tu Firebase Storage
});



const app = express();
const bucket = admin.storage().bucket();
console.log("Bucket: ", bucket.name);

app.post('/subir-archivo', (req, res) => {
    console.log(bucket);
    const form = new IncomingForm(); // Changed this line
    form.parse(req, (err, fields, files) => {
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
            res.send('Archivo subido exitosamente a Firebase Storage');
        });

        localReadStream.pipe(stream);
    });
});

app.listen(3000, () => {
    console.log('Servidor en ejecución en el puerto 3000');
});
