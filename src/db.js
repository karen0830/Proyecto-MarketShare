import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const url = 'mongodb+srv://karen123:karen123@cluster0.yaxtqh3.mongodb.net/';
const connectDB = async () => {
    try {
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            writeConcern: {
                w: 'majority',
                j: true,
                wtimeout: 1000
            },
            // otras opciones...
        });
        console.log('Conexión exitosa con MongoDB');
    } catch (error) {
        console.error('Error al conectar con MongoDB:', error);
    }
};

export default connectDB;
