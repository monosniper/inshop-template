import {makeAutoObservable, toJS} from "mobx";
import ShopService from "../services/ShopService";
import store from "./store";
import constructor from "./constructor";

class Shop {
    id = null
    q = ''
    filters = {
        sort: 'newest',
        inStock: true,
        price_from: 0,
        price_to: 0,
    }
    products = [
        {
            id: 1,
            title: 'Air Max pegasus 37',
            subtitle: 'Men’s Running shoe',
            price: 129,
            inStock: true,
            created_at: ''
        },
        {
            id: 1,
            title: 'Air Max pegasus 37',
            subtitle: 'Men’s Running shoe',
            price: 129,
        },
        {
            id: 1,
            title: 'Air Max pegasus 37',
            subtitle: 'Men’s Running shoe',
            price: 129,
        },
        {
            id: 1,
            title: 'Air Max pegasus 37',
            subtitle: 'Men’s Running shoe',
            price: 129,
        },
        {
            id: 1,
            title: 'Air Max pegasus 37',
            subtitle: 'Men’s Running shoe',
            price: 129,
        },
        {
            id: 1,
            title: 'Air Max pegasus 37',
            subtitle: 'Men’s Running shoe',
            price: 129,
        },
        {
            id: 1,
            title: 'Air Max pegasus 37',
            subtitle: 'Men’s Running shoe',
            price: 129,
        },
        {
            id: 1,
            title: 'Air Max pegasus 37',
            subtitle: 'Men’s Running shoe',
            price: 129,
        },
        {
            id: 1,
            title: 'Air Max pegasus 37',
            subtitle: 'Men’s Running shoe',
            price: 129,
        },
        {
            id: 1,
            title: 'Air Max pegasus 37',
            subtitle: 'Men’s Running shoe',
            price: 129,
        },
        {
            id: 1,
            title: 'Air Max pegasus 37',
            subtitle: 'Men’s Running shoe',
            price: 129,
        },
        {
            id: 1,
            title: 'Air Max pegasus 37',
            subtitle: 'Men’s Running shoe',
            price: 129,
        },
    ]
    categories = null
    options = {}

    constructor() {
        makeAutoObservable(this)
    }

    getModules() {
        let modules = this.options.modules

        if(modules) {
            modules = [...modules.entries()].map(entry => entry[1])

            return modules
        }

        return [];
    }

    hasModule(name) {
        return  this.getModules().indexOf(name) !== -1;
    }

    isOwnPalette() {
        return this.isPalette(this.options.ownPalette, this.options.palette)
    }

    getPalette() {
        let storePalette = this.options.palette

        if(storePalette) {
            storePalette = [...storePalette.entries()].map(entry => entry[1])

            return storePalette
        }

        return [];
    }

    isPalette(palette) {
        function arrayEquals(a, b) {
            return Array.isArray(a) &&
                Array.isArray(b) &&
                a.length === b.length &&
                a.every((val, index) => val === b[index]);
        }

        return arrayEquals(this.getPalette(), palette)
    }

    hasUpdates() {
        const oldData = JSON.stringify(this.oldOptions)
        const currentData = JSON.stringify(this.options)

        return currentData !== oldData
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

    setOldOption(options) {
        this.oldOptions = options;
    }

    async requestData() {
        const data = await ShopService.requestShop();

        if(data) {
            console.log(data.categories)
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