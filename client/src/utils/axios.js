import axios from 'axios';


export const BASE_URL = `${import.meta.env.VITE_SERVER_URL}/api`;


const token = localStorage.getItem('musico_token');

const headers = {}


if(token) {
    headers['Authorization'] = `Bearer ${token}`
}


console.log({token}, {headers})


const api = axios.create({
        baseURL: BASE_URL,
        headers,
})


export default api