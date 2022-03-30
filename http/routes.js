export const $routes = {
    register: '/register',
    login: '/login',
    basket: '/basket',
    checkout: '/checkout',
    successOrder: '/checkout/success',
    product: (id) => `/product/${id}`,
}

export const $apiRoutes = {
    getMyId: '/get-shop-id',
    user: '/user',
    products: {
        list: 'shops/{shop_id}/products',
        update: (id) => `shops/{shop_id}/products/${id}`,
        get: (id) => `shops/{shop_id}/products/${id}`
    },
    orders: {
        create: 'shops/{shop_id}/orders',
        get: (id) => `shops/{shop_id}/orders/${id}`
    }
}