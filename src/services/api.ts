import axios, { AxiosInstance } from 'axios';
import userStore from '@/store/user';

const api: AxiosInstance = axios.create({
    baseURL: 'http://localhost:7070/api/v1',
});

export default api;