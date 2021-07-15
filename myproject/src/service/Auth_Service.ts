import api from "../API/api";
import {AxiosResponse} from 'axios';
import {IAuthRes} from "../models/res/AuthRes";

export default class Auth_Service {
    static async login(email: string, password: string): Promise<AxiosResponse<IAuthRes>> {
        return api.post<IAuthRes>('/login', {email, password})
    }

    static async registration(email: string, password: string): Promise<AxiosResponse<IAuthRes>> {
        return api.post<IAuthRes>('/registration', {email, password})
    }

    static async logout(): Promise<void> {
        return api.post('/logout')
    }
}