import axios from "axios";

const api = axios.create({
    //baseURL: '/api',
    baseURL: 'http://localhost:8000/api',
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type' : 'application/json',
        'Accept': 'application/json',
     },
    withCredentials: true
});

export default api;