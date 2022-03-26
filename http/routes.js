export const $routes = {
    register: '/register',
    login: '/login',
    product: (id) => `/product/${id}`,
}

export const $apiRoutes = {
    user: '/user',
    products: {
        list: 'shops/{shop_id}/products',
        update: (id) => `shops/{shop_id}/products/${id}`,
        get: (id) => `shops/{shop_id}/products/${id}`
    }
}