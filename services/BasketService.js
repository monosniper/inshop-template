import {$api, $server} from "../http";
import {$apiRoutes} from "../http/routes";
import {showError} from "../utils/showError";

export default class BasketService {
    static async loadItems(shop_id, client_id) {
        let response = {data: {data: null}}

        try {
            const response = await $api.get($apiRoutes.basket.list(shop_id, client_id));

            return response.data;
        } catch (e) {

        }

        return response.data.data;
    }

    static async update(shop_id, client_id, data) {
        let response = {data: {data: null}}

        try {
            const response = await $api.put($apiRoutes.basket.update(shop_id, client_id), data);

            return response.data;
        } catch (e) {
            e && e.response && showError(e.response.data.message)
        }

        return response.data.data;
    }
}
