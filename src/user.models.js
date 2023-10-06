import { createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore"; 
import { auth } from "./firebase";

// Inicializa Auth y Firestore
const db = getFirestore();

// Función para registrar un nuevo usuario
export const UserFirebase = async (email, password, username) => {
  try {
    // Crea un nuevo usuario con correo electrónico y contraseña
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Crea un "documento" para el usuario en Firestore
    await setDoc(doc(db, 'users', user.uid), {
      username: username,
      email: email,
      profileImage: '/default-profile-image.jpg',
      // puedes agregar más campos aquí...
    });

    console.log('Usuario registrado con éxito');
    return user
  } catch (error) {
    console.error('Error al registrar al usuario:', error);
  }
};