import {$api, $server} from "../http";
import {$apiRoutes} from "../http/routes";

export default class ShopService {
    static async getShopId() {
        const response = await $api.get($apiRoutes.getMyId);

        return response.data.data;


        return 1;
    }

    static status(code) {
        return code >= 200 && code < 301;
    }

    static async getProduct(id) {
        const response = await $api.get($apiRoutes.products.get(id));

        return response.data.data;
    }

    static async makeOrder(shipping_data, products) {
        const response = await $api.get($apiRoutes.orders.create, {
            shipping_data, products
        });

        return response;
    }
}