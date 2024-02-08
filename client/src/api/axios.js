import axios from "axios";

const instance = axios.create({
    baseURL: 'https://backend-xikq.onrender.com/api',
    withCredentials: true
})

export default instance;
// Conection 