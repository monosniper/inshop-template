import {$api, $server} from "../http";
import {$apiRoutes} from "../http/routes";

export default class BasketService {
    static async loadItems(shop_id, client_id) {
        const response = await $api.get($apiRoutes.basket.list(shop_id, client_id));

        return response.data;
    }
}