export const $routes = {
    index: '/',
    register: '/register',
    login: '/login',
    undefined: '/undefined',
    basket: '/basket',
    checkout: '/checkout',
    successOrder: '/checkout/success',
    product: (id) => `/product/${id}`,
}

export const $apiRoutes = {
    getMe: (token) => `/me?token=${token}`,
    getShop: (name) => `/get-shop?domain_name=${name}`,
    user: '/user',
    login: (shop_id) => `/shops/${shop_id}/login`,
    register: (shop_id) => `/shops/${shop_id}/register`,
    refresh: `/shops/refresh`,
    products: {
        list: (shop_id) => `shops/${shop_id}/products`,
        update: (shop_id, id) => `shops/${shop_id}/products/${id}`,
        get: (shop_id, id) => `shops/${shop_id}/products/${id}`
    },
    orders: {
        create: (shop_id) => `shops/${shop_id}/orders`,
        get: (shop_id, id) => `shops/${shop_id}/orders/${id}`
    },
    shops: {
        create: 'shops',
    },
    basket: {
        // list: (shop_id, basket_id) => `shops/${shop_id}/basket`,
        list: (shop_id, basket_id) => `shops/${shop_id}/basket/${basket_id}`,
        update: (shop_id, basket_id) => `shops/${shop_id}/basket/${basket_id}`,
        // add: '/user/basket/add',
        // remove: (item_id) => `/user/basket/remove/${item_id}`,
    },
    sanctum: {
        csrf: `sanctum/csrf-cookie`,
        token: (shop_id) => `shops/${shop_id}/sanctum/token`,
    }
}