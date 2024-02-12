import axios from "axios";
// https://backend-ve18.onrender.com/api
const instance = axios.create({
    baseURL: 'https://backend-ve18.onrender.com/api',
    withCredentials: true
})

// http://localhost:4000/api

export default instance;
