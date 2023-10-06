import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAOE5hJzTA5O4jvAKHvaCNi8YfbdUvODIs",
  authDomain: "marketshare-c5720.firebaseapp.com",
  projectId: "marketshare-c5720",
  storageBucket: "marketshare-c5720.appspot.com",
  messagingSenderId: "502223618835",
  appId: "1:502223618835:web:dcd75e1fda77e4d0f3d0e6",
  measurementId: "G-QTSM1YVLWR"
};
// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Obtiene una instancia del servicio de autenticación de Firebase
export const auth = getAuth(app);
// Obtiene una instancia de Firestore
export const db = getFirestore(app);

// Función para conectar con Firebase
const connectFirebase = async () => {
  try {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // El usuario está autenticado
        console.log('Conexión exitosa con Firebase');
      } else {
        // El usuario no está autenticado
        console.log('Usuario no autenticado');
      }
    });
  } catch (error) {
    console.log(error);
    console.error('Error al conectar con Firebase:', error);
  }
};

export default connectFirebase;


