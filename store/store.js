import {makeAutoObservable} from "mobx";
import UserService from "../services/UserService";

class Store {
    user = null;
    localStorage = {
        token: 'token',
        user: 'user',
        shops: 'shops',
    }
    shops = []

    constructor() {
        makeAutoObservable(this)
    }

    getShops() {
        let shops = this.shops

        if(shops) {
            shops = [...shops.entries()].map(entry => entry[1])

            return shops
        }

        return [];
    }

    setUser(user) {
        this.user = user
    }

    setShops(shops) {
        this.shops = shops;
    }

    setShopData(id, options) {
        const newShops = this.getShops()

        newShops.map(shop => {
            if(shop.id === id) shop.options = options;
        })

        this.shops = newShops;
    }

    async requestAccessToken(code) {
        const access_token = await UserService.requestAccessToken(code);

        localStorage.setItem(this.localStorage.token, access_token);

        return access_token;
    }

    async requestUser() {
        const user = await UserService.requestUser();

        localStorage.setItem(this.localStorage.user, JSON.stringify(user));
        this.setUser(user);

        return user;
    }

    async requestShops() {
        const shops = await UserService.requestShops();

        localStorage.setItem(this.localStorage.shops, JSON.stringify(shops));
        this.setShops(shops);

        return shops;
    }
}

export default new Store()