import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
    password:{
        type: String,
        required: true,
    },
    profileImage: {
        type: String, // Puedes usar String para almacenar la URL de la imagen
        default: '/default-profile-image.jpg' // Opcional: una imagen predeterminada si no se proporciona una URL
    },
    rutaImagen: {
        type: String, // Puedes usar String para almacenar la URL de la imagen
        default: '/default-profile-image.jpg' // Opcional: una imagen predeterminada si no se proporciona una URL
    },
}, {
    timestamps: true
})

export default mongoose.model('User', userSchema)