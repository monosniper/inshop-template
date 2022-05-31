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
    getMe: (name) => `/get-shop?domain_name=${name}`,
    user: '/user',
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
    }
}