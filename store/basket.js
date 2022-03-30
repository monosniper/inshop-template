import {makeAutoObservable, toJS} from "mobx";

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

    addItem(id, price, count=1) {
        if(!this.hasItem(id)) this.items = [...toJS(this.items), {id, price, count}]
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
        return [...toJS(this.items)].find(item => item.id === id)
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