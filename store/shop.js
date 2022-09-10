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
    domain = ''
    modules = []
    options = {}
    layout = []
    colors = []
    banners = []
    social_networks = []
    custom_pages = []
    reviews = []
    logo_url = ''
    logo_name = ''
    filters = {
        'category': {
            value: null,
            handler: (items, value) => {
                console.log(items, value)
                return items.filter(item => item.category_id === value)
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
                return items.filter(item => {
                    console.log(item.inStock, value)
                    return false
                })
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

    constructor() {
        makeAutoObservable(this)
    }

    setLayout(layout) {
        this.layout = layout;
    }

    setId(id) {
        this.id = id;
    }

    setLogoUrl(logo_url) {
        this.logo_url = logo_url;
    }

    setLogoName(logo_name) {
        this.logo_name = logo_name;
    }

    setOptions(options) {
        this.options = options;
    }

    setCustomPages(custom_pages) {
        this.custom_pages = custom_pages;
    }

    setReviews(reviews) {
        this.reviews = reviews;
    }

    setBanners(banners) {
        this.banners = banners;
    }

    setColors(colors) {
        this.colors = colors;
    }

    setProducts(products) {
        this.products = products
    }

    setCategories(categories) {
        this.categories = categories
    }

    setModules(modules) {
        this.modules = modules
    }

    setDomain(domain) {
        this.domain = domain
    }

    setSocialNetworks(social_networks) {
        this.social_networks = social_networks
    }

    async requestData() {
        const data = await ShopService.requestShop();

        if(data) {
            this.setProducts(data.products);
            this.setCategories(data.categories);
            this.setModules(data.modules);
            this.setOptions(data.options);
            this.setLayout(data.layout);
            this.setDomain(data.domain);
            this.setId(data.id);
            this.setColors(data.colors);
            this.setSocialNetworks(data.social_networks);
            this.setBanners(data.banners);
            this.setCustomPages(data.custom_pages);
            this.setReviews(data.reviews);
            this.setLogoUrl(data.logo_url);
            this.setLogoName(data.logo_name);
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

        Object.entries(this.filters).forEach(([name, filter]) => {
            if(filter.value) filtered_products = filter.handler(filtered_products, filter.value)
        })

        return filtered_products
    }

    async makeOrder(shipping_data, products) {
        const response = await ShopService.makeOrder(this.id, shipping_data, products)

        return response.data
    }

    getInstagramLink() {
        const network = this.social_networks.find(network => network.slug === 'instagram')
        return network ? network.value : '#'
    }

    getProduct(id) {
        return this.products.find(product => product.id+'' === id+'')
    }

    getCustomPage(slug) {
        return this.custom_pages.find(page => page.slug === slug)
    }
}

export default new Shop()