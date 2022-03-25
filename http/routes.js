export const $routes = {
    login: '/login',
    product: (id) => `/product/${id}`,
}

export const $apiRoutes = {
    user: '/user',
    token: '/oauth/token',
    shops: {
        list: 'user/shops',
        update: (id) => `shops/${id}`,
        get: (id) => `/shops/${id}`
    }
}