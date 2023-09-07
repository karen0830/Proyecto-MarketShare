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

export default app;
