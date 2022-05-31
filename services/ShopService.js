import {$api, $server} from "../http";
import {$apiRoutes} from "../http/routes";
import {showError} from "../utils/showError";
import {showMessage} from "../utils/showMessage";
import {$messages} from "../utils/messages";

export default class ShopService {
    static async getProduct(shop_id, id) {
        const response = await $api.get($apiRoutes.products.get(shop_id, id));

        return response.data.data;
    }

    static async makeOrder(shop_id, shipping_data, products) {
        return await $api.post($apiRoutes.orders.create(shop_id), {
            shipping_data, products
        });
    }

    static async createShop(name, domain_id) {
        return await $api.post($apiRoutes.shops.create, {name, domain_id});
    }

    static async requestShop() {
        let response = {data: {data: null}}

        try {
            response = await $api.get($apiRoutes.getMe(window.location.host.split('.')[0]));
            // const response = await $api.get($apiRoutes.getMe('magaz'));

            showMessage($messages.created.shop)
        } catch (e) {
            showError(e.response.data.message)
        }

        return response.data.data;
    }

    static async getProducts(shop_id) {
        let response = {data: {data: null}}

        try {
            response = await $api.get($apiRoutes.products.list(shop_id));

            showMessage($messages.created.shop)
        } catch (e) {
            showError(e.response.data.message)
        }

        return response.data.data;
    }
}