import shop from "../store/shop";
import {toJS} from "mobx";

export const useShop = () => {
    return shop.options
    return JSON.parse(toJS(shop.options))
}