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
        update && BasketService.update(shop.id, auth.data.basket_id, items)
    }

    loadBasket() {
       if(shop.id && auth.data.basket_id) {
           BasketService.loadItems(shop.id, auth.data.basket_id).then(rs => {
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
        return this.items.find(item => item.product.id === id)
    }

    getSum() {
        let sum = 0

        toJS(this.items).forEach(item => {
            sum += item.product.price * item.count
        })

        return sum
    }
}

export default new Basket()