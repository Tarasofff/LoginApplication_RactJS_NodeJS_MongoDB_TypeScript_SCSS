import axios from 'axios'
import AxiosRetry from 'axios-retry'
import {IAuthRes} from "../models/res/AuthRes";

export const API_URL: string = `http://localhost:5000/api`

const api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})
AxiosRetry(api, {retries: 3})

api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config
})

api.interceptors.response.use((config) => {
    return config
},async (error) => {
    const originalRequest = error.config
    if (error.response.status === 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true
        try {
            const response = await axios.get<IAuthRes>(`${API_URL}/refresh`, {withCredentials: true})
            localStorage.setItem('token', response.data.accessToken)
            return api.request(originalRequest)
        } catch (e) {
            console.log('Unauthorized')
        }
    }
    throw error;
})

export default api