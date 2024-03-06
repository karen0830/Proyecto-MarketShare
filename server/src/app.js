import express from 'express';
import morgan from 'morgan';
import Router from '../src/router/auth.routes.js';
import cookieParser from 'cookie-parser';
import cors from "cors";
import routerCompany from './router/company.auth.routes.js';
import routerShared from './router/Shared.routes.js';
import routerProduct from './router/products.auth.routes.js';

const app = express();
// http://localhost:5173
// 'https://main--marketshare.netlify.app
 // origin: ['https://main--marketshare-ecommerce.netlify.app/', "https://main--marketshare.netlify.app"],
app.use(cors({
    origin: ['http://localhost:5173', "http://localhost:5174"],
    // origin: ['https://main--marketshare-ecommerce.netlify.app', "https://main--marketshare.netlify.app"],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Credentials', true);
    next();
});

app.use(morgan('dev'));
app.use(express.json()); // Middleware para analizar el cuerpo de las solicitudes en formato JSON
app.use(cookieParser());

// Define tus rutas y configura Express
app.use("/api", Router);
app.use("/api", routerCompany)
app.use("/api", routerShared)
app.use("/api", routerProduct)
// Redirigir desde la raíz '/' a '/login'
app.get('/', (req, res) => {
    res.redirect('/api/loginUser'); // Cambia '/api/login' por la ruta correcta de inicio de sesión
});


export default app;
