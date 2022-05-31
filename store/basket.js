import {makeAutoObservable, toJS} from "mobx";
import shop from "./shop";

class Basket {
    items = []

    constructor() {
        makeAutoObservable(this)
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
        console.log(this.hasItem(id))
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