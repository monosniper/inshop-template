import {$apiRoutes} from "../http/routes";
import {$api, $api_form, $api_sanctum, $server, $server_form, API_URL, SERVER_URL} from "../http";
import axios from "axios";

export default class AuthService {
    static async login(shop_id, data) {
        return await $server.get($apiRoutes.sanctum.csrf).then(() => {
            return $api.post($apiRoutes.sanctum.token(shop_id), data).then(response => {
                const token = response.data;
                localStorage.setItem('api_token', token)

                const formData = new FormData()

                formData.append('email', data.email)
                formData.append('password', data.password)

                return $api_form.post($apiRoutes.login(shop_id), formData).then(response => {
                    if (response.status < 200 || response.status >= 300) {
                        throw new Error(response.statusText);
                    }

                    localStorage.setItem('user', JSON.stringify(response.data))
                }).catch((e) => {
                    return Promise.reject(e);
                })
            })
        });
    }

    static async refresh(token) {
        return await $api_sanctum.post($apiRoutes.refresh).then((rs) => {
            localStorage.setItem('user', JSON.stringify(rs.data))

            return rs;
        });
    }

    static async register(shop_id, data) {
        return await $server.get($apiRoutes.sanctum.csrf).then(() => {
            return $api.post($apiRoutes.register(shop_id), data).then(response => {
                if (response.status < 200 || response.status >= 300) {
                    throw new Error(response.statusText);
                }

                localStorage.setItem('user', JSON.stringify(response.data))

                return $api.post($apiRoutes.sanctum.token(shop_id), data).then(response => {
                    const token = response.data;
                    localStorage.setItem('api_token', token)
                })
            }).catch((e) => {
                return Promise.reject(e);
            })
        });
    }
}