import {makeAutoObservable, toJS} from "mobx";
import UserService from "../services/UserService";
import ShopService from "../services/ShopService";

class Store {
    user = null;
    shop_id = null;
    options = {
        title: '',
        subtitle: '',
    };
    localStorage = {
        token: 'token',
        user: 'user',
        shops: 'shops',
    }
    shops = []

    constructor() {
        makeAutoObservable(this)
    }

    setOptions(options) {
        this.options = {...this.options, ...options};
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

    setShopId(id) {
        this.shop_id = id
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

    async requestShop() {
        const data = await ShopService.requestShop();

        if(data.options && data.id) {
            this.setOptions(data.options);
            this.setShopId(data.id);
        }

        return data;
    }

    async requestShops() {
        const shops = await UserService.requestShops();

        localStorage.setItem(this.localStorage.shops, JSON.stringify(shops));
        this.setShops(shops);

        return shops;
    }

    async getProduct(id) {
        const product = await ShopService.getProduct(id);

        return product;
    }
}

export default new Store()