export const $routes = {
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
        list: 'shops/{shop_id}/products',
        update: (id) => `shops/{shop_id}/products/${id}`,
        get: (id) => `shops/{shop_id}/products/${id}`
    },
    orders: {
        create: 'shops/{shop_id}/orders',
        get: (id) => `shops/{shop_id}/orders/${id}`
    },
    shops: {
        create: 'shops',
    }
}