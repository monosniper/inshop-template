import {makeAutoObservable, toJS} from "mobx";
import ShopService from "../services/ShopService";
import store from "./store";
import constructor from "./constructor";
import {forEach} from "react-bootstrap/ElementChildren";
import {$layout} from "../utils/config";
import auth from "./auth";

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
    total = 0
    reviews = []
    selectedProperties = {}
    logo_url = ''
    logo_name = ''
    filter_handlers = {
        'category': {
            value: null,
            handler: (items, value) => {
                return items.filter(item => item.category_id === parseInt(value))
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
                return items.filter(item => item.price >= parseInt(value))
            }
        },
        'price_to': {
            value: null,
            handler: (items, value) => {
                return items.filter(item => item.price <= parseInt(value))
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
                        return items.sort((a, b) => a.discount_price - b.discount_price)
                    case 'expensive':
                        return items.sort((a, b) => b.discount_price - a.discount_price)
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

    setTotal(total) {
        this.total = total
    }

    setSelectedProps(data) {
        this.selectedProperties = data;
    }

    setModules(modules) {
        this.modules = modules
    }

    setDomain(domain) {
        this.domain = domain
    }

    setFilters(filters) {
        this.filters = filters
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
            this.setFilters(data.filters);
        }

        return data;
    }

    async requestProducts() {
        const rs = await ShopService.getProducts(this.id);

        this.setProducts(rs)

        return rs;
    }

    setFilter(name, value) {
        const newFilters = {...this.filter_handlers}
        newFilters[name].value = value
        this.filter_handlers = newFilters
    }

    getFilter(name) {
        return this.filter_handlers[name].value
    }

    getFilteredProducts() {
        // this.setFilterLoading(true)
        let filtered_products = [...this.products]

        Object.entries(this.filter_handlers).forEach(([name, filter]) => {
            if(filter.value) filtered_products = filter.handler(filtered_products, filter.value)
        })

        // this.setFilterLoading(false)

        return filtered_products
    }

    async makeOrder(billId, shipping_data, products, promocode) {
        const response = await ShopService.makeOrder(this.id, {billId, shipping_data, products, promocode, client_id: auth.data.id})

        return response.data
    }

    async checkPromo(code) {
        return await ShopService.checkPromo(this.id, code, auth.data.id)
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