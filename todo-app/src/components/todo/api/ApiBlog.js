import axios from 'axios'

export const apiBlog = axios.create(
    {
        baseURL: 'http://localhost:8001'
    }
);
