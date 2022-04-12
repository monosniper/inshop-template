import {$api, $server} from "../http";
import {$apiRoutes} from "../http/routes";

export default class ShopService {
    static async getProduct(id) {
        const response = await $api.get($apiRoutes.products.get(id));

        return response.data.data;
    }

    static async makeOrder(shipping_data, products) {
        return await $api.post($apiRoutes.orders.create, {
            shipping_data, products
        });
    }

    static async createShop(name, domain_id) {
        return await $api.post($apiRoutes.shops.create, {name, domain_id});
    }

    static async requestShop() {
        const response = await $api.get($apiRoutes.getMe(window.location.host.split('.')[0]));

        return response.data.data;
    }
}