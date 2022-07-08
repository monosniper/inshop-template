import {makeAutoObservable, toJS} from "mobx";
import ShopService from "../services/ShopService";
import store from "./store";
import constructor from "./constructor";
import {forEach} from "react-bootstrap/ElementChildren";
import {$layout} from "../utils/config";

class Shop {
    id = null
    q = ''
    products = []
    categories = null
    options = {}
    filters = {
        'category': {
            value: null,
            handler: (items, value) => {
                return items.filter(item => item.category === value)
            }
        },
        'q': {
            value: null,
            handler: (items, value) => {
                return items.filter(item => item.title.trim().toLowerCase().search(value.trim().toLowerCase()) !== -1)
            }
        },
        'price_from': {
            value: null,
            handler: (items, value) => {
                return items.filter(item => item.price >= value)
            }
        },
        'price_to': {
            value: null,
            handler: (items, value) => {
                return items.filter(item => item.price <= value)
            }
        },
        'inStock': {
            value: null,
            handler: (items, value) => {
                return items.filter(item => item.inStock <= value)
            }
        },
        'sort': {
            value: null,
            handler: (items, value) => {
                switch (value) {
                    case 'newest':
                        return items.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                    case 'cheaper':
                        return items.sort((a, b) => a.price - b.price)
                    case 'expensive':
                        return items.sort((a, b) => b.price - a.price)
                    case 'a-z':
                        return items.sort((a, b) => a.title.localeCompare(b.title))
                    case 'z-a':
                        return items.sort((a, b) => b.title.localeCompare(a.title))
                    default:
                        return items
                }
            }
        },
    }
    defaultLayout = {}

    constructor() {
        makeAutoObservable(this)

        const layout = {}
        Object.values($layout).forEach(name => {
            layout[name] = true
        })
        this.setDefaultLayout(layout)
    }

    setDefaultLayout(layout) {
        this.defaultLayout = layout;
    }

    setId(id) {
        this.id = id;
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

            if(Array.isArray(data.options.layout) && !data.options.layout.length) {
                this.setLayout(this.defaultLayout);
            }
        }

        return data;
    }

    async requestProducts() {
        const rs = await ShopService.getProducts(this.id);

        this.setProducts(rs)

        return rs;
    }

    setFilter(name, value) {
        const newFilters = {...this.filters}
        newFilters[name].value = value
        this.filters = newFilters
    }

    getFilteredProducts() {
        let filtered_products = [...this.products]
        console.log(toJS(filtered_products), Object.entries(this.filters))
        Object.entries(this.filters).forEach(([name, filter]) => {
            if(filter.value) filtered_products = filter.handler(filtered_products, filter.value)
        })

        return filtered_products
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