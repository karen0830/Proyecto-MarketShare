// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyCsbKik08U9g5jmkf3gyaQFnrA7KhUhXRU",
  authDomain: "marketshare-8f0d1.firebaseapp.com",
  projectId: "marketshare-8f0d1",
  storageBucket: "marketshare-8f0d1.appspot.com",
  messagingSenderId: "426468205877",
  appId: "1:426468205877:web:1eec525fa6eb2791d3987c",
  measurementId: "G-KQFHTQSK1X",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
