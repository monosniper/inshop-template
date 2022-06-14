import {makeAutoObservable, toJS} from "mobx";
import shop from "./shop";
import BasketService from "../services/BasketService";
import auth from "./auth";

class Basket {
    items = []

    constructor() {
        makeAutoObservable(this)
    }

    loadBasket() {
        console.log(shop.id, auth.data)
       if(shop.id && auth.data.id) {
           BasketService.loadItems(shop.id, auth.data.id).then(rs => {
               console.log(rs)
               // this.setItems(rs)
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
        this.items = newItems
    }

    decrement(id) {
        let newItems = [...toJS(this.items)]
        newItems.map(item => {
            if(item.id === id) item.count--
            return item.count ? item : false
        })
        this.items = newItems
    }

    addItem(id, title, price, count=1) {
        if(!this.hasItem(id)) this.items = [...this.items, {id, title, price, count}]
    }

    removeItem(id) {
        let newItems = [...toJS(this.items)]
        newItems.map(item => item.id !== id)
        this.items = newItems
    }

    getItemsCount() {
        return toJS(this.items).length
    }

    hasItem(id) {
        return this.items.find(item => item.id === id)
    }

    getSum() {
        let sum = 0

        toJS(this.items).forEach(item => {
            sum += item.price * item.count
        })

        return sum
    }
}

export default new Basket()