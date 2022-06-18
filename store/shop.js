import {makeAutoObservable, toJS} from "mobx";
import ShopService from "../services/ShopService";
import store from "./store";
import constructor from "./constructor";

class Shop {
    id = null
    q = ''
    products = []
    categories = null
    options = {}

    constructor() {
        makeAutoObservable(this)
    }

    setId(id) {
        this.id = id
    }

    setOptions(options) {
        this.options = options;
    }

    setProducts(products) {
        this.products = products
    }

    setCategories(categories) {
        this.categories = categories
    }

    async requestData() {
        const data = await ShopService.requestShop();

        if(data) {
            this.setCategories(data.categories);
            this.setOptions(data.options);
            this.setId(data.id);
        }

        return data;
    }

    async requestProducts() {
        const rs = await ShopService.getProducts(this.id);

        this.setProducts(rs)

        return rs;
    }

    async makeOrder(shipping_data, products) {
        const response = await ShopService.makeOrder(shipping_data, products)

        return response.status
    }

    getProduct(id) {
        return this.products.find(product => product.id+'' === id+'')
    }
}

export default new Shop()