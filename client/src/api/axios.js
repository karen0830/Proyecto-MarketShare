import axios from "axios";

const instance = axios.create({
    baseURL: 'https://backend-bql1.onrender.com/api',
    withCredentials: true
})

export default instance;