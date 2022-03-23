import {$api, $server} from "../http";
import {$apiRoutes} from "../http/routes";

export default class UserService {
    static async requestUser() {
        const response = await $api.get($apiRoutes.user);

        return response.data;
    }

    static async requestAccessToken(code) {
        const response = await $server.post($apiRoutes.token, {
            client_id: process.env.NEXT_PUBLIC_OAUTH_CLIENT_ID,
            client_secret: process.env.NEXT_PUBLIC_OAUTH_CLIENT_SECRET,
            redirect_uri: process.env.NEXT_PUBLIC_OAUTH_CLIENT_REDIRECT_URI,
            grant_type: 'authorization_code',
            code
        })

        return response.data.access_token;
    }

    static async requestShops() {
        const response = await $api.get($apiRoutes.shops.list);

        return response.data;
    }
}