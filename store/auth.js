import {makeAutoObservable} from "mobx";
import {showError} from "../utils/showError";
import AuthService from "../services/AuthService";
import shop from "./shop";
import {showMessage} from "../utils/showMessage";
import {$messages} from "../utils/messages";

class Auth {
    isAuthorized = false
    isLoginOpen = false
    isRegisterOpen = false
    data = {
        id: '',
        email: '',
        name: '',
        phone: '',
        address: '',
        basket_id: null,
    }
    localStorage = {
        user_data: 'user',
        api_token: 'api_token'
    }

    constructor() {
        makeAutoObservable(this)
    }

    openLogin() {
        this.isLoginOpen = true;
        this.isRegisterOpen = false;
    }

    closeLogin() {
        this.isLoginOpen = false;
    }

    openRegister() {
        this.isRegisterOpen = true;
        this.isLoginOpen = false;
    }

    closeRegister() {
        this.isRegisterOpen = false;
    }

    refresh() {
        const user_data = localStorage.getItem(this.localStorage.user_data);
        const api_token = localStorage.getItem(this.localStorage.api_token);

        if(user_data) {
            this.setIsAuthorized(true)
            this.setData(JSON.parse(user_data))
        }

        api_token && this.loadUserByToken(api_token);
    }

    async loadUserByToken(token) {
        try {
            const rs = await AuthService.refresh(token)

            this.setIsAuthorized(true)
            this.setData(rs.data)

            return rs;
        } catch (e) {
            e && e.response && showError(e.response.data.message)
        }
    }

    async register(data) {
        try {
            const rs = await AuthService.register(shop.id, data)

            this.setIsAuthorized(true)
            this.setData(rs)
            console.log(rs)

            showMessage($messages.registered)

            return rs;
        } catch (e) {
            e && e.response && showError(e.response.data.message)
        }
    }

    async login(data) {
        try {
            const rs = await AuthService.login(shop.id, data)

            this.setIsAuthorized(true)
            this.setData(rs)

            showMessage($messages.loggedIn)

            return rs;
        } catch (e) {
            e && e.response && showError(e.response.data.message)
        }
    }

    setIsAuthorized(b) {
        this.isAuthorized = b
    }

    setData(data) {
        this.data = data
    }

    getName() {
        return this.data && this.data.fio !== '' ? this.data.fio : this.data.email;
    }
}

export default new Auth()