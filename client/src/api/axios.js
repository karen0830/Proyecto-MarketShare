import axios from "axios";

const instance = axios.create({
    baseURL: 'https://backend-kbo5.onrender.com/api',
    withCredentials: true
})

export default instance;