import axios from 'axios';
import { getToken } from '../utils/common';

const baseURL = 'http://localhost:3000';
const authorizationToken = getToken();

const axiosClient = axios.create({
    baseURL,
    headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${authorizationToken}`
    }
})

export default axiosClient;