import api from "../API/api";
import {AxiosResponse} from 'axios';
import {IUser} from "../models/IUser";


export default class User_Service {
    static findUsers(): Promise<AxiosResponse<IUser[]>> {
        return api.get<IUser[]>('/users')
    }
}