import express from 'express';
import morgan from 'morgan';
import Router from '../src/router/auth.routes.js';
import cookieParser from 'cookie-parser';
import cors from "cors";
import axios from 'axios'

const app = express();

let corsOptions = {
    origin: 'https://maket-share.netlify.app',
    credentials: true
}

app.use(cors(corsOptions));
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Credentials', true);
});



app.use(morgan('dev'));
app.use(express.json()); // Middleware para analizar el cuerpo de las solicitudes en formato JSON
app.use(cookieParser());


// Define tus rutas y configura Express
app.use("/api", Router);

// Redirigir desde la raíz '/' a '/login'
app.get('/', (req, res) => {
    res.redirect('/api/loginUser'); // Cambia '/api/login' por la ruta correcta de inicio de sesión
});

export default app;
