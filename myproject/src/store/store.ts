import {IUser} from "../models/IUser";
import {makeAutoObservable} from "mobx";
import Auth_Service from "../service/Auth_Service";
import axios from "axios"
import {API_URL} from "../API/api";
import {IAuthRes} from "../models/res/AuthRes";


export default class Store {
    user = {} as IUser
    isAuth: boolean = false


    constructor() {
        makeAutoObservable(this)
    }

    setAuth(bool: boolean) {
        this.isAuth = bool
    }

    setUser(user: IUser) {
        this.user = user
    }

    setConfirm() {
        const confirm = (document.getElementById('rules') as HTMLInputElement)
        if(!confirm.checked) {
            (document.getElementById('Step3') as HTMLButtonElement).style.display = "none"
        } else {
            (document.getElementById('Step3') as HTMLButtonElement).style.display = "inline"
        }
    }


    async login(email: string, password: string) {
        try {
            const response = await Auth_Service.login(email, password)
            console.log(response)
            localStorage.setItem('token', response.data.accessToken)
            this.setAuth(true)
            this.setUser(response.data.user)
        } catch (e) {
            console.log(e.response?.data?.message)
        }
    }

    async registration(email: string, password: string) {
        try {
            const response = await Auth_Service.registration(email, password)
            console.log(response)
            localStorage.setItem('token', response.data.accessToken)
            this.setAuth(true)
            this.setUser(response.data.user)
        } catch (e) {
            console.log(e.response?.data?.message)
        }
    }

    async logout() {
        try {
            const response = await Auth_Service.logout()
            localStorage.removeItem('token')
            this.setAuth(false)
            this.setUser({} as IUser)
        } catch (e) {
            console.log(e.response?.data?.message)
        }
    }

    async checkAuth() {
        try {
            const response = await axios.get<IAuthRes>(`${API_URL}/refresh`, {withCredentials: true})
            console.log(response)
            localStorage.setItem('token', response.data.accessToken)
            this.setAuth(true)
            this.setUser(response.data.user)
        } catch (e) {
            console.log(e.response?.data?.message)
        }
    }
}