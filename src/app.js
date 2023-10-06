import express from 'express';
import morgan from 'morgan';
import Router from '../src/router/auth.routes.js';
import cookieParser from 'cookie-parser';
import cors from "cors";
const app = express();

app.use(cors({
    origin: 'http://localhost:5173', // reemplaza 'http://localhost:3000' con la URL de tu aplicación frontend
    credentials: true
}));
// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "http://localhost:5173");
//     next();
// });
app.use(morgan('dev'));
app.use(express.json()); // Middleware para analizar el cuerpo de las solicitudes en formato JSON
app.use(cookieParser());

// Define tus rutas y configura Express
app.use("/api", Router);


// Redirigir desde la raíz '/' a '/login'
app.get('/', (req, res) => {
    res.redirect('/api/login'); // Cambia '/api/login' por la ruta correcta de inicio de sesión
});

export default app;
