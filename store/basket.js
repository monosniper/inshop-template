import {makeAutoObservable, toJS} from "mobx";
import shop from "./shop";
import BasketService from "../services/BasketService";
import auth from "./auth";

class Basket {
    items = []

    constructor() {
        makeAutoObservable(this)
    }

    setItems(items, update=true) {
        this.items = items;
        update && BasketService.update(
            shop.id,
            auth.data.basket_id,
            {items: items.map(item => item.product.id)}
        )
    }

    async loadBasket() {
       if(shop.id && auth.data.basket_id) {
           await BasketService.loadItems(shop.id, auth.data.basket_id).then(rs => {
               this.setItems(rs.data, false)
           })
       }
    }

    isEmpty() {
        return this.getItemsCount() === 0
    }

    increment(id) {
        let newItems = [...toJS(this.items)]
        newItems.map(item => {
            if(item.id === id) item.count++
            return item
        })
        this.setItems(newItems)
    }

    decrement(id) {
        let newItems = [...toJS(this.items)]
        newItems.map(item => {
            if(item.id === id) item.count--
            return item.count ? item : false
        })
        this.setItems(newItems)
    }

    addItem(id, product, count=1) {
        if(!this.hasItem(id)) this.setItems([...this.items, {id, product, count}])
    }

    removeItem(id) {
        let newItems = [...toJS(this.items)]
        newItems = newItems.filter(item => item.product.id !== id)
        this.setItems(newItems)
    }

    toggleItem(product) {
        this.hasItem(product.id) ? this.removeItem(product.id) : this.addItem(product.id, product);
    }

    getItemsCount() {
        return toJS(this.items).length
    }

    hasItem(id) {
        return toJS(this.items).find(item => item.product && item.product.id === id)
    }

    getSum(items=false) {
        if(!items) items = this.items
        let sum = 0

        toJS(items).forEach(item => {
            item = item.product ? item.product : item
            const discount_price = item.discount_price
            const count = item.count ?? 1;

            sum += parseInt(discount_price) * count
        })

        // Delivery
        sum += (parseInt(shop.options.delivery) || 0)

        return sum
    }
}

export default new Basket()