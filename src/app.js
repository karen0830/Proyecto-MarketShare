import express from 'express';
import morgan from 'morgan';
import Router from '../src/router/auth.routes.js';
import cookieParser from 'cookie-parser';
import cors from "cors";
const app = express();

app.use(cors())
app.use(morgan('dev'));
app.use(express.json()); // Middleware para analizar el cuerpo de las solicitudes en formato JSON
app.use(cookieParser());
app.use("/api", Router);

// Redirigir desde la raíz '/' a '/login'
app.get('/', (req, res) => {
    res.redirect('/api/login'); // Cambia '/api/login' por la ruta correcta de inicio de sesión
});

export default app;
