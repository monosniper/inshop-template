export const $routes = {
    login: '/login',
    shop: (id) => `/constructor/${id}`
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