import axios from "axios";

const instance = axios.create({
    baseURL: 'https://backend-pp8i.onrender.com/api',
    withCredentials: true
})

export default instance;