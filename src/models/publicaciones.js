import mongoose from 'mongoose'

const publicacion = new mongoose.Schema(
    {
      contenido: {
        type: String,
        default: "esta es una publicacion",
      },
    },
    { timestamps: true }
  );
  export default mongoose.model("publicaciones", publicacion);