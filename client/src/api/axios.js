import axios from "axios";

const instance = axios.create({
    baseURL: 'https://backend-ve18.onrender.com//api',
    withCredentials: true
})

export default instance;
